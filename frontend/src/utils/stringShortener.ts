export function stringShortener(text: string, from: string): string {
  const partOfTextToStartSlicing = text.indexOf(from);
  const newSlicedText = text.slice(partOfTextToStartSlicing);
  return newSlicedText;
}
