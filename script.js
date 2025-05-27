document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    let maxMessages = 15; // Default value, will be overridden
    const fadeOutDuration = 500; // Match CSS transition duration in ms

    // --- 1. Apply URL Parameters ---
    function applyUrlParameters() {
        const params = new URLSearchParams(window.location.search);

        const bgColor = params.get('bgColor');
        const textColor = params.get('textColor');
        const userColor = params.get('userColor');
        const fontSize = params.get('fontSize');
        const fontFamily = params.get('fontFamily');
        const hideAvatars = params.get('hideAvatars');
        const width = params.get('width'); // New
        const max = params.get('maxMessages'); // New

        if (bgColor) root.style.setProperty('--background-color', `#${bgColor}`);
        if (textColor) root.style.setProperty('--text-color', `#${textColor}`);
        if (userColor) root.style.setProperty('--username-color', `#${userColor}`);
        if (fontSize) root.style.setProperty('--font-size', `${fontSize}px`);
        if (fontFamily) root.style.setProperty('--font-family', fontFamily);
        if (hideAvatars === 'true') {
            root.style.setProperty('--hide-avatars', 'none');
        } else {
            root.style.setProperty('--hide-avatars', 'inline-block');
        }
        // Apply new settings
        if (width) root.style.setProperty('--widget-width', `${width}px`);
        if (max) maxMessages = parseInt(max, 10);

        console.log("Applied Settings:", { bgColor, textColor, userColor, fontSize, fontFamily, hideAvatars, width, maxMessages });
    }

    // --- 2. Handle Chat Messages ---
    function addChatMessage(username, message, avatarUrl = 'https://via.placeholder.com/24') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');

        messageElement.innerHTML = `
            <img src="${avatarUrl}" alt="Avatar">
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;

        // Change 1: Insert at the TOP
        chatContainer.insertBefore(messageElement, chatContainer.firstChild);

        // Change 2: Handle Message Limit and Fading
        while (chatContainer.children.length > maxMessages) {
            const oldestMessage = chatContainer.lastChild; // Oldest is now at the bottom
            if (oldestMessage && !oldestMessage.classList.contains('fading-out')) {
                oldestMessage.classList.add('fading-out');
                // Remove after the fade animation completes
                setTimeout(() => {
                    // Check if the element still exists before removing
                    if (oldestMessage && oldestMessage.parentNode) {
                       oldestMessage.parentNode.removeChild(oldestMessage);
                    }
                }, fadeOutDuration);
            } else if (oldestMessage) {
                // If it's already fading, just remove it (safety net)
                if (oldestMessage.parentNode) {
                    oldestMessage.parentNode.removeChild(oldestMessage);
                }
            } else {
                break; // Should not happen, but break if no last child
            }
        }
    }

    // --- 3. Run Everything ---
    applyUrlParameters();

    // --- 4. Mock Chat (Updated) ---
    // REMOVE THIS SECTION WHEN YOU INTEGRATE A REAL CHAT API
    let demoCounter = 0;
    const demoUsers = ['RookMaster', 'CastleGuard', 'PawnPower', 'KnightMove'];
    const demoMessages = ['Checkmate!', 'Nice move!', 'Watch out for that flank!', 'En passant!', 'Good game!'];

    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, `${msg} (${demoCounter++})`);
    }, 2000); // Add a new message every 2 seconds
    // --- END MOCK CHAT SECTION ---
});
