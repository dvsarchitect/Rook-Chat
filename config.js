document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');
    const previewFrame = document.getElementById('preview-frame');

    const baseUrl = 'https://dvsarchitect.github.io/Rook-Chat/index.html';

    function debounce(func, wait) { /* ... (debounce function remains the same) ... */
        let timeout;
        return function executedFunction(...args) {
            const later = () => { clearTimeout(timeout); func(...args); };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function updatePreview(url) { previewFrame.src = url; }
    const debouncedUpdatePreview = debounce(updatePreview, 300);

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
        const hideUsers = document.getElementById('hideUsers').value; // Get hidden users

        params.append('bgColor', bgColor);
        params.append('textColor', textColor);
        params.append('userColor', userColor);
        params.append('fontSize', fontSize);
        if (fontFamily) { params.append('fontFamily', fontFamily); }
        params.append('hideAvatars', hideAvatars);
        params.append('width', width);
        params.append('maxMessages', maxMessages);
        if (hideUsers) { params.append('hideUsers', hideUsers); } // Add if present

        const finalUrl = `${baseUrl}?${params.toString()}`;
        outputUrlElement.textContent = finalUrl;
        debouncedUpdatePreview(finalUrl);
    }

    function copyUrl() { /* ... (copy function remains the same) ... */
        const urlToCopy = outputUrlElement.textContent;
        navigator.clipboard.writeText(urlToCopy).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => { copyButton.textContent = 'Copy URL'; }, 1500);
        }).catch(err => { alert('Failed to copy URL.'); });
    }

    form.addEventListener('input', generateUrlAndUpdate);
    form.addEventListener('change', generateUrlAndUpdate);
    copyButton.addEventListener('click', copyUrl);
    generateUrlAndUpdate();
});