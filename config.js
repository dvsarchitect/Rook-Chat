document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');

    let baseUrl = window.location.href.replace('config.html', '').replace(/\?.*/, '');
    if (!baseUrl.endsWith('/')) {
        baseUrl += '/';
    }
    baseUrl += 'index.html';
    // baseUrl = 'https://YOUR-USERNAME.github.io/YOUR-REPO/index.html'; // Manual override if needed

    function generateUrl() {
        const params = new URLSearchParams();

        // Get values and remove '#' from colors
        const bgColor = document.getElementById('bgColor').value.substring(1);
        const textColor = document.getElementById('textColor').value.substring(1);
        const userColor = document.getElementById('userColor').value.substring(1);
        const fontSize = document.getElementById('fontSize').value;
        const fontFamily = document.getElementById('fontFamily').value;
        const hideAvatars = document.getElementById('hideAvatars').checked;
        const width = document.getElementById('width').value; // New
        const maxMessages = document.getElementById('maxMessages').value; // New

        // Add parameters to the URL
        params.append('bgColor', bgColor);
        params.append('textColor', textColor);
        params.append('userColor', userColor);
        params.append('fontSize', fontSize);
        if (fontFamily) {
           params.append('fontFamily', fontFamily);
        }
        params.append('hideAvatars', hideAvatars);
        params.append('width', width); // New
        params.append('maxMessages', maxMessages); // New

        const finalUrl = `${baseUrl}?${params.toString()}`;
        outputUrlElement.textContent = finalUrl;
    }

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

    form.addEventListener('input', generateUrl);
    form.addEventListener('change', generateUrl);
    copyButton.addEventListener('click', copyUrl);
    generateUrl(); // Initial call
});
