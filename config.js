document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');
    const outputUrlElement = document.getElementById('output-url');
    const copyButton = document.getElementById('copy-button');
    const previewFrame = document.getElementById('preview-frame');
    // Get new elements
    const transparentBgCheckbox = document.getElementById('transparentBg');
    const bgColorInput = document.getElementById('bgColor');

    if (!form || !outputUrlElement || !copyButton || !previewFrame || !transparentBgCheckbox || !bgColorInput) {
        console.error("Config Page (config.js): One or more core HTML elements not found!");
        alert("Error: Configuration page elements not found. Please check HTML and IDs.");
        return;
    }

    const baseUrl = 'https://dvsarchitect.github.io/Rook-Chat/index.html';

    function debounce(func, wait) { /* ... (debounce function) ... */
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
        const transparentBg = transparentBgCheckbox.checked; // Get checkbox value

        params.append('bgColor', bgColor);
        params.append('textColor', textColor);
        params.append('userColor', userColor);
        params.append('fontSize', fontSize);
        if (fontFamily) { params.append('fontFamily', fontFamily); }
        params.append('hideAvatars', hideAvatars);
        params.append('width', width);
        params.append('maxMessages', maxMessages);
        if (hideUsers) { params.append('hideUsers', hideUsers); }
        params.append('transparentBg', transparentBg); // Add new parameter

        const finalUrl = `${baseUrl}?${params.toString()}`;
        outputUrlElement.textContent = finalUrl;
        previewFrame.src = finalUrl;
    }

    const debouncedPerformUpdate = debounce(performUpdate, 350);

    function copyUrl() { /* ... (copy function) ... */
        const urlToCopy = outputUrlElement.textContent;
        navigator.clipboard.writeText(urlToCopy).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => { copyButton.textContent = 'Copy URL'; }, 1500);
        }).catch(err => { alert('Failed to copy URL.'); });
    }

    // --- Add listener for the new checkbox ---
    transparentBgCheckbox.addEventListener('change', () => {
        bgColorInput.disabled = transparentBgCheckbox.checked;
        debouncedPerformUpdate(); // Trigger update when checkbox changes
    });

    // --- Add existing listeners ---
    form.addEventListener('input', debouncedPerformUpdate);
    form.addEventListener('change', debouncedPerformUpdate); // 'change' handles the checkbox too
    copyButton.addEventListener('click', copyUrl);

    // --- Initial Call ---
    bgColorInput.disabled = transparentBgCheckbox.checked; // Set initial disabled state
    performUpdate();
});