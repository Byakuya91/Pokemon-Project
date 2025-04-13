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

// ?Function to navigate pokemon
const navigatePokemon = async (id) => {
  // ? get the current pokemon id and change it to the new one
  currentPokemonID = id;
  await loadPokemon(id);
};

// ? object to hold all the BG colors for the pokedex
const typeColors = {
  normal: "#A8A77A",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

// ? function to set the element styles

const setElementStyles = (elements, cssProperties, value) => {
  elements.forEach((element) => {
    //   attach the element styles to all the elements
    element.style[cssProperties] = value;
  });
};

//? function to convert RGBA to hex
const rgbaFromHex = (hexColor) => {
  return (
    [
      parseInt(hexColor.slice(1, 3), 16),
      parseInt(hexColor.slice(3, 5), 16),
      parseInt(hexColor.slice(5, 7), 16),
    ],
    join(",")
  );
};

// ? function to set the background color

const setTypeBackgroundColor = (pokemon) => {
  //    ? define a maintype
  const mainType = pokemon.types[0].type.name;
  //   ? define the color
  const color = typeColors[mainType];

  // ? conditional to check if there is not color
  if (!color) {
    console.warn(`Color not defined for type:${mainType} `);
    return;
  }

  // ? set the background color
  const detailMainElement = document.querySelector(".detail-main");
  setElementStyles([detailMainElement], "backgroundColor", color);

  setElementStyles([detailMainElement], "borderColor", color);

  setElementStyles(
    document.querySelectorAll(".power-wrapper > p"),
    "backgroundColor",
    color
  );
  setElementStyles(
    document.querySelectorAll(".stats-wrap p.stats"),
    "color",
    color
  );
  setElementStyles(
    document.querySelectorAll(".stats-wrap .progress-bar"),
    "color",
    color
  );

  //? define rgba color and style tag
  const rgbaColor = rgbaFromHex(color);
  const styleTag = document.createElement("style");

  style.innerHTML = `
   .stats-wrap .progress-bar::webkit-progress-bar {
       background-color: rgba(${rgbaColor},0.5);
   }
   .stats-wrap .progress-bar::webkit-progress-value {
       background-color: ${color};
   }

`;
  // ?append the styles

  document.appendChild(styleTag);
};
