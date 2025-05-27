# Rook Chat - A Customizable OBS Chat Widget

Rook Chat provides a clean, customizable chat overlay for your live streams, designed to be used as a Browser Source in OBS Studio (and compatible software). It allows you to tailor the look and feel of your chat display through an easy-to-use configuration tool.

This project is hosted on GitHub Pages, making it accessible to everyone without needing to run your own server.

![Rook Chat Placeholder Image - A visual example would go here]

---

## Features

* **Easy Configuration:** Use the web-based config tool to adjust settings – no coding required!
* **Live Previews (via Config Tool):** See your changes as you make them before copying the URL.
* **Customizable Appearance:**
    * Background Color
    * Text Color
    * Username Color
    * Font Size
    * Font Family
    * Show/Hide User Avatars
    * (Add more features as you develop them!)
* **GitHub Pages Hosted:** Free, reliable hosting for both the widget and the configuration tool.
* **URL-Based Settings:** Your preferences are saved directly in the URL you add to OBS.

---

## Quick Start: How to Use Rook Chat

Getting Rook Chat set up for your stream is simple:

1.  **Open the Configuration Tool:** Navigate to the Rook Chat configuration page:
    * **`https://[YOUR-GITHUB-USERNAME].github.io/[YOUR-REPOSITORY-NAME]/config.html`**
    * *(Make sure to replace `[YOUR-GITHUB-USERNAME]` and `[YOUR-REPOSITORY-NAME]` with your actual GitHub details!)*

2.  **Customize Your Chat:** Use the form on the configuration page to adjust the colors, fonts, and other settings to match your stream's aesthetic.

3.  **Generate Your URL:** As you make changes, the "Generated OBS Browser Source URL" box will update automatically.

4.  **Copy the URL:** Once you're happy with your settings, click the "Copy URL" button.

5.  **Add to OBS:** Follow the steps below to add it to your OBS scene.

---

## Adding Rook Chat to OBS Studio

1.  **Open OBS Studio.**
2.  **Select Your Scene:** Choose the scene where you want your chat to appear.
3.  **Add a Browser Source:**
    * In the "Sources" dock, click the `+` button.
    * Select "Browser".
    * Give it a name (e.g., "Rook Chat Overlay").
    * Click "OK".
4.  **Configure the Browser Source:**
    * In the "URL" field, **paste the URL** you copied from the configuration tool.
    * Set the **Width** and **Height** to your desired dimensions (e.g., `Width: 400`, `Height: 600`). You can adjust this later.
    * **Important:** In the "Custom CSS" field, add the following line to ensure the background is transparent in OBS:
        ```css
        body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }
        ```
    * Check "Shutdown source when not visible" and "Refresh browser when scene becomes active" if desired.
    * Click "OK".
5.  **Position Your Chat:** You can now resize and move the Rook Chat source within your OBS scene like any other source.

---

## For Developers & Contributors

This project is built with basic HTML, CSS, and JavaScript.

* `index.html`: The main chat widget display.
* `style.css`: Contains the base styles and uses CSS variables for easy customization.
* `script.js`: Handles URL parameter parsing and **(Crucially) chat message handling.**
* `config.html` & `config.js`: The user interface for generating the custom URL.

### **Connecting to Live Chat (Important!)**

**The current `script.js` only includes *mock* chat messages for demonstration.** To make this fully functional, you *must* integrate a real chat API.

* **Twitch:** The most common approach is using [tmi.js](https://tmijs.com/), a popular JavaScript library for the Twitch IRC chat.
* **YouTube:** Requires using the [YouTube Live Streaming API](https://developers.google.com/youtube/v3/live/getting-started), which involves more complex authentication (OAuth).

If you wish to contribute, adding support for these platforms (or others) would be a fantastic enhancement!

### **Contributing**

Feel free to fork this repository, make improvements, and submit a pull request!

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## License

This project is licensed under the MIT License - see the `LICENSE` file (you should add one!) for details.

---

*Happy Streaming!*
