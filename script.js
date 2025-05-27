document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    let maxMessages = 15; // Default value
    const fadeOutDuration = 500; // Match CSS transition duration in ms
    let hiddenUsernames = [];

    // --- 1. Apply URL Parameters ---
    function applyUrlParameters() {
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

        // FIX 1: Correctly use template literals (`) to include the '#' inside the string
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
        if (width) root.style.setProperty('--widget-width', `${width}px`);
        if (max) maxMessages = parseInt(max, 10); // Ensure it's a number

        if (usersToHide) {
            hiddenUsernames = usersToHide
                .split(',')
                .map(user => user.trim().toLowerCase())
                .filter(user => user.length > 0);
        }

        console.log("Applied Settings:", { width, maxMessages, hiddenUsernames });
    }

    // --- 2. Handle Chat Messages ---
    function addChatMessage(username, message, avatarUrl = 'https://via.placeholder.com/24') {
        if (hiddenUsernames.includes(username.toLowerCase())) {
            return; // Skip hidden users
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');

        // Ensure text is properly escaped/displayed (though innerHTML is usually fine here)
        messageElement.innerHTML = `
            <img src="${avatarUrl}" alt="Avatar">
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;

        chatContainer.appendChild(messageElement);

        // FIX 2: More robustly check and remove messages
        removeOldMessages();
        
        // Ensure it auto-scrolls to the bottom
        setTimeout(() => {
             chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 50);
    }

    // FIX 3: Dedicated function for removing old messages
    function removeOldMessages() {
         while (chatContainer.children.length > maxMessages) {
            const oldestMessage = chatContainer.firstChild;
            if (oldestMessage && !oldestMessage.classList.contains('fading-out')) {
                oldestMessage.classList.add('fading-out');
                // Use 'transitionend' for smoother removal, or stick with setTimeout
                setTimeout(() => {
                    // Double-check it still exists and is a child before removing
                    if (oldestMessage && oldestMessage.parentNode === chatContainer) {
                       chatContainer.removeChild(oldestMessage);
                    }
                }, fadeOutDuration);
            } else if (oldestMessage) {
                // If it's somehow stuck in fading, or no message, just remove/break
                if (oldestMessage.parentNode === chatContainer) {
                   chatContainer.removeChild(oldestMessage);
                } else {
                   break; // Break if something is wrong (e.g., no firstChild)
                }
            } else {
                break; // No more children
            }
        }
    }


    // --- 3. Run Everything ---
    applyUrlParameters();

    // --- 4. Mock Chat ---
    let demoCounter = 0;
    const demoUsers = ['StreamGazer', 'PixelPilot', 'bot_name', 'CodeWizard', 'GamerGeek', 'username1'];
    const demoMessages = ['Hello!', 'This is awesome!', 'How do I change the color?', 'Pog!', 'LUL'];
    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, `${msg} (${demoCounter++})`);
    }, 2500);
});