// This file is not used by the Figma plugin, but is kept for potential future web-based features.

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold text-foreground">
          Figma Plugin Project
        </h1>
        <p className="text-muted-foreground mt-4 text-sm">
          To run the plugin, open Figma, go to "Plugins" &gt; "Development" &gt; "Import plugin from manifest..." and select the <code>manifest.json</code> file from the <code>public</code> directory.
        </p>
      </div>
    </main>
  );
}
