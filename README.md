# Cinematic Portfolio

A production-ready React + Vite portfolio with 3D visuals, AI integration, and voice control.

## 🚀 Quick Start

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    -   Copy `.env.example` to `.env`
    -   Add your Google Gemini API Key to `GEMINI_API_KEY` in `.env`

3.  **Run Locally:**
    ```bash
    npm run dev:full
    ```
    This runs both the Express backend (port 3001) and Vite frontend (port 5173).

## 📦 Deployment (Vercel)

1.  Push to GitHub.
2.  Import project into Vercel.
3.  Add Environment Variable: `GEMINI_API_KEY`.
4.  Deploy. Vercel will automatically handle the `api/` directory as serverless functions.

## 🎨 Assets & DRACO Compression

The project uses placeholders. To use real assets:

1.  **Robot Model:** Place your `robot.glb` in `public/`.
2.  **DRACO Compression:**
    If your models are large, compress them using `gltf-pipeline`:
    ```bash
    npm install -g gltf-pipeline
    gltf-pipeline -i original.glb -o robot.glb --draco.compressionLevel=10
    ```
    The `useGLTF` hook in the code is already set up to handle DRACO if you provide the decoder path (defaulting to CDN in `drei`).

## 🛠 Tech Stack

-   **Frontend:** React 18, Vite, TailwindCSS, Framer Motion
-   **3D:** Three.js, @react-three/fiber, @react-three/drei
-   **AI:** Google Gemini (via server proxy)
-   **Voice:** Web Speech API
