import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "$web/components/react-query-client-provider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "$web/lib/utils";
import { ThemeProvider } from "$web/components/theme-provider";
import { ModeToggle } from "$web/components/mode-toggle";
import Link from "next/link";
import { Button } from "$web/components/ui/button";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReactQueryClientProvider>
            <html lang="en">
                <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <nav className="flex justify-between py-4">
                                <ul className="flex gap-4 text-primary">
                                    <li>
                                        <Link href="/applications">Applications</Link>
                                    </li>
                                </ul>
                                <ul className="flex gap-4 text-primary items-center">
                                    <li>
                                        <Link href="/signup">
                                            <Button variant="secondary">Sign Up</Button>
                                        </Link>
                                    </li>
                                    <li>
                                        <ModeToggle />
                                    </li>
                                </ul>
                            </nav>
                            {children}
                        </main>
                    </ThemeProvider>
                </body>
            </html>
        </ReactQueryClientProvider>
    );
}
