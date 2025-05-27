document.addEventListener('DOMContentLoaded', () => {
    console.log("Widget (script.js): DOMContentLoaded fired.");
    const chatContainer = document.getElementById('chat-container');
    const root = document.documentElement;

    if (!chatContainer || !root) {
        console.error("Widget (script.js): CRITICAL - Could not find #chat-container or :root!");
        return;
    }

    let maxMessages = 15;
    const fadeOutDuration = 500;
    let hiddenUsernames = [];

    function loadGoogleFont(fontName) {
        try {
            if (!fontName || fontName.includes(',')) {
                 console.log(`Widget (script.js): Using default font: ${fontName}`);
                 return;
            }
            const fontUrlName = fontName.replace(/ /g, '+');
            const fontUrl = `https://fonts.googleapis.com/css2?family=${fontUrlName}:wght@400;700&display=swap`;

            console.log(`Widget (script.js): Attempting to load Google Font: ${fontName}`);
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontUrl;
            link.onload = () => console.log(`Widget (script.js): Successfully loaded ${fontName}.`);
            link.onerror = () => console.error(`Widget (script.js): FAILED to load ${fontName}.`);
            document.head.appendChild(link);

        } catch (e) {
             console.error("Widget (script.js): Error in loadGoogleFont:", e);
        }
    }

    function applyUrlParameters() {
        try {
            console.log("Widget (script.js): Applying URL parameters.");
            const params = new URLSearchParams(window.location.search);
            const bgColor = params.get('bgColor');
            const textColor = params.get('textColor');
            const userColor = params.get('userColor');
            const fontSize = params.get('fontSize');
            const fontFamily = params.get('fontFamily'); // Get font name
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
                console.log(`Widget (script.js): Setting font-family to: ${cssFontFamily}`);
                root.style.setProperty('--font-family', cssFontFamily);
            }

            if (usersToHide) { /* ... */ }
             console.log("Widget (script.js): Parameters applied. Max Messages:", maxMessages);
        } catch (e) {
            console.error("Widget (script.js): Error in applyUrlParameters:", e);
        }
    }

    function removeOldMessages() { /* ... (fading removal function - keep as is) ... */ }
    function addChatMessage(username, message, avatarUrl = 'https://via.placeholder.com/24') { /* ... */ }

    applyUrlParameters();

    // Mock Chat
    let demoCounter = 0; /* ... (mock chat remains) ... */

});