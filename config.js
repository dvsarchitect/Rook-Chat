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

    function populateFontDropdown() { /* ... (same as before) ... */ }

    if (!form || !outputUrlElement || !copyButton || !previewFrame || !transparentBgCheckbox || !bgColorInput || !fontFamilySelect) {
        console.error("Config Page (config.js): One or more core HTML elements not found!");
        return;
    }

    const baseUrl = 'https://dvsarchitect.github.io/Rook-Chat/index.html';

    // --- ADDED: The actual Debounce Function ---
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    // --- End of Debounce Function ---

    function performUpdate() { /* ... (same as before) ... */ }

    const debouncedSetPreviewSrc = debounce((url) => {
        previewFrame.src = url;
    }, 350);

    function updateImmediately() {
         const params = new URLSearchParams();
         // ... (Get all params ... ) ...
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
         outputUrlElement.textContent = finalUrl;
         debouncedSetPreviewSrc(finalUrl);
    }

    function copyUrl() { /* ... (same as before) ... */ }

    // --- Event Listeners ---
    transparentBgCheckbox.addEventListener('change', () => {
        bgColorInput.disabled = transparentBgCheckbox.checked;
        updateImmediately();
    });
    form.addEventListener('input', updateImmediately);
    form.addEventListener('change', updateImmediately);
    copyButton.addEventListener('click', copyUrl);

    // --- Initial Call ---
    populateFontDropdown();
    bgColorInput.disabled = transparentBgCheckbox.checked;
    performUpdate();
});