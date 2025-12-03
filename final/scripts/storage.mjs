// scripts/storage.mjs

const FAVORITES_KEY = "samoa-dog-favorites";

/**
 * Safely parse JSON from localStorage.
 */
function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return safeParse(raw, []);
}

export function setFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.includes(id);
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const exists = favorites.includes(id);
  const updated = exists
    ? favorites.filter((favId) => favId !== id)
    : [...favorites, id];

  setFavorites(updated);
  return !exists; // returns new favorite state
}
