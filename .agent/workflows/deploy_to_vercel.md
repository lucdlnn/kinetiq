---
description: How to deploy Kinetiq to Vercel and manage updates
---

# Kinetiq Deployment & Update Workflow

This guide explains how to put your app online for free using Vercel and how to update it automatically.

## Part 1: First-Time Setup (Do this once)

### 1. Create a GitHub Repository
1.  Go to [GitHub.com](https://github.com/new).
2.  Name the repository `kinetiq`.
3.  Set visibility to **Public** or **Private**.
4.  **Do not** initialize with README/gitignore (we have them).
5.  Click **Create repository**.

### 2. Connect Your Code (Terminal)
Copy the commands GitHub gives you under *"…or push an existing repository from the command line"* and run them in your terminal here. They look like this:

```bash
git remote add origin https://github.com/YOUR_USERNAME/kinetiq.git
git branch -M main
git push -u origin main
```

### 3. Deploy on Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Find `kinetiq` in the list (Import from GitHub).
4.  **Critical Step**: In "Environment Variables", add:
    *   **Name**: `GEMINI_API_KEY`
    *   **Value**: (Paste your key starting with `AIza...`)
5.  Click **Deploy**.

---

## Part 2: How to Update (Continuous Deployment)

Since the app is a "draft", you will make many changes. Vercel makes this automatic.

**Whenever you want to save changes online:**

1.  **Save** your code files.
2.  Run these 3 commands in the terminal:

```bash
git add .
git commit -m "Description of changes (e.g., Updated homepage)"
git push
```

**That's it!** ⚡
Vercel will detect the `git push`, build the new version, and update the website automatically in about 1-2 minutes. You don't need to touch Vercel again.
