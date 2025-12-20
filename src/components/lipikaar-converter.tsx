"use client";

// This component is not used in the primary Figma plugin flow anymore.
// The UI logic has been moved to public/ui.html.
// This file is kept for potential future use if a web-based version is needed.

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LipikaarConverter() {

  return (
    <Card className="w-full shadow-lg border-2 border-border/80">
      <CardHeader>
        <CardTitle className="font-headline text-2xl tracking-wide">Web App Shell</CardTitle>
        <CardDescription>
          The main functionality of this plugin now resides in <code>public/ui.html</code> and is designed to run inside Figma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This React component is no longer the primary interface for the plugin.</p>
        <p>To use the Lipikaar converter, please load the plugin directly in the Figma desktop app.</p>
      </CardContent>
    </Card>
  );
}
