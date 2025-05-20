// pokemon.js
// This file stores logic related to fetching, storing, and displaying Pokémon
// We moved search-related event listeners into search.js for separation of concerns

// Store all Pokémon up to Johto
export const MAX_POKEMON = 251;

// Exporting allPokemon so search.js can access and filter it
export let allPokemon = [];

console.log("the allpokemon is:", allPokemon);

// Grabbing the parent container where the Pokémon list will be rendered
const listWrapper = document.querySelector(".list-wrapper");

// This function dynamically displays a list of Pokémon in the DOM
export const displayAllPokemon = (pokemon) => {
  listWrapper.innerHTML = ""; // Clear the list before rendering new items

  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6]; // Extract the ID from the API URL
    const listItem = document.createElement("div");
    listItem.className = "list-item";

    // Construct the HTML for each Pokémon card
    listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-fonts">#${pokemonID}</p>
      </div>
      <div class="image-wrap">
        <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
      </div>
      <div class="name-wrap">
        <p class="body3-fonts">#${pokemon.name}</p>
      </div>
    `;

    // Set up click event to redirect to detail page and preload Pokémon data
    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });

    listWrapper.appendChild(listItem); // Add the card to the page
  });
};

// A pure function to filter Pokémon by number or name
export const getFilteredPokemon = (searchTerm, filterType) => {
  // ? checking the searchtype
  console.log("The searchTerm is:", searchTerm);
  console.log("the searchterm type is:", typeof searchTerm);

  // TODO: Implement auto-switch based on inputType
  // ?SOLUTION modify the event listener in Search.js
  if (filterType === "number") {
    return allPokemon.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (filterType === "name") {
    return allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  } else {
    return allPokemon;
  }
};

// Fetch detailed data about a Pokémon before redirecting to its detail page
const fetchPokemonDataBeforeRedirect = async (id) => {
  try {
    const [pokemon, species] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
    return true;
  } catch (error) {
    console.error("Error before redirect:", error);
  }
};

// Fetch the entire list of Pokémon (up to MAX_POKEMON)
const getAllPokemon = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`
    );
    allPokemon = response.data.results;
    console.log("all pokemon after fetch:", allPokemon);
    displayAllPokemon(allPokemon); // Display the full list on load
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Call the function when the file is loaded
getAllPokemon();
