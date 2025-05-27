document.addEventListener('DOMContentLoaded', () => {
    console.log("Config Page: DOMContentLoaded fired.");
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');
    const previewFrame = document.getElementById('preview-frame');
    const transparentBgCheckbox = document.getElementById('transparentBg');
    const bgColorInput = document.getElementById('bgColor');
    const fontFamilySelect = document.getElementById('fontFamily');

    const googleFonts = [ "Roboto", "Open Sans", "Lato", "Montserrat", "Oswald", "Source Sans Pro", "Raleway", "Poppins", "Nunito", "Inter", "Ubuntu", "Playfair Display", "Merriweather", "PT Sans" ];

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
        fontFamilySelect.value = "Roboto";
        console.log("Config Page: Font dropdown populated.");
    }

    if (!form || !outputUrlElement || !copyButton || !previewFrame || !transparentBgCheckbox || !bgColorInput || !fontFamilySelect) {
        console.error("Config Page: One or more core HTML elements not found!");
        return;
    }

    const baseUrl = 'https://dvsarchitect.github.io/Rook-Chat/index.html';

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => { clearTimeout(timeout); func(...args); };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function buildUrl() {
        const params = new URLSearchParams();
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
        return `${baseUrl}?${params.toString()}`;
    }

    function updatePage(isInitial = false) {
        const finalUrl = buildUrl();
        outputUrlElement.textContent = finalUrl;
        // Only set src if it's initial or debounced
        if (isInitial) {
             previewFrame.src = finalUrl;
             console.log("Config Page: Setting IFRAME src (Initial).");
        }
    }

    const debouncedUpdatePreview = debounce(() => {
        previewFrame.src = buildUrl();
        console.log("Config Page: Setting IFRAME src (Debounced).");
    }, 400); // Increased debounce slightly

    function handleFormChange() {
        bgColorInput.disabled = transparentBgCheckbox.checked;
        // Always update text box immediately
        outputUrlElement.textContent = buildUrl();
        // Call debounced version to update iframe
        debouncedUpdatePreview();
    }

    function copyUrl() { /* ... (copy function) ... */ }

    populateFontDropdown();
    bgColorInput.disabled = transparentBgCheckbox.checked;
    form.addEventListener('input', handleFormChange);
    form.addEventListener('change', handleFormChange);
    copyButton.addEventListener('click', copyUrl);
    updatePage(true); // Initial call, ensuring iframe loads
    console.log("Config Page: Initialized.");
});