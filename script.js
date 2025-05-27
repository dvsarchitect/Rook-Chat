document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    let maxMessages = 15;
    const fadeOutDuration = 500;
    let hiddenUsernames = [];

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
        if (max) maxMessages = parseInt(max, 10);

        if (usersToHide) {
            hiddenUsernames = usersToHide
                .split(',')
                .map(user => user.trim().toLowerCase())
                .filter(user => user.length > 0);
        }

        console.log("Applied Settings:", { width, maxMessages, hiddenUsernames });
    }

    function addChatMessage(username, message, avatarUrl = 'https://via.placeholder.com/24') {
        if (hiddenUsernames.includes(username.toLowerCase())) {
            console.log(`Hiding message from: ${username}`);
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

        while (chatContainer.children.length > maxMessages) {
            const oldestMessage = chatContainer.firstChild;
            if (oldestMessage && !oldestMessage.classList.contains('fading-out')) {
                oldestMessage.classList.add('fading-out');
                setTimeout(() => {
                    if (oldestMessage && oldestMessage.parentNode) {
                       oldestMessage.parentNode.removeChild(oldestMessage);
                    }
                }, fadeOutDuration);
            } else if (oldestMessage) {
                 if (oldestMessage.parentNode) {
                    oldestMessage.parentNode.removeChild(oldestMessage);
                }
            } else {
                break;
            }
        }

        setTimeout(() => {
             chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 50);
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
    }, 2500); // Slightly slower for easier debugging
});