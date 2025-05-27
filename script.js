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

    function loadGoogleFont(fontName) { /* ... (same as before) ... */ }
    function applyUrlParameters() { /* ... (same as before, including maxMessages parsing) ... */ }

    // --- New Attempt at Removal Function ---
    function removeOldMessages() {
        console.log(`Checking: Current=${chatContainer.children.length}, Max=${maxMessages}`);
        
        // Loop as long as we are over the limit
        while (chatContainer.children.length > maxMessages) {
            const oldestMessage = chatContainer.firstChild;

            // If oldest exists AND isn't already fading out
            if (oldestMessage && !oldestMessage.classList.contains('fading-out')) {
                console.log("Found message to remove, adding fade class.");
                oldestMessage.classList.add('fading-out');

                // Set its timeout
                setTimeout(() => {
                    if (oldestMessage && oldestMessage.parentNode === chatContainer) {
                        chatContainer.removeChild(oldestMessage);
                        console.log("Removed message via timeout.");
                    }
                }, fadeOutDuration);

                // IMPORTANT: We *don't* break here. If multiple need removing,
                // the loop *should* find the *next* firstChild (which will be
                // the second oldest) and process it. BUT, since adding the class
                // doesn't remove it, the length *won't change* in this loop.
                // This approach *still* relies on the filter approach being better.
                // LET'S REVERT to the slice/forEach - it *should* work if JS isn't erroring.
                // The most likely reason it failed before was the `debounce` error causing chaos.
            } else {
                // If the oldest is already fading or doesn't exist,
                // assume nothing more can be done *in this cycle* and break.
                console.log("Oldest message already fading or gone, breaking loop.");
                break;
            }
        }
    }
    
    // --- Let's try the Slice/forEach one more time, now that debounce is fixed ---
    function removeOldMessagesSlice() {
        const messages = Array.from(chatContainer.children);
        const visibleMessages = messages.filter(msg => !msg.classList.contains('fading-out'));
        const currentVisibleCount = visibleMessages.length;
        let toRemoveCount = currentVisibleCount - maxMessages;

        console.log(`Checking: Visible=${currentVisibleCount}, Max=${maxMessages}, ToRemove=${toRemoveCount > 0 ? toRemoveCount : 0}`);

        if (toRemoveCount > 0) {
            const messagesToFade = visibleMessages.slice(0, toRemoveCount);
            console.log(`Fading out ${messagesToFade.length} messages.`);
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


    function addChatMessage(username, message) { // REMOVED avatarUrl
        if (hiddenUsernames.includes(username.toLowerCase())) {
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        // REMOVED: <img> tag
        messageElement.innerHTML = `
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;
        chatContainer.appendChild(messageElement);
        removeOldMessagesSlice(); // Call the slice version
        setTimeout(() => { chatContainer.scrollTop = chatContainer.scrollHeight; }, 50);
    }

    applyUrlParameters();

    // Mock Chat
    const demoUsers = ['StreamGazer', 'PixelPilot', 'bot_name', 'CodeWizard', 'GamerGeek', 'username1'];
    const demoMessages = ['Hello!', 'This looks great!', 'How do I change the color?', 'Pog!', 'LUL', 'Rook Chat Hype!'];
    setInterval(() => {
        const user = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const msg = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        addChatMessage(user, msg);
    }, 2500);

});