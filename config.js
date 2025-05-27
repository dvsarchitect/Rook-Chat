document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');

    // --- IMPORTANT: Determine the Base URL ---
    // This attempts to guess the base URL assuming index.html is in the same
    // directory or the root. You might need to adjust this if your structure
    // is different or if GitHub Pages uses a sub-path.
    // For a typical GitHub Pages setup (username.github.io/repo/), this should work.
    let baseUrl = window.location.href.replace('config.html', '').replace(/\?.*/, '');
    // If it doesn't end with a /, add one.
    if (!baseUrl.endsWith('/')) {
        baseUrl += '/';
    }
    // Ensure it points to index.html
    baseUrl += 'index.html';

    // --- OR: Manually set it if the guess is wrong ---
    // baseUrl = 'https://YOUR-USERNAME.github.io/YOUR-REPO/index.html';
    // ---

    function generateUrl() {
        const params = new URLSearchParams();

        // Get values and remove '#' from colors
        const bgColor = document.getElementById('bgColor').value.substring(1);
        const textColor = document.getElementById('textColor').value.substring(1);
        const userColor = document.getElementById('userColor').value.substring(1);
        const fontSize = document.getElementById('fontSize').value;
        const fontFamily = document.getElementById('fontFamily').value;
        const hideAvatars = document.getElementById('hideAvatars').checked;

        // Add parameters to the URL
        params.append('bgColor', bgColor);
        params.append('textColor', textColor);
        params.append('userColor', userColor);
        params.append('fontSize', fontSize);
        if (fontFamily) { // Only add if not empty
           params.append('fontFamily', fontFamily);
        }
        params.append('hideAvatars', hideAvatars);

        const finalUrl = `${baseUrl}?${params.toString()}`;
        outputUrlElement.textContent = finalUrl;
    }

    function copyUrl() {
        const urlToCopy = outputUrlElement.textContent;
        navigator.clipboard.writeText(urlToCopy).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy URL';
            }, 1500); // Reset button text after 1.5 seconds
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
            alert('Failed to copy URL. Please copy it manually.');
        });
    }

    // Add event listeners to all inputs to regenerate URL on change
    form.addEventListener('input', generateUrl);
    form.addEventListener('change', generateUrl); // For checkboxes and selects if added

    // Add event listener for the copy button
    copyButton.addEventListener('click', copyUrl);

    // Generate the initial URL when the page loads
    generateUrl();
});