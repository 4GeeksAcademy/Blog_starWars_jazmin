export function getImageUrl(type, uid) {
  // En starwars-visualguide: people => characters
  const folder = type === "people" ? "characters" : type;
  return `https://starwars-visualguide.com/assets/img/${folder}/${uid}.jpg`;
}

export const FALLBACK_IMG =
  "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
