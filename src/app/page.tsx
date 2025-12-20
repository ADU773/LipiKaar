import LipikaarConverter from '@/components/lipikaar-converter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold text-foreground">
            Lipikaar
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            A Figma-inspired tool to convert legacy Malayalam text to Unicode.
          </p>
        </header>
        <LipikaarConverter />
      </div>
    </main>
  );
}
