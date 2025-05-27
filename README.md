# Rook Chat - A Customizable OBS Chat Widget

Rook Chat provides a clean, customizable chat overlay for your live streams, designed to be used as a Browser Source in OBS Studio (and compatible software). It allows you to tailor the look and feel of your chat display through an easy-to-use configuration tool.

This project is hosted on GitHub Pages, making it accessible to everyone without needing to run your own server.

---

## Features

* **Easy Configuration:** Use the web-based config tool to adjust settings – no coding required!
* **Live Preview:** See your changes in real-time on the configuration page.
* **Customizable Appearance:**
    * Background Color
    * Text Color
    * Username Color
    * Font Size
    * Font Family
    * Show/Hide User Avatars
    * Widget Width
    * Max Messages Displayed
* **User Filtering:** Hide messages from specific users (e.g., bots) using a comma-separated list.
* **GitHub Pages Hosted:** Free, reliable hosting.
* **URL-Based Settings:** Your preferences are saved directly in the URL you add to OBS.

---

## Quick Start: How to Use Rook Chat

1.  **Open the Configuration Tool:** Navigate to:
    * **`https://dvsarchitect.github.io/Rook-Chat/config.html`**

2.  **Customize Your Chat:** Use the form to adjust settings. Watch the live preview update!

3.  **Copy the URL:** Click the "Copy URL" button.

4.  **Add to OBS:** Follow the steps below.

---

## Adding Rook Chat to OBS Studio

1.  **Open OBS Studio.**
2.  **Select Your Scene.**
3.  **Add a Browser Source:**
    * Click `+` -> "Browser".
    * Give it a name (e.g., "Rook Chat").
4.  **Configure:**
    * Paste the copied **URL**.
    * Set the **Width** and **Height** (e.g., Width: 300, Height: 600 - adjust as needed).
    * In "Custom CSS", add:
        ```css
        body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }
        ```
    * Click "OK".
5.  **Position** the source in your scene.

---

## For Developers & Contributors

This project is built with HTML, CSS, and JavaScript.

* `index.html`: The chat widget display.
* `style.css`: Styles and CSS variables.
* `script.js`: URL parsing and chat message handling (**mock data only - needs real API integration!**).
* `config.html` & `config.js`: The configuration UI.

### **Connecting to Live Chat (Important!)**

**The current `script.js` only uses *mock* chat messages.** To make this fully functional, you *must* integrate a real chat API like [tmi.js](https://tmijs.com/) for Twitch or the YouTube Live Streaming API.

### **Contributing**

Fork, improve, and submit a pull request!

---

## License

This project is licensed under the MIT License.