import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,mdx,stories.tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // usando as custom properties (tokens)
                primary: "var(--color-primary)",
                "primary-foreground": "var(--color-primary-foreground)",
                secondary: "var(--color-secondary)",
                explosive: "var(--color-explosive)"
            },
            borderRadius: {
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
            },
        },
    },
    plugins: [],
};

export default config;
