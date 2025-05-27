document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    let maxMessages = 15;
    const fadeOutDuration = 500;
    let hiddenUsernames = []; // Change 1: Add array for hidden users

    // --- 1. Apply URL Parameters ---
    function applyUrlParameters() {
        const params = new URLSearchParams(window.location.search);

        // ... (getting other params remains the same) ...
        const bgColor = params.get('bgColor');
        const textColor = params.get('textColor');
        const userColor = params.get('userColor');
        const fontSize = params.get('fontSize');
        const fontFamily = params.get('fontFamily');
        const hideAvatars = params.get('hideAvatars');
        const width = params.get('width');
        const max = params.get('maxMessages');
        const usersToHide = params.get('hideUsers'); // Get hidden users string

        // ... (setting other params remains the same) ...
        if (bgColor) root.style.setProperty('--background-color', `#${bgColor}`);
        if (textColor) root.style.setProperty('--text-color', `#${textColor}`);
        if (userColor) root.style.setProperty('--username-color', `#${userColor}`);
        if (fontSize) root.style.setProperty('--font-size', `${fontSize}px`);
        if (fontFamily) root.style.setProperty('--font-family', fontFamily);
        if (hideAvatars === 'true') { /* ... */ }
        if (width) root.style.setProperty('--widget-width', `${width}px`);
        if (max) maxMessages = parseInt(max, 10);

        // Change 2: Parse and store hidden users
        if (usersToHide) {
            hiddenUsernames = usersToHide
                .split(',') // Split by comma
                .map(user => user.trim().toLowerCase()) // Trim whitespace & convert to lowercase
                .filter(user => user.length > 0); // Remove any empty entries
        }

        console.log("Applied Settings:", { /* ... */ width, maxMessages, hiddenUsernames });
    }

    // --- 2. Handle Chat Messages ---
    function addChatMessage(username, message, avatarUrl = 'https://via.placeholder.com/24') {
        // Change 3: Check if username is hidden (case-insensitive)
        if (hiddenUsernames.includes(username.toLowerCase())) {
            console.log(`Hiding message from: ${username}`);
            return; // Skip adding the message
        }

        // ... (rest of addChatMessage remains the same) ...
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `...`;
        chatContainer.appendChild(messageElement);
        while (chatContainer.children.length > maxMessages) { /* ... */ }
        setTimeout(() => { chatContainer.scrollTop = chatContainer.scrollHeight; }, 50);
    }

    // --- 3. Run Everything ---
    applyUrlParameters();

    // --- 4. Mock Chat (Updated to include users who might be hidden) ---
    let demoCounter = 0;
    const demoUsers = ['StreamGazer', 'PixelPilot', 'bot_name', 'CodeWizard', 'GamerGeek', 'username1'];
    const demoMessages = ['Hello!', 'This is awesome!', 'How do I change the color?', 'Pog!', 'LUL'];
    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, `${msg} (${demoCounter++})`);
    }, 2000);
});