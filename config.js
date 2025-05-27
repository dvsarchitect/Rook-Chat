document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');
    const previewFrame = document.getElementById('preview-frame'); // Get the iframe

    // --- Set the Base URL explicitly ---
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

    // --- Function to update ONLY the iframe ---
    function updatePreview(url) {
        console.log("Updating preview with:", url);
        previewFrame.src = url;
    }

    // --- Create a debounced version of the updatePreview function ---
    const debouncedUpdatePreview = debounce(updatePreview, 300); // 300ms delay

    // --- Generate URL and Update Preview ---
    function generateUrlAndUpdate() {
        const params = new URLSearchParams();

        const bgColor = document.getElementById('bgColor').value.substring(1);
        const textColor = document.getElementById('textColor').value.substring(1);
        const userColor = document.getElementById('userColor').value.substring(1);
        const fontSize = document.getElementById('fontSize').value;
        const fontFamily = document.getElementById('fontFamily').value;
        const hideAvatars = document.getElementById('hideAvatars').checked;
        const width = document.getElementById('width').value;
        const maxMessages = document.getElementById('maxMessages').value;

        params.append('bgColor', bgColor);
        params.append('textColor', textColor);
        params.append('userColor', userColor);
        params.append('fontSize', fontSize);
        if (fontFamily) {
           params.append('fontFamily', fontFamily);
        }
        params.append('hideAvatars', hideAvatars);
        params.append('width', width);
        params.append('maxMessages', maxMessages);

        const finalUrl = `${baseUrl}?${params.toString()}`;

        // Update the text box immediately
        outputUrlElement.textContent = finalUrl;

        // Update the iframe using the debounced function
        debouncedUpdatePreview(finalUrl);
    }

    // --- Copy URL Function (No change) ---
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
    form.addEventListener('input', generateUrlAndUpdate);
    form.addEventListener('change', generateUrlAndUpdate);
    copyButton.addEventListener('click', copyUrl);

    // --- Initial Call ---
    // We don't need to call generateUrlAndUpdate() anymore because the
    // iframe now has a valid initial src attribute set in the HTML.
    // However, we DO need to populate the output URL box initially.
    generateUrlAndUpdate();
});