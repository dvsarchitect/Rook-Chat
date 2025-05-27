document.addEventListener('DOMContentLoaded', () => {
    console.log("RookChat DBG: DOMContentLoaded fired.");
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    if (!chatContainer || !root) {
        console.error("RookChat DBG: CRITICAL - Could not find #chat-container or :root!");
        return;
    }

    let maxMessages = 15;
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
            console.log("RookChat DBG: Applying URL parameters.");
            const params = new URLSearchParams(window.location.search);
            const bgColor = params.get('bgColor');
            const textColor = params.get('textColor');
            const userColor = params.get('userColor');
            const fontSize = params.get('fontSize');
            const fontFamily = params.get('fontFamily');
            const hideAvatars = params.get('hideAvatars'); // Still here even if img removed
            const width = params.get('width');
            const max = params.get('maxMessages');
            const usersToHide = params.get('hideUsers');
            const transparentBg = params.get('transparentBg');

            if (transparentBg === 'true') { root.style.setProperty('--background-color', 'transparent'); }
            else if (bgColor) { root.style.setProperty('--background-color', `#${bgColor}`); }
            if (textColor) root.style.setProperty('--text-color', `#${textColor}`);
            if (userColor) root.style.setProperty('--username-color', `#${userColor}`);
            if (fontSize) root.style.setProperty('--font-size', `${fontSize}px`);
            // We don't have an img, but keep the var setting
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
            console.log("RookChat DBG: Parameters applied. Max Messages:", maxMessages);
        } catch (e) { console.error("Error applying URL parameters:", e); }
    }

    // --- SIMPLIFIED Immediate Removal Function ---
    function removeOldMessages() {
        while (chatContainer.children.length > maxMessages) {
            const oldestMessage = chatContainer.firstChild;
            if (oldestMessage) {
                chatContainer.removeChild(oldestMessage);
                console.log("RookChat DBG: Immediately removed a message.");
            } else {
                break; // Safety break
            }
        }
    }

    function addChatMessage(username, message) {
        console.log(`RookChat DBG: Attempting to add: ${username}`);
        if (hiddenUsernames.includes(username.toLowerCase())) { return; }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;
        chatContainer.appendChild(messageElement);
        removeOldMessages(); // Call simplified version
        setTimeout(() => { chatContainer.scrollTop = chatContainer.scrollHeight; }, 50);
    }

    applyUrlParameters();

    // Mock Chat
    console.log("RookChat DBG: Setting up mock chat interval.");
    const demoUsers = ['StreamGazer', 'PixelPilot', 'bot_name', 'CodeWizard', 'GamerGeek', 'username1'];
    const demoMessages = ['Hello!', 'This looks great!', 'How do I change the color?', 'Pog!', 'LUL', 'Rook Chat Hype!'];
    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, msg);
    }, 2500);
    console.log("RookChat DBG: Mock chat interval set.");

}); // End of DOMContentLoaded