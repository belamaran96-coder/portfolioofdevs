// This utility exports configuration for post-processing effects.
// In this project, we are using @react-three/postprocessing components directly in App.jsx
// for better React integration. However, this file serves as a central config or 
// a place to export custom effects if needed in the future.

export const bloomConfig = {
    luminanceThreshold: 1,
    mipmapBlur: true,
    intensity: 1.5
};

export const noiseConfig = {
    opacity: 0.02
};

export const vignetteConfig = {
    eskil: false,
    offset: 0.1,
    darkness: 1.1
};
