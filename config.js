document.addEventListener('DOMContentLoaded', () => {
    // Get elements *inside* the listener
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');
    const previewFrame = document.getElementById('preview-frame');

    // Check if elements exist
    if (!form || !outputUrlElement || !copyButton || !previewFrame) {
        console.error("Config Page (config.js): One or more core HTML elements not found!");
        alert("Error: Configuration page elements not found. Please check HTML and IDs.");
        return; // Stop if core elements are missing
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

    function performUpdate() {
        const params = new URLSearchParams();
        const bgColor = document.getElementById('bgColor').value.substring(1);
        const textColor = document.getElementById('textColor').value.substring(1);
        const userColor = document.getElementById('userColor').value.substring(1);
        const fontSize = document.getElementById('fontSize').value;
        const fontFamily = document.getElementById('fontFamily').value;
        const hideAvatars = document.getElementById('hideAvatars').checked;
        const width = document.getElementById('width').value;
        const maxMessages = document.getElementById('maxMessages').value;
        const hideUsers = document.getElementById('hideUsers').value;

        params.append('bgColor', bgColor);
        params.append('textColor', textColor);
        params.append('userColor', userColor);
        params.append('fontSize', fontSize);
        if (fontFamily) { params.append('fontFamily', fontFamily); }
        params.append('hideAvatars', hideAvatars);
        params.append('width', width);
        params.append('maxMessages', maxMessages);
        if (hideUsers) { params.append('hideUsers', hideUsers); }

        const finalUrl = `${baseUrl}?${params.toString()}`;
        outputUrlElement.textContent = finalUrl;
        previewFrame.src = finalUrl;
        console.log("Config Page (config.js): Updating URL and Preview.");
    }

    const debouncedPerformUpdate = debounce(performUpdate, 350);

    function copyUrl() {
        const urlToCopy = outputUrlElement.textContent;
        navigator.clipboard.writeText(urlToCopy).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => { copyButton.textContent = 'Copy URL'; }, 1500);
        }).catch(err => { console.error('Failed to copy URL: ', err); alert('Failed to copy URL.'); });
    }

    // Add listeners *after* checking if 'form' exists
    form.addEventListener('input', debouncedPerformUpdate);
    form.addEventListener('change', debouncedPerformUpdate);
    copyButton.addEventListener('click', copyUrl);

    // Initial call
    performUpdate();
    console.log("Config Page (config.js): Initialized and first update called.");

}); // End of DOMContentLoaded