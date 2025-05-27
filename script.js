document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');
    const previewFrame = document.getElementById('preview-frame');

    const baseUrl = 'https://dvsarchitect.github.io/Rook-Chat/index.html';

    // --- Debounce Function ---
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

    // --- Original Function to Generate URL and Update ---
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

        // Update both the text box and the iframe
        outputUrlElement.textContent = finalUrl;
        previewFrame.src = finalUrl;
        console.log("Updating URL and Preview:", finalUrl);
    }

    // --- Create a debounced version of the ENTIRE update function ---
    const debouncedPerformUpdate = debounce(performUpdate, 350); // Use a ~350ms delay

    // --- Copy URL Function ---
    function copyUrl() {
        const urlToCopy = outputUrlElement.textContent;
        navigator.clipboard.writeText(urlToCopy).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy URL';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
            alert('Failed to copy URL. Please copy it manually.');
        });
    }

    // --- Event Listeners ---
    // Make BOTH event listeners call the DEBOUNCED version
    form.addEventListener('input', debouncedPerformUpdate);
    form.addEventListener('change', debouncedPerformUpdate);
    copyButton.addEventListener('click', copyUrl);

    // --- Initial Call ---
    // Call the original function directly ONCE on load to set initial state
    performUpdate();
});