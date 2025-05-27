document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');
    const previewFrame = document.getElementById('preview-frame');
    const transparentBgCheckbox = document.getElementById('transparentBg');
    const bgColorInput = document.getElementById('bgColor');
    const fontFamilySelect = document.getElementById('fontFamily'); // Get the new select element

    // Define the Google Fonts we want to offer
    const googleFonts = [
        "Roboto", "Open Sans", "Lato", "Montserrat", "Oswald",
        "Source Sans Pro", "Raleway", "Poppins", "Nunito", "Inter",
        "Ubuntu", "Playfair Display", "Merriweather", "PT Sans"
    ];

    // --- Function to populate the font dropdown ---
    function populateFontDropdown() {
        // Add a default/system font option
        const defaultOption = document.createElement('option');
        defaultOption.value = "Arial, sans-serif"; // A safe default
        defaultOption.textContent = "Default (Arial)";
        fontFamilySelect.appendChild(defaultOption);

        // Add Google Fonts
        googleFonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font; // Use the font name as the value
            option.textContent = font;
            fontFamilySelect.appendChild(option);
        });
        
        // Set initial value (optional, or let it be default)
        fontFamilySelect.value = "Roboto"; 
    }

    if (!form || !outputUrlElement || !copyButton || !previewFrame || !transparentBgCheckbox || !bgColorInput || !fontFamilySelect) {
        console.error("Config Page (config.js): One or more core HTML elements not found!");
        alert("Error: Configuration page elements not found. Please check HTML and IDs.");
        return;
    }

    const baseUrl = 'https://dvsarchitect.github.io/Rook-Chat/index.html';

    function debounce(func, wait) { /* ... (debounce function) ... */ }

    function performUpdate() {
        const params = new URLSearchParams();
        // ... (getting other params remains the same) ...
        const fontFamily = fontFamilySelect.value; // Get value from select
        const bgColor = document.getElementById('bgColor').value.substring(1);
        const textColor = document.getElementById('textColor').value.substring(1);
        const userColor = document.getElementById('userColor').value.substring(1);
        const fontSize = document.getElementById('fontSize').value;
        const hideAvatars = document.getElementById('hideAvatars').checked;
        const width = document.getElementById('width').value;
        const maxMessages = document.getElementById('maxMessages').value;
        const hideUsers = document.getElementById('hideUsers').value;
        const transparentBg = transparentBgCheckbox.checked;

        params.append('bgColor', bgColor);
        params.append('textColor', textColor);
        params.append('userColor', userColor);
        params.append('fontSize', fontSize);
        // Add the selected font name to the URL
        if (fontFamily) { params.append('fontFamily', fontFamily); }
        params.append('hideAvatars', hideAvatars);
        params.append('width', width);
        params.append('maxMessages', maxMessages);
        if (hideUsers) { params.append('hideUsers', hideUsers); }
        params.append('transparentBg', transparentBg);

        const finalUrl = `${baseUrl}?${params.toString()}`;
        outputUrlElement.textContent = finalUrl;
        previewFrame.src = finalUrl;
    }

    const debouncedPerformUpdate = debounce(performUpdate, 350);

    function copyUrl() { /* ... (copy function) ... */ }

    // --- Event Listeners ---
    transparentBgCheckbox.addEventListener('change', () => {
        bgColorInput.disabled = transparentBgCheckbox.checked;
        debouncedPerformUpdate();
    });
    form.addEventListener('input', debouncedPerformUpdate);
    form.addEventListener('change', debouncedPerformUpdate);
    copyButton.addEventListener('click', copyUrl);

    // --- Initial Call ---
    populateFontDropdown(); // Populate the dropdown first!
    bgColorInput.disabled = transparentBgCheckbox.checked;
    performUpdate(); // Then run the first update
});