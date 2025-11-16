/// <reference types="svelte" />
/// <reference types="vite/client" />

// SCSS Module declarations for React components
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: string;
  export default content;
}
