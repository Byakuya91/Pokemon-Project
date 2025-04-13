// ? establish pokemon id
let currentPokemonID = null;

// ?Create an event listener to listen to the DOM
document.addEventListener("DOMContentLoaded", () => {
  // define the max pokemon
  const MAX_POKEMON = 251;
  //   define pokemonID
  const pokemonID = new URLSearchParams(window.location.search).get("id");
  const id = parseInt(pokemonID, 10);

  // check if the pokemon id doesn't exist
  if (id < 1 || id > MAX_POKEMON) {
    return (window.location.href = "./index.html");
  }

  currentPokemonID = id;
  //   ? load the pokemon(DONE)
  loadPokemon(id);
});

// Function to load pokemon

const loadPokemon = async (id) => {
  try {
    // ? Attempting a parallel request with two constants, pokemon and pokemon species.
    const [pokemon, pokemonSpecies] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    //  variable to hold abilities
    const abilitiesWrapper = document.querySelector(
      ".pokemon-detail-wrap .pokemon-detail.move"
    );

    // clear the abilities wrapper
    abilitiesWrapper.innerHTML = "";

    // conditional check
    if (currentPokemonID === id) {
      // ? function needs to be created
      displayPokemonDetails(pokemon);
      //  ? need th define this function
      const flavorText = getEnglishFlavorText(pokemonSpecies);
      document.querySelector(".body3-fonts.pokemon-description").textContent =
        flavorText;
      const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel) =>
        document.querySelector(sel)
      );
      leftArrow.removeEventListener("click", navigatePokemon);
      rightArrow.removeEventListener("click", navigatePokemon);

      if (id !== 1) {
        leftArrow.addEventListener("click", () => {
          navigatePokemon(id - 1);
        });
      }
      if (id !== 251) {
        rightArrow.addEventListener("click", () => {
          navigatePokemon(id + 1);
        });
      }
    }

    // pushes into the history the window, changes the url without reloading the page.
    window.history.pushState({}, "", `./detail.html?id=${id}`);

    return true;
  } catch (error) {
    console.error("An error has happened while fetching Pokemon data:", error);
    return false;
  }
};
