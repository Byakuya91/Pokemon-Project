// ?! Testing localStorage for favorites
// Add favorites manually
// localStorage.setItem("favorites", JSON.stringify(["1", "6", "151"]));

// // Get favorites
// const favorites = JSON.parse(localStorage.getItem("favorites"));
// console.log("Current favorites:", favorites);

// // check if a pokemon is a favorite
// const isFavorite = favorites.includes("6");
// console.log("Is Charizard (ID 6) a favorite?", isFavorite);

// // add favorite pokemon
// const idToAdd = "25"; // Pikachu
// if (!favorites.includes(idToAdd)) {
//   favorites.push(idToAdd);
//   localStorage.setItem("favorites", JSON.stringify(favorites));
// }
// console.log("Updated favorites:", favorites);

// // remove favorite pokemon
// const idToRemove = "6"; // Charizard
// const updatedFavorites = favorites.filter((id) => id !== idToRemove);
// localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
// console.log("Updated favorites:", updatedFavorites);

// This module handles logic for managing favorite Pokémon using localStorage

// This module handles logic for managing favorite Pokemon using localStorage

// ? Key names for localStorage
const FAVORITES_POKEMON_KEYS = "favoritePokemonIDs";

// CRUD operation functions for localStorage

//? Utility: get all favorite pokemon IDs from localStorage
export const getFavoritePokemon = () => {
  // Grab the favorite pokemon from localStorage
  const favoritePokemon = localStorage.getItem(FAVORITES_POKEMON_KEYS);
  //    ? Parse the favorite pokemon array from JSON string
  return favoritePokemon ? JSON.parse(favoritePokemon) : [];
};

// Utility:  Save Array of IDs from localStorage
const saveFavorite = () => {
  localStorage.setItem(FAVORITES_POKEMON_KEYS, JSON.stringify(favoritePokemon));
};

// Utility: Save array of IDs to localStorage
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_POKEMON_KEYS, JSON.stringify(favorites));
}

// Utility: Add Pokemon ID to favorites

export const addFavorite = (pokemonID) => {
  //   call the function to get the favorite pokemon
  const favorites = getFavoritePokemon();

  // check if the pokemon is already a favorite
  if (!favorites.includes(pokemonID)) {
    favorites.push(pokemonID);
    saveFavorites(favorites);
  }
};

// Utility: remove pokemon ID from favorites

export const removeFavorite = (pokemonID) => {
  // Grab the favorites
  let favorites = getFavoritePokemon();

  //    remove the favorite id

  favorites = favorites.filter((id) => id !== pokemonID);

  // Save the updated favorites
  saveFavorites(favorites);
};

// Utility: check if a Pokemon ID  is favorited

export const isFavorite = (pokemonID) => {
  //   grab the favorite pokemon
  const favorites = getFavoritePokemon();
  //   check if the pokemon is a favorite
  return favorites.includes(pokemonID);
};
