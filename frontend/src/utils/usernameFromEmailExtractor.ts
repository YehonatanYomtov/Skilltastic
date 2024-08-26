export function usernameFromEmailExtractor(email: string): string {
  console.log("email: ", email);
  const indexUntil = email.indexOf("@");
  const username = email.slice(0, indexUntil);
  return username;
}
