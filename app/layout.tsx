import type { Metadata } from "next";
import {
    Righteous,
    Bungee,
    Bungee_Shade,
    Luckiest_Guy,
    Black_Ops_One,
    Orbitron,
    Audiowide,
    Space_Mono,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Pop art font options - uncomment the one you want to use
// const font = Righteous({
//     subsets: ["latin"],
//     weight: "400",
//     variable: "--font-sans",
//     fallback: ["Impact", "Arial Black", "Arial", "sans-serif"],
//     display: "swap",
// });

// const font = Bungee({
//     subsets: ["latin"],
//     weight: "400",
//     variable: "--font-sans",
//     fallback: ["Impact", "Arial Black", "Arial", "sans-serif"],
//     display: "swap",
// });

// const font = Bungee_Shade({
//     subsets: ["latin"],
//     weight: "400",
//     variable: "--font-sans",
//     fallback: ["Impact", "Arial Black", "Arial", "sans-serif"],
//     display: "swap",
// });

// const font = Luckiest_Guy({
//     subsets: ["latin"],
//     weight: "400",
//     variable: "--font-sans",
//     fallback: ["Impact", "Arial Black", "Arial", "sans-serif"],
//     display: "swap",
// });

// const font = Black_Ops_One({
//     subsets: ["latin"],
//     weight: "400",
//     variable: "--font-sans",
//     fallback: ["Impact", "Arial Black", "Arial", "sans-serif"],
//     display: "swap",
// });

// const font = Orbitron({
//     subsets: ["latin"],
//     weight: ["400", "700", "900"],
//     variable: "--font-sans",
//     fallback: ["Impact", "Arial Black", "Arial", "sans-serif"],
//     display: "swap",
// });

const font = Audiowide({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-sans",
    fallback: ["Impact", "Arial Black", "Arial", "sans-serif"],
    display: "swap",
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-mono",
    fallback: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
    ],
    display: "swap",
});

export const metadata: Metadata = {
    title: "MMATRON - Learn How Perceptrons Work",
    description:
        "An educational MMA-themed game teaching perceptron concepts to kids",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${font.variable} ${spaceMono.variable} font-sans antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
