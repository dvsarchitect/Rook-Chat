document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');
    const previewFrame = document.getElementById('preview-frame');
    const transparentBgCheckbox = document.getElementById('transparentBg');
    const bgColorInput = document.getElementById('bgColor');
    const fontFamilySelect = document.getElementById('fontFamily');

    const googleFonts = [
        "Roboto", "Open Sans", "Lato", "Montserrat", "Oswald",
        "Source Sans Pro", "Raleway", "Poppins", "Nunito", "Inter",
        "Ubuntu", "Playfair Display", "Merriweather", "PT Sans"
    ];

    function populateFontDropdown() {
        const defaultOption = document.createElement('option');
        defaultOption.value = "Arial, sans-serif";
        defaultOption.textContent = "Default (Arial)";
        fontFamilySelect.appendChild(defaultOption);
        googleFonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            fontFamilySelect.appendChild(option);
        });
        fontFamilySelect.value = "Roboto"; // Set default to Roboto
    }

    if (!form || !outputUrlElement || !copyButton || !previewFrame || !transparentBgCheckbox || !bgColorInput || !fontFamilySelect) {
        console.error("Config Page (config.js): One or more core HTML elements not found!");
        return;
    }

    const baseUrl = 'https://dvsarchitect.github.io/Rook-Chat/index.html';

    function debounce(func, wait) { /* ... (debounce function) ... */ }

    function performUpdate() {
        const params = new URLSearchParams();
        const fontFamily = fontFamilySelect.value;
        // ... (getting other params) ...
        const bgColor = document.getElementById('bgColor').value.substring(1);
        const textColor = document.getElementById('textColor').value.substring(1);
        const userColor = document.getElementById('userColor').value.substring(1);
        const fontSize = document.getElementById('fontSize').value;
        const hideAvatars = document.getElementById('hideAvatars').checked;
        const width = document.getElementById('width').value;
        const maxMessages = document.getElementById('maxMessages').value;
        const hideUsers = document.getElementById('hideUsers').value;
        const transparentBg = transparentBgCheckbox.checked;

        // ... (appending params) ...
        params.append('bgColor', bgColor);
        params.append('textColor', textColor);
        params.append('userColor', userColor);
        params.append('fontSize', fontSize);
        if (fontFamily) { params.append('fontFamily', fontFamily); }
        params.append('hideAvatars', hideAvatars);
        params.append('width', width);
        params.append('maxMessages', maxMessages);
        if (hideUsers) { params.append('hideUsers', hideUsers); }
        params.append('transparentBg', transparentBg);


        const finalUrl = `${baseUrl}?${params.toString()}`;
        outputUrlElement.textContent = finalUrl;
        previewFrame.src = finalUrl; // Set src directly
        console.log("Config Page (config.js): Setting iframe src.");
    }

    // CHANGE: The debounced version now *only* sets the src.
    // We still call performUpdate() but only the iframe part is delayed.
    const debouncedSetPreviewSrc = debounce((url) => {
        console.log("Config Page (config.js): Debounced - Setting iframe src.");
        previewFrame.src = url;
    }, 350);

    // CHANGE: A version that updates immediately *except* for the iframe
    function updateImmediately() {
         const params = new URLSearchParams();
         // ... (Get all params again - slightly redundant but safer) ...
        const fontFamily = fontFamilySelect.value;
        const bgColor = document.getElementById('bgColor').value.substring(1);
        const textColor = document.getElementById('textColor').value.substring(1);
        const userColor = document.getElementById('userColor').value.substring(1);
        const fontSize = document.getElementById('fontSize').value;
        const hideAvatars = document.getElementById('hideAvatars').checked;
        const width = document.getElementById('width').value;
        const maxMessages = document.getElementById('maxMessages').value;
        const hideUsers = document.getElementById('hideUsers').value;
        const transparentBg = transparentBgCheckbox.checked;
        params.append('bgColor', bgColor); params.append('textColor', textColor); params.append('userColor', userColor);
        params.append('fontSize', fontSize); if (fontFamily) { params.append('fontFamily', fontFamily); }
        params.append('hideAvatars', hideAvatars); params.append('width', width); params.append('maxMessages', maxMessages);
        if (hideUsers) { params.append('hideUsers', hideUsers); } params.append('transparentBg', transparentBg);
         
         const finalUrl = `${baseUrl}?${params.toString()}`;
         outputUrlElement.textContent = finalUrl; // Update text box now
         debouncedSetPreviewSrc(finalUrl); // Update preview later
    }


    function copyUrl() { /* ... (copy function) ... */ }

    // --- Event Listeners ---
    transparentBgCheckbox.addEventListener('change', () => {
        bgColorInput.disabled = transparentBgCheckbox.checked;
        updateImmediately(); // Call the immediate/debounced version
    });
    form.addEventListener('input', updateImmediately);
    form.addEventListener('change', updateImmediately);
    copyButton.addEventListener('click', copyUrl);

    // --- Initial Call ---
    populateFontDropdown();
    bgColorInput.disabled = transparentBgCheckbox.checked;
    performUpdate(); // Call the FULL update ONCE to load the initial preview without delay
});