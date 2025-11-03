import type { Metadata } from "next";
import { Bangers, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const bangers = Bangers({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-sans",
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-mono",
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
                className={`${bangers.variable} ${spaceMono.variable} font-sans antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
