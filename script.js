document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    if (!chatContainer || !root) {
        console.error("Rook Chat (script.js): Could not find #chat-container or :root!");
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
        } catch (e) { console.error("Error loading Google Font:", e); }
    }

    function applyUrlParameters() {
        try {
            const params = new URLSearchParams(window.location.search);
            const bgColor = params.get('bgColor');
            const textColor = params.get('textColor');
            const userColor = params.get('userColor');
            const fontSize = params.get('fontSize');
            const fontFamily = params.get('fontFamily');
            const hideAvatars = params.get('hideAvatars');
            const width = params.get('width');
            const max = params.get('maxMessages');
            const usersToHide = params.get('hideUsers');
            const transparentBg = params.get('transparentBg');

            if (transparentBg === 'true') { root.style.setProperty('--background-color', 'transparent'); }
            else if (bgColor) { root.style.setProperty('--background-color', `#${bgColor}`); }
            if (textColor) root.style.setProperty('--text-color', `#${textColor}`);
            if (userColor) root.style.setProperty('--username-color', `#${userColor}`);
            if (fontSize) root.style.setProperty('--font-size', `${fontSize}px`);
            if (hideAvatars === 'true') { root.style.setProperty('--hide-avatars', 'none'); }
            else { root.style.setProperty('--hide-avatars', 'inline-block'); }
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
        } catch (e) { console.error("Error applying URL parameters:", e); }
    }

    // --- Fading Removal Function (Restored) ---
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

    // --- Add Chat Message Function (Restored) ---
    function addChatMessage(username, message, avatarUrl = 'https://via.placeholder.com/24') {
        if (hiddenUsernames.includes(username.toLowerCase())) {
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `
            <img src="${avatarUrl}" alt="Avatar">
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;
        chatContainer.appendChild(messageElement);
        removeOldMessages();
        setTimeout(() => { chatContainer.scrollTop = chatContainer.scrollHeight; }, 50);
    }

    // --- Initial Setup ---
    applyUrlParameters();

    // --- Mock Chat (Restored) ---
    const demoUsers = ['StreamGazer', 'PixelPilot', 'bot_name', 'CodeWizard', 'GamerGeek', 'username1'];
    const demoMessages = ['Hello!', 'This looks great!', 'How do I change the color?', 'Pog!', 'LUL', 'Rook Chat Hype!'];
    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, msg); // Call the restored function
    }, 2500);

}); // End of DOMContentLoaded