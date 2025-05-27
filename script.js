document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    // --- 1. Apply URL Parameters ---
    function applyUrlParameters() {
        const params = new URLSearchParams(window.location.search);

        // Get values or use defaults (from CSS :root)
        const bgColor = params.get('bgColor');
        const textColor = params.get('textColor');
        const userColor = params.get('userColor');
        const fontSize = params.get('fontSize');
        const fontFamily = params.get('fontFamily');
        const hideAvatars = params.get('hideAvatars'); // 'true' or 'false'

        // Apply to CSS Variables if they exist
        if (bgColor) root.style.setProperty('--background-color', `#${bgColor}`);
        if (textColor) root.style.setProperty('--text-color', `#${textColor}`);
        if (userColor) root.style.setProperty('--username-color', `#${userColor}`);
        if (fontSize) root.style.setProperty('--font-size', `${fontSize}px`);
        if (fontFamily) root.style.setProperty('--font-family', fontFamily);
        if (hideAvatars === 'true') {
            root.style.setProperty('--hide-avatars', 'none');
        } else {
            root.style.setProperty('--hide-avatars', 'inline-block'); // Or your default
        }

        console.log("Applied Settings:", { bgColor, textColor, userColor, fontSize, fontFamily, hideAvatars });
    }

    // --- 2. Handle Chat Messages (Simulated) ---
    // In a real scenario, you'd connect to Twitch (tmi.js), YouTube, etc. here.
    function addChatMessage(username, message, avatarUrl = 'https://via.placeholder.com/24') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');

        messageElement.innerHTML = `
            <img src="${avatarUrl}" alt="Avatar">
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;

        chatContainer.appendChild(messageElement);

        // Keep chat from overflowing (optional: remove oldest messages)
        while (chatContainer.children.length > 20) { // Keep max 20 messages
            chatContainer.removeChild(chatContainer.firstChild);
        }

        // Auto-scroll (might not be needed depending on CSS and OBS size)
         chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // --- 3. Run Everything ---
    applyUrlParameters();

    // --- 4. Mock Chat for Demo Purposes ---
    // REMOVE THIS SECTION WHEN YOU INTEGRATE A REAL CHAT API
    let demoCounter = 0;
    const demoUsers = ['StreamGazer', 'PixelPilot', 'CodeWizard', 'GamerGeek'];
    const demoMessages = ['Hello!', 'This is awesome!', 'How do I change the color?', 'Pog!', 'LUL'];

    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, `${msg} (${demoCounter++})`);
    }, 3000); // Add a new message every 3 seconds
    // --- END MOCK CHAT SECTION ---

    // --- IMPORTANT ---
    // You will need to replace the "Mock Chat" section with code
    // that connects to your chosen streaming platform's chat API.
    // Popular libraries include:
    // - tmi.js for Twitch (https://tmijs.com/)
    // - YouTube Live Streaming API (requires more setup)
    // This is the most complex part of building a fully functional widget.
});