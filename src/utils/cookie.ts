export const extractCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(`${name}=`)) {
      return c.substring(`${name}=`.length);
    }
  }
  return null;
};
