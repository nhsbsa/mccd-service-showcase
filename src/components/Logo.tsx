import React from 'react';

type LogoProps = {
  className?: string
  hasUnderline?: boolean
}
function Logo({ className = '', hasUnderline = false }: LogoProps) {
  return (
    <svg
      className={[className].join(' ')}
      width="166.21px"
      height="36.02px"
      aria-label="Hippo Digital"
      focusable="false"
      viewBox="0 0 391.56 85.107"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="logo-mark"
        d="m33.885 70.954a28.24 28.24 0 0 1-4.03-0.06v0.1a14.1 14.1 0 1 1-21.4-12.05 29.44 29.44 0 0 1-5.76-17.54v-0.07a2.86 2.86 0 1 1 0.48-5.24 29.59 29.59 0 0 1 44.09-20.21c0.67-3.24 2.38-6.1 4.76-8.23a3.92 3.92 0 1 1 5.04-2.98 15.19 15.19 0 0 1 19.76 10.5 18.4 18.4 0 1 1-8.76 17.78 15.05 15.05 0 0 1-7.1 1.17 29.63 29.63 0 0 1-5.09 25.14 14.07 14.07 0 0 1-7.9 25.75 14.08 14.08 0 0 1-14.09-14.06zm237.04-15.17a11.75 11.75 0 0 0 4.13-3.65v4.56h4.28v-39.9h-4.28v16.02a11.62 11.62 0 0 0-4.13-3.71 12.63 12.63 0 0 0-6.07-1.37c-2.77 0-5.2 0.66-7.27 1.97s-3.68 3.08-4.82 5.3-1.71 4.7-1.71 7.44c0 2.7 0.57 5.17 1.71 7.41s2.75 4.02 4.82 5.33 4.49 1.97 7.27 1.97c2.36-0.01 4.38-0.46 6.07-1.37zm-10.91-3.99c-1.52-0.99-2.68-2.31-3.48-3.96s-1.2-3.45-1.2-5.39c0-1.98 0.4-3.78 1.2-5.41s1.96-2.94 3.48-3.93 3.33-1.48 5.42-1.48c2.13 0 3.92 0.49 5.39 1.48 1.46 0.99 2.57 2.3 3.33 3.93s1.14 3.44 1.14 5.41c0 1.94-0.38 3.73-1.14 5.39-0.76 1.65-1.87 2.97-3.33 3.96s-3.26 1.48-5.39 1.48c-2.1 0-3.9-0.5-5.42-1.48zm29.75-28.39v-5.59h-4.62v5.59zm-0.17 33.29v-28.5h-4.27v28.5zm28.98 8.49c2.34-2.17 3.51-5.28 3.51-9.35v-27.65h-4.28v4.56a11.36 11.36 0 0 0-4.13-3.68 12.89 12.89 0 0 0-6.07-1.34 13.03 13.03 0 0 0-12.09 7.1 15.74 15.74 0 0 0-1.71 7.38c0 2.7 0.57 5.15 1.71 7.35s2.74 3.94 4.82 5.22a13.62 13.62 0 0 0 7.27 1.91c2.36 0 4.38-0.46 6.07-1.4a12.03 12.03 0 0 0 4.13-3.68v3.93c0 2.93-0.75 5.16-2.25 6.7s-3.89 2.31-7.15 2.31c-2.17 0-3.95-0.39-5.36-1.17s-2.39-1.87-2.96-3.28h-4.73c0.8 2.47 2.32 4.47 4.56 6.01s5.15 2.31 8.72 2.31c4.29 0.02 7.61-1.06 9.94-3.23zm-15.81-13.79a9.31 9.31 0 0 1-3.48-3.85c-0.8-1.61-1.2-3.39-1.2-5.33 0-1.98 0.4-3.76 1.2-5.36s1.96-2.87 3.48-3.82 3.32-1.42 5.42-1.42c2.09 0 3.87 0.48 5.33 1.42 1.46 0.95 2.58 2.22 3.36 3.82s1.17 3.38 1.17 5.36c0 1.94-0.39 3.71-1.17 5.33s-1.9 2.9-3.36 3.85-3.24 1.42-5.33 1.42a10 10 0 0 1-5.42-1.42zm29.75-27.99v-5.59h-4.62v5.59zm-0.17 33.29v-28.5h-4.28v28.5zm13.34 0v-24.74h6.55v-3.76h-6.55v-10.2h-4.28v10.2h-5.81v3.76h5.81v24.74zm27.33-0.91a11.75 11.75 0 0 0 4.13-3.65v4.56h4.27v-28.5h-4.27v4.62a11.7 11.7 0 0 0-4.13-3.71 12.63 12.63 0 0 0-6.07-1.37c-2.78 0-5.2 0.66-7.27 1.97s-3.68 3.08-4.82 5.3-1.71 4.7-1.71 7.44c0 2.7 0.57 5.17 1.71 7.41s2.74 4.02 4.82 5.33a13.3 13.3 0 0 0 7.27 1.97c2.35-0.01 4.38-0.46 6.07-1.37zm-10.92-3.99c-1.52-0.99-2.68-2.31-3.48-3.96s-1.2-3.45-1.2-5.39c0-1.98 0.4-3.78 1.2-5.41s1.96-2.94 3.48-3.93 3.32-1.48 5.41-1.48c2.13 0 3.92 0.49 5.39 1.48a9.6 9.6 0 0 1 3.34 3.93 12.67 12.67 0 0 1 1.14 5.41c0 1.94-0.38 3.73-1.14 5.39a9.42 9.42 0 0 1-3.34 3.96 9.39 9.39 0 0 1-5.39 1.48c-2.08 0-3.89-0.5-5.41-1.48zm29.58 4.9v-39.9h-4.27v39.9zm-271.37 0v-16.42c0-1.71 0.39-3.22 1.17-4.53s1.81-2.33 3.11-3.05a8.75 8.75 0 0 1 4.33-1.08c2.36 0 4.27 0.79 5.76 2.37 1.48 1.58 2.22 3.66 2.22 6.24v16.47h4.27v-16.59c0-2.7-0.54-4.97-1.62-6.81s-2.49-3.23-4.22-4.16-3.58-1.4-5.56-1.4c-2.32 0-4.22 0.48-5.7 1.42a14.21 14.21 0 0 0-3.76 3.48v-15.85h-4.27v39.9h4.27zm31.01-33.29v-5.59h-4.62v5.59zm-0.17 33.29v-28.5h-4.28v28.5zm10.26 11.28v-15.9c1.06 1.52 2.44 2.75 4.13 3.68s3.71 1.4 6.07 1.4c2.77 0 5.2-0.66 7.27-1.97s3.68-3.09 4.82-5.33 1.71-4.71 1.71-7.41c0-2.74-0.57-5.22-1.71-7.44s-2.75-3.99-4.82-5.3-4.49-1.97-7.27-1.97c-2.36 0-4.38 0.45-6.07 1.34s-3.07 2.12-4.13 3.68v-4.56h-4.27v39.79h4.27zm4.27-16.18c-1.48-0.99-2.6-2.31-3.36-3.96s-1.14-3.45-1.14-5.39c0-1.98 0.38-3.78 1.14-5.41s1.88-2.94 3.36-3.93 3.27-1.48 5.36-1.48c2.13 0 3.94 0.49 5.44 1.48s2.65 2.3 3.45 3.93 1.2 3.44 1.2 5.41c0 1.94-0.4 3.73-1.2 5.39-0.8 1.65-1.95 2.97-3.45 3.96s-3.32 1.48-5.44 1.48c-2.09 0-3.87-0.5-5.36-1.48zm28.22 16.18v-15.9c1.06 1.52 2.44 2.75 4.13 3.68s3.71 1.4 6.07 1.4c2.77 0 5.2-0.66 7.27-1.97s3.68-3.09 4.82-5.33 1.71-4.71 1.71-7.41c0-2.74-0.57-5.22-1.71-7.44s-2.75-3.99-4.82-5.3-4.49-1.97-7.27-1.97c-2.36 0-4.38 0.45-6.07 1.34s-3.07 2.12-4.13 3.68v-4.56h-4.28v39.79h4.28zm4.27-16.18c-1.48-0.99-2.6-2.31-3.36-3.96s-1.14-3.45-1.14-5.39c0-1.98 0.38-3.78 1.14-5.41s1.88-2.94 3.36-3.93 3.27-1.48 5.36-1.48c2.13 0 3.94 0.49 5.44 1.48s2.65 2.3 3.45 3.93 1.2 3.44 1.2 5.41c0 1.94-0.4 3.73-1.2 5.39-0.8 1.65-1.95 2.97-3.45 3.96s-3.32 1.48-5.44 1.48c-2.09 0-3.87-0.5-5.36-1.48zm43.86 3.39c2.11-1.31 3.73-3.09 4.87-5.33s1.71-4.71 1.71-7.41c0-2.74-0.57-5.22-1.71-7.44s-2.76-3.99-4.87-5.3-4.63-1.97-7.55-1.97c-2.89 0-5.4 0.66-7.52 1.97-2.13 1.31-3.76 3.08-4.9 5.3s-1.71 4.7-1.71 7.44c0 2.7 0.57 5.17 1.71 7.41s2.77 4.02 4.9 5.33 4.64 1.97 7.52 1.97c2.93-0.01 5.45-0.66 7.55-1.97zm-12.91-3.39c-1.48-0.99-2.6-2.31-3.36-3.96s-1.14-3.45-1.14-5.39c0-1.98 0.38-3.78 1.14-5.41s1.88-2.94 3.36-3.93 3.27-1.48 5.36-1.48c2.13 0 3.92 0.49 5.39 1.48 1.46 0.99 2.57 2.3 3.33 3.93s1.14 3.44 1.14 5.41c0 1.94-0.38 3.73-1.14 5.39-0.76 1.65-1.87 2.97-3.33 3.96s-3.26 1.48-5.39 1.48c-2.09 0-3.87-0.5-5.36-1.48z"
        fill="currentColor"
      />
      {hasUnderline && (
      <path
        id="logo-underline"
        fill="transparent"
        d="m116.04 62.429v3.9473h36.449v-3.9473zm50.02 0v3.9473h18.91v-3.9473zm32.49 0v3.9473h94.98c-0.92954-1.1977-1.654-2.5334-2.2129-3.9473zm127.02 6.87e-4c-0.4848 1.4167-1.1311 2.7421-1.9609 3.9458l68.071-0.06687v-3.9475z"
      />
      )}
    </svg>
  );
}

export default Logo;
