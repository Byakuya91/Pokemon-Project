// ? Key name for localStorage
const FAVORITES_POKEMON_KEYS = "favoritePokemonIDs";

// CRUD operation functions for localStorage

// ? Utility: get all favorite pokemon IDs from localStorage
export const getFavoritePokemon = () => {
  // Grab the favorite pokemon from localStorage
  const favoritePokemon = localStorage.getItem(FAVORITES_POKEMON_KEYS);
  // ? Parse the favorite pokemon array from JSON string
  return favoritePokemon ? JSON.parse(favoritePokemon) : [];
};

// ? Utility: Save array of IDs to localStorage
const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_POKEMON_KEYS, JSON.stringify(favorites));
};

// ? Utility: Add Pokemon ID to favorites
export const addFavorite = (pokemonID) => {
  // Call the function to get the favorite pokemon
  const favorites = getFavoritePokemon();

  // Check if the pokemon is already a favorite
  if (!favorites.includes(pokemonID)) {
    favorites.push(pokemonID);
    saveFavorites(favorites);
  }
};

// ? Utility: Remove Pokemon ID from favorites
export const removeFavorite = (pokemonID) => {
  // Grab the favorites
  let favorites = getFavoritePokemon();

  // Remove the favorite id
  favorites = favorites.filter((id) => id !== pokemonID);

  // Save the updated favorites
  saveFavorites(favorites);
};

// ? Utility: Check if a Pokemon ID is favorited
export const isFavorite = (pokemonID) => {
  // Grab the favorite pokemon
  const favorites = getFavoritePokemon();
  // Check if the pokemon is a favorite
  return favorites.includes(pokemonID);
};

// ? Optional Utility: Clear all favorites (for testing/dev)
export const clearFavorites = () => {
  localStorage.removeItem(FAVORITES_POKEMON_KEYS);
};
