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

    // --- Function to load Google Font ---
    function loadGoogleFont(fontName) {
        // Prevent loading the default or empty
        if (!fontName || fontName.includes(',')) {
             console.log("Using default font, not loading Google Font.");
             return;
        }

        // Prepare font name for URL (replace spaces with +)
        const fontUrlName = fontName.replace(/ /g, '+');
        const fontUrl = `https://fonts.googleapis.com/css2?family=${fontUrlName}:wght@400;700&display=swap`;

        // Check if this font is already loaded
        if (document.querySelector(`link[href="${fontUrl}"]`)) {
            console.log(`Font ${fontName} already loaded.`);
            return;
        }

        console.log(`Loading Google Font: ${fontName} from ${fontUrl}`);
        // Create link element
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fontUrl;

        // Append to head
        document.head.appendChild(link);
    }

    function applyUrlParameters() {
        const params = new URLSearchParams(window.location.search);
        // ... (getting params) ...
        const fontFamily = params.get('fontFamily'); // Get font name

        // ... (applying colors/width/max) ...
        const bgColor = params.get('bgColor');
        const textColor = params.get('textColor');
        const userColor = params.get('userColor');
        const fontSize = params.get('fontSize');
        const hideAvatars = params.get('hideAvatars');
        const width = params.get('width');
        const max = params.get('maxMessages');
        const usersToHide = params.get('hideUsers');
        const transparentBg = params.get('transparentBg');

        if (transparentBg === 'true') { /* ... */ } else if (bgColor) { /* ... */ }
        if (textColor) root.style.setProperty('--text-color', `#${textColor}`);
        if (userColor) root.style.setProperty('--username-color', `#${userColor}`);
        if (fontSize) root.style.setProperty('--font-size', `${fontSize}px`);
        if (hideAvatars === 'true') { /* ... */ }
        if (width) root.style.setProperty('--widget-width', `${width}px`);
        maxMessages = parseInt(max, 10); /* ... */

        // --- Apply Font ---
        if (fontFamily) {
            loadGoogleFont(fontFamily); // Load the font via <link>
            // Set the CSS variable - add quotes if it's not a system font
            const cssFontFamily = fontFamily.includes(',') ? fontFamily : `'${fontFamily}', sans-serif`;
            root.style.setProperty('--font-family', cssFontFamily);
        }

        if (usersToHide) { /* ... */ }
    }

    function removeOldMessages() { /* ... (fading removal function) ... */ }
    function addChatMessage(username, message, avatarUrl = 'https://via.placeholder.com/24') { /* ... */ }

    applyUrlParameters();

    // Mock Chat (No changes needed)
    /* ... */

});