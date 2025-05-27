document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    let maxMessages = 15;
    const fadeOutDuration = 500;
    let hiddenUsernames = [];

    function applyUrlParameters() {
        const params = new URLSearchParams(window.location.search);
        // ... (getting params remains the same) ...
        const bgColor = params.get('bgColor');
        const textColor = params.get('textColor');
        const userColor = params.get('userColor');
        const fontSize = params.get('fontSize');
        const fontFamily = params.get('fontFamily');
        const hideAvatars = params.get('hideAvatars');
        const width = params.get('width');
        const max = params.get('maxMessages');
        const usersToHide = params.get('hideUsers');

        // ... (setting CSS vars remains the same) ...
        if (bgColor) root.style.setProperty('--background-color', `#${bgColor}`);
        if (textColor) root.style.setProperty('--text-color', `#${textColor}`);
        if (userColor) root.style.setProperty('--username-color', `#${userColor}`);
        if (fontSize) root.style.setProperty('--font-size', `${fontSize}px`);
        if (fontFamily) root.style.setProperty('--font-family', fontFamily);
        if (hideAvatars === 'true') { /* ... */ }
        if (width) root.style.setProperty('--widget-width', `${width}px`);
        
        // Ensure maxMessages is set correctly
        maxMessages = parseInt(max, 10);
        if (isNaN(maxMessages) || maxMessages <= 0) {
            maxMessages = 15; // Fallback to a reasonable default
        }


        if (usersToHide) { /* ... */ }

        console.log("Applying Settings - Max Messages:", maxMessages);
    }

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

    // --- NEWER and HOPEFULLY Better Removal Function ---
    function removeOldMessages() {
        const messages = Array.from(chatContainer.children);
        // We only want to count messages that *aren't* already fading out
        const visibleMessages = messages.filter(msg => !msg.classList.contains('fading-out'));
        const currentVisibleCount = visibleMessages.length;
        
        console.log(`Checking messages. Visible: ${currentVisibleCount}, Max: ${maxMessages}`);

        // Calculate how many messages to remove
        let toRemoveCount = currentVisibleCount - maxMessages;

        if (toRemoveCount > 0) {
            console.log(`Need to remove ${toRemoveCount} message(s).`);
            // Find the oldest *visible* messages
            const messagesToFade = visibleMessages.slice(0, toRemoveCount);

            messagesToFade.forEach(message => {
                console.log("Fading out a message.");
                message.classList.add('fading-out');

                // Set a timeout to remove it after the CSS transition
                setTimeout(() => {
                    if (message && message.parentNode === chatContainer) {
                        chatContainer.removeChild(message);
                        console.log("Removed a message via timeout.");
                    }
                }, fadeOutDuration);
            });
        }
    }

    applyUrlParameters();

    // Mock Chat
    let demoCounter = 0;
    const demoUsers = ['StreamGazer', 'PixelPilot', 'bot_name', 'CodeWizard', 'GamerGeek', 'username1'];
    const demoMessages = ['Hello!', 'This is awesome!', 'How do I change the color?', 'Pog!', 'LUL'];
    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, `${msg} (${demoCounter++})`);
    }, 2500);
});