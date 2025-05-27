document.addEventListener('DOMContentLoaded', () => {
    console.log("RookChat DBG: DOMContentLoaded fired."); // Log 1
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    if (!chatContainer || !root) {
        console.error("RookChat DBG: CRITICAL - Could not find #chat-container or :root!");
        return;
    }

    let maxMessages = 15;
    const fadeOutDuration = 500;
    let hiddenUsernames = [];

    function loadGoogleFont(fontName) { /* ... (same as before) ... */ }
    function applyUrlParameters() { /* ... (same as before) ... */ }

    function removeOldMessagesSlice() {
        const messages = Array.from(chatContainer.children);
        const visibleMessages = messages.filter(msg => !msg.classList.contains('fading-out'));
        const currentVisibleCount = visibleMessages.length;
        let toRemoveCount = currentVisibleCount - maxMessages;

        console.log(`RookChat DBG: Checking messages. Visible=${currentVisibleCount}, Max=${maxMessages}, ToRemove=${toRemoveCount > 0 ? toRemoveCount : 0}`); // Log 2

        if (toRemoveCount > 0) {
            const messagesToFade = visibleMessages.slice(0, toRemoveCount);
            console.log(`RookChat DBG: Fading out ${messagesToFade.length} messages.`); // Log 3
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
        console.log(`RookChat DBG: Attempting to add: ${username}`); // Log 4
        if (hiddenUsernames.includes(username.toLowerCase())) {
             console.log(`RookChat DBG: Hiding ${username}`); // Log 5
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;
        chatContainer.appendChild(messageElement);
        console.log(`RookChat DBG: Appended message from ${username}.`); // Log 6
        removeOldMessagesSlice();
        setTimeout(() => { chatContainer.scrollTop = chatContainer.scrollHeight; }, 50);
    }

    // --- Initial Setup ---
    applyUrlParameters();
    console.log("RookChat DBG: Parameters applied. Setting up mock chat."); // Log 7

    // --- Mock Chat ---
    const demoUsers = ['StreamGazer', 'PixelPilot', 'bot_name', 'CodeWizard', 'GamerGeek', 'username1'];
    const demoMessages = ['Hello!', 'This looks great!', 'How do I change the color?', 'Pog!', 'LUL', 'Rook Chat Hype!'];
    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, msg);
    }, 2500);
    console.log("RookChat DBG: Mock chat interval set."); // Log 8

});