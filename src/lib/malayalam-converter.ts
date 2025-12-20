// This is a simplified mapping for a generic legacy Malayalam font (like ML-TTKarthika).
// A production-ready version would need a more exhaustive map for each specific legacy font.

const legacyMap: { [key: string]: string } = {
  // Vowels
  'A': 'അ', 'B': 'ആ', 'C': 'ഇ', 'D': 'ഈ', 'E': 'ഉ', 'F': 'ഊ', 'G': 'ഋ',
  'H': 'എ', 'I': 'ഏ', 'J': 'ഐ', 'K': 'ഒ', 'L': 'ഓ', 'M': 'ഔ',
  // Consonants
  'k': 'ക', 'J': 'ഖ', 'g': 'ഗ', 'L': 'ഘ', '§': 'ങ',
  'N': 'ച', 'O': 'ഛ', 'P': 'ജ', 'Q': 'ഝ', 'R': 'ഞ',
  'S': 'ട', 'T': 'ഠ', 'U': 'ഡ', 'V': 'ഢ', 'W': 'ണ',
  'X': 'ത', 'Y': 'ഥ', 'Z': 'ദ', 'å': 'ധ', 'Ä': 'ന',
  ']': 'പ', '^': 'ഫ', '_': 'ബ', '`': 'ഭ', 'a': 'മ',
  'b': 'യ', 'c': 'ര', 'd': 'ല', 'e': 'വ', 'f': 'ശ', 'v': 'ഷ',
  's': 'സ', 'h': 'ഹ', 'Ê': 'ള', 'g': 'ഴ', 'É': 'റ', 'x': 'റ്റ',
  // Chillu
  '³': 'ൺ', '²': 'ൻ', 'þ': 'ർ', 'Ü': 'ൽ', 'Þ': 'ൾ',
  // Special characters
  'w': 'ം', 't': 'ഃ',
  // Vowel signs (matra)
  'm': 'ാ', 'n': 'ി', 'o': 'ീ', 'p': 'ു', 'q': 'ൂ', 'r': 'ൃ',
  's': 'െ', 't': 'േ', 'u': 'ൈ', 'x': 'ൊ', 'y': 'ോ', 'z': 'ൌ',
  // Chandrakkala (virama)
  'd': '്',
};

// Mappings for consonant conjuncts, handled with virama (chandrakkala 'd')
const conjunctMap: { [key: string]: string } = {
  'k d k': 'ക്ക', 'k d c': 'ക്ര', 'k d e': 'ക്വ', 'k d g': 'ക്ഴ',
  '§ d k': 'ങ്ക', '§ d g': 'င်္ဂ',
  'N d N': 'ച്ച', 'N d c': 'ച്ര',
  'P d P': 'ജ്ജ', 'P d b': 'ജ്യ', 'P d e': 'ജ്വ',
  'R d N': 'ഞ്ച', 'R d P': 'ഞ്ജ',
  'W d U': 'ണ്ഡ',
  'Ä d X': 'ന്ത', 'Ä d c': 'ന്ത്ര', 'Ä d d': 'ന്ദ', 'Ä d e': 'ന്വ',
  'X d b': 'ത്യ', 'X d c': 'ത്ര', 'X d e': 'ത്വ',
  'd d d': 'ദ്ദ', 'd d e': 'ദ്വ',
  'a d _': 'മ്പ', 'a d a': 'മ്മ',
  'b d b': 'യ്യ',
  'd d d': 'ല്ല',
  'e d e': 'വ്വ',
  'i d N': 'ശ്ച',
  'j d U': 'ഷ്ഡ', 'j d W': 'ഷ്ണ', 'j d ]': 'ഷ്ട',
  'k d j': 'ക്ഷ',
  's d X': 'സ്ത', 's d c': 'സ്ര', 's d e': 'സ്വ',
  'h d a': 'ഹ്മ', 'h d b': 'ഹ്യ', 'h d d': 'ഹ്ല', 'h d e': 'ഹ്വ',
  'k d s': 'ക്സ',
};

export function convertLegacyToUnicode(text: string): { converted: string, wasChanged: boolean } {
  let originalText = text;
  let convertedText = text;

  // Replace multi-character conjuncts first to avoid partial replacements
  // This needs to be done iteratively for complex cases
  Object.entries(conjunctMap).forEach(([key, value]) => {
    // Regex to find the key, escaping special characters if any
    const regex = new RegExp(key.split('').map(char => `\\${char}`).join(''), 'g');
    convertedText = convertedText.replace(regex, value);
  });
  
  // Replace single characters from the legacy map
  let result = '';
  for (let i = 0; i < convertedText.length; i++) {
    const char = convertedText[i];
    result += legacyMap[char] || char;
  }
  
  // A simple rule to fix 'reph' (റ + ്) which is often typed before the consonant.
  // Example: ്ര (c) + ക (k) -> ര്ക്ക -> ക്ക -> kdk should be ർക്ക
  // This is a common issue in legacy fonts. A simple rule could be:
  // if a 'c' (ര) is followed by 'd' (്) and a consonant, move 'ര്' after the consonant.
  // This is complex and requires more advanced parsing.
  // For now, we'll handle a very common case: `cd` -> `ർ` (chillu) when it's part of a word.
  // E.g., k c d k -> ക ര ് ക -> കര്ക
  // The logic in legacyMap and conjunctMap above is a more direct glyph-to-glyph or sequence-to-glyph mapping.
  // Advanced logic would require a state machine.

  // The chillu 'ർ' can sometimes be formed by c + d ('ര' + '്').
  // Replace 'ര്' with 'ർ' when it's not followed by a vowel sign.
  result = result.replace(/ര്(?![ാ-്])/g, 'ർ');

  const wasChanged = originalText !== result;

  return { converted: result, wasChanged };
}
