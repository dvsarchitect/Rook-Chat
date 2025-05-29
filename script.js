document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    if (!chatContainer || !root) {
        console.error("Rook Chat Widget: Critical - Could not find #chat-container or :root!");
        return;
    }

    let maxMessages = 15;
    const fadeOutDuration = 500;
    let hiddenUsernames = [];

    function loadGoogleFont(fontName) {
        try {
            if (!fontName || fontName.includes(',')) { return; }
            const fontUrlName = fontName.replace(/ /g, '+');
            const fontUrl = `https://fonts.googleapis.com/css2?family=${fontUrlName}:wght@400;700&display=swap`;
            if (document.querySelector(`link[href="${fontUrl}"]`)) { return; }
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontUrl;
            document.head.appendChild(link);
        } catch (e) { console.error("Rook Chat Widget: Error loading Google Font:", e); }
    }

    function applyUrlParameters() {
        try {
            const params = new URLSearchParams(window.location.search);
            const bgColor = params.get('bgColor');
            const textColor = params.get('textColor');
            const userColor = params.get('userColor');
            const fontSize = params.get('fontSize');
            const fontFamily = params.get('fontFamily');
            const hideAvatars = params.get('hideAvatars'); // Kept for consistency
            const width = params.get('width');
            const max = params.get('maxMessages');
            const usersToHide = params.get('hideUsers');
            const transparentBg = params.get('transparentBg');

            if (transparentBg === 'true') { root.style.setProperty('--background-color', 'transparent'); }
            else if (bgColor) { root.style.setProperty('--background-color', `#${bgColor}`); }
            if (textColor) root.style.setProperty('--text-color', `#${textColor}`);
            if (userColor) root.style.setProperty('--username-color', `#${userColor}`);
            if (fontSize) root.style.setProperty('--font-size', `${fontSize}px`);
            // hideAvatars variable is set for CSS, even though we removed the <img> tag from JS
            root.style.setProperty('--hide-avatars', hideAvatars === 'true' ? 'none' : 'inline-block');
            if (width) root.style.setProperty('--widget-width', `${width}px`);
            
            maxMessages = parseInt(max, 10);
            if (isNaN(maxMessages) || maxMessages <= 0) { maxMessages = 15; }

            if (fontFamily) {
                loadGoogleFont(fontFamily);
                const cssFontFamily = fontFamily.includes(',') ? fontFamily : `'${fontFamily}', sans-serif`;
                root.style.setProperty('--font-family', cssFontFamily);
            }

            if (usersToHide) {
                hiddenUsernames = usersToHide.split(',').map(u => u.trim().toLowerCase()).filter(u => u);
            }
        } catch (e) { console.error("Rook Chat Widget: Error applying URL parameters:", e); }
    }

    function removeOldMessages() {
        const messages = Array.from(chatContainer.children);
        const visibleMessages = messages.filter(msg => !msg.classList.contains('fading-out'));
        let toRemoveCount = visibleMessages.length - maxMessages;

        if (toRemoveCount > 0) {
            const messagesToFade = visibleMessages.slice(0, toRemoveCount);
            messagesToFade.forEach(message => {
                message.classList.add('fading-out');
                setTimeout(() => {
                    if (message && message.parentNode === chatContainer) {
                        chatContainer.removeChild(message);
                    }
                }, fadeOutDuration);
            });
        }
    }

    function addChatMessage(username, message) {
        // Avatar URL is removed as Python script doesn't send it and img tag was removed.
        if (hiddenUsernames.includes(username.toLowerCase())) {
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;
        chatContainer.appendChild(messageElement);
        removeOldMessages();
        setTimeout(() => { chatContainer.scrollTop = chatContainer.scrollHeight; }, 50);
    }

    // --- WebSocket Connection ---
    const socketUrl = 'ws://localhost:8765'; // This MUST match your Python server's host and port
    let socket;

    function connectWebSocket() {
        console.log("Rook Chat Widget: Attempting to connect to WebSocket server at " + socketUrl);
        socket = new WebSocket(socketUrl);

        socket.onopen = () => {
            console.log("Rook Chat Widget: WebSocket connection established with local Python server.");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                // Expecting data like {"author": "User", "message": "Text"}
                if (data && typeof data.author === 'string' && typeof data.message === 'string') {
                    addChatMessage(data.author, data.message);
                } else {
                    console.warn("Rook Chat Widget: Received malformed message from WebSocket:", data);
                }
            } catch (e) {
                console.error("Rook Chat Widget: Error parsing WebSocket message or adding chat message:", e, "Raw data:", event.data);
            }
        };

        socket.onerror = (error) => {
            console.error("Rook Chat Widget: WebSocket error. Is your Python script (youtube_chat_server.py) running?", error);
        };

        socket.onclose = (event) => {
            console.log("Rook Chat Widget: WebSocket connection closed.", event.reason, `Code: ${event.code}`);
            // Attempt to reconnect after a delay
            setTimeout(() => {
                console.log("Rook Chat Widget: Attempting to reconnect WebSocket...");
                connectWebSocket();
            }, 5000); // Try to reconnect every 5 seconds
        };
    }

    // --- Initial Setup ---
    applyUrlParameters(); // Apply styling etc.
    connectWebSocket();   // Start WebSocket connection instead of mock chat

}); // End of DOMContentLoaded