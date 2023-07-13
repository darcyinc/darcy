export default function generateNameFromEmail(email: string) {
  const [name] = email.split('@');
  const random = Math.random().toString(36).slice(2, 7);

  return `${name.slice(0, 10)}${random}`;
}
