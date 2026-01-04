# How to keep Kinetiq Online (Deployment Guide)

To have the app "always online" accessible from anywhere (without your PC running), you need to **Deploy** it to the cloud. The best way for Next.js is **Vercel**.

## Option 1: Vercel (Recommended)
1.  Create a [GitHub Account](https://github.com/).
2.  Push this code to a GitHub repository.
3.  Go to [Vercel.com](https://vercel.com/) and Sign Up with GitHub.
4.  Click **"Add New Project"** and select your Kinetiq repository.
5.  **Important**: In the configuration step, under **Environment Variables**, add:
    *   `GEMINI_API_KEY`: [Your Google AI Key]
6.  Click **Deploy**.

Vercel will give you a public URL (e.g., `kinetiq-app.vercel.app`) that works 24/7 on any device.

## Option 2: Local Network (Current)
If you just want it closer to "Always On" on your PC:
1.  Use `ngrok` or `cloudflared` (as you tried).
2.  Your PC **must stay on**.
3.  The terminal must remain open.

## Mobile Experience
We have just updated the CSS to handle iPhone notches ("Safe Areas") and keyboard interactions better. Refresh the app on your phone to see the improvements.
