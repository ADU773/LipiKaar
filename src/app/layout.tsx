import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Lipikaar - Malayalam Unicode Converter',
  description: 'Convert legacy Malayalam text to Unicode seamlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Chilanka&family=Inter:wght@400;500;700&family=Literata:opsz,wght@6..72,400;6..72,700&family=Noto+Sans+Malayalam:wght@400;700&family=Noto+Serif+Malayalam:wght@400;700&family=Uroob&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
