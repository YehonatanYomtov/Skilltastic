export function usernameFromEmailExtractor(email: string): string {
  const indexUntil = email.indexOf("@");
  const username = email.slice(0, indexUntil);
  return username;
}
