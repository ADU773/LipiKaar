"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, RotateCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { convertLegacyToUnicode } from '@/lib/malayalam-converter';

type TypographyStyles = {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

const MALAYALAM_FONTS = [
  'Noto Sans Malayalam',
  'Noto Serif Malayalam',
  'Chilanka',
  'Uroob',
  'Inter', // Add Inter as a fallback/comparison
];

export default function LipikaarConverter() {
  const [legacyText, setLegacyText] = useState('');
  const [unicodeText, setUnicodeText] = useState('');
  const [selectedFont, setSelectedFont] = useState(MALAYALAM_FONTS[0]);
  const [fontSize, setFontSize] = useState(20);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [message, setMessage] = useState<string | null>('Paste or type legacy Malayalam text in the input box to get started.');
  
  const { toast } = useToast();

  useEffect(() => {
    if (legacyText.trim() === '') {
      setUnicodeText('');
      setMessage('Paste or type legacy Malayalam text in the input box to get started.');
      return;
    }

    const { converted, wasChanged } = convertLegacyToUnicode(legacyText);
    setUnicodeText(converted);

    if (!wasChanged) {
      setMessage('The text appears to be in Unicode already. No conversion was performed.');
    } else {
      setMessage(null);
    }
  }, [legacyText]);

  const typographyStyles: TypographyStyles = useMemo(() => ({
    fontFamily: `'${selectedFont}', sans-serif`,
    fontSize: `${fontSize}px`,
    lineHeight: `${lineHeight}`,
    letterSpacing: `${letterSpacing}px`,
  }), [selectedFont, fontSize, lineHeight, letterSpacing]);

  const handleReset = () => {
    setLegacyText('');
    setUnicodeText('');
    setSelectedFont(MALAYALAM_FONTS[0]);
    setFontSize(20);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setMessage('Paste or type legacy Malayalam text in the input box to get started.');
    toast({
      title: 'Reset Complete',
      description: 'All fields have been reset to their default values.',
    });
  };

  const handleApply = () => {
    if (!unicodeText) {
      toast({
        variant: 'destructive',
        title: 'Nothing to Copy',
        description: 'There is no converted text to copy.',
      });
      return;
    }
    navigator.clipboard.writeText(unicodeText);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The Unicode Malayalam text has been copied.',
    });
  };

  return (
    <Card className="w-full shadow-lg border-2 border-border/80">
      <CardHeader>
        <CardTitle className="font-headline text-2xl tracking-wide">Text Converter</CardTitle>
        <CardDescription>
          Convert legacy Malayalam script to Unicode and apply typography settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="legacy-input" className="text-sm font-medium">Legacy Text (e.g., ML-TTKarthika)</Label>
            <Textarea
              id="legacy-input"
              placeholder=" ഇവിടെ ടൈപ്പ് ചെയ്യുക..."
              value={legacyText}
              onChange={(e) => setLegacyText(e.target.value)}
              className="h-48 resize-none text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unicode-output" className="text-sm font-medium">Unicode Preview</Label>
            <div
              id="unicode-output"
              style={typographyStyles}
              className="h-48 w-full rounded-md border bg-background px-3 py-2 overflow-y-auto"
            >
              {unicodeText || <span className="text-muted-foreground">Output will appear here...</span>}
            </div>
          </div>
        </div>
        
        {message && (
          <Alert>
             <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-headline">Typography Controls</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="font-select">Font Family</Label>
              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger id="font-select">
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {MALAYALAM_FONTS.map(font => (
                    <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size (px)</Label>
              <Input
                id="font-size"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                min="8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="line-height">Line Height</Label>
              <Input
                id="line-height"
                type="number"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                step="0.1"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="letter-spacing">Letter Spacing (px)</Label>
              <Input
                id="letter-spacing"
                type="number"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                step="0.1"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-3 pt-6 border-t border-border">
        <Button variant="outline" onClick={handleReset}>
          <RotateCw className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button onClick={handleApply}>
          <Copy className="mr-2 h-4 w-4" /> Apply to Figma (Copy)
        </Button>
      </CardFooter>
    </Card>
  );
}
