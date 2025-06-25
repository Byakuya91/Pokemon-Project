// ?Imports
import { addFavorite, removeFavorite } from "./favoritePokemon.js";

// ? Favorites list  grabbing pokemon parameters
const params = new URLSearchParams(window.location.search);
const pokemonID = params.get("id");

// ? favoritesList steps

// STEP ONE: grab button ids from buttons

const addButton = document.getElementById("addFavoriteBtn");
const removeButton = document.getElementById("removeFavoriteBtn");

// STEP TWO: event listeners to wire the buttons

addButton.addEventListener("click", () => {
  addFavorite(pokemonID);
  console.log(`Added Pokémon ${pokemonID} to favorites.`);
});

removeButton.addEventListener("click", () => {
  removeFavorite(pokemonID);
  console.log(`Removed Pokémon ${pokemonID} from favorites.`);
});

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

async function loadPokemon(id) {
  try {
    // Use Axios to make parallel requests for both pokemon and pokemon species
    const [pokemonRes, pokemonSpeciesRes] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const pokemon = pokemonRes.data;
    const pokemonSpecies = pokemonSpeciesRes.data;

    const abilitiesWrapper = document.querySelector(
      ".pokemon-detail-wrap .pokemon-detail.move"
    );
    abilitiesWrapper.innerHTML = "";

    if (currentPokemonID === id) {
      displayPokemonDetails(pokemon);
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

      // Updates the browser history state
      window.history.pushState({}, "", `./detail.html?id=${id}`);
    }

    return true;
  } catch (error) {
    console.error("An error occurred while fetching Pokemon data:", error);
    return false;
  }
}
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
  return [
    parseInt(hexColor.slice(1, 3), 16),
    parseInt(hexColor.slice(3, 5), 16),
    parseInt(hexColor.slice(5, 7), 16),
  ].join(",");
};

// ? function to set the background color
const setTypeBackgroundColor = (pokemon) => {
  //   ! checking if the type exists
  if (!pokemon.types || pokemon.types.length === 0) {
    console.warn("No types found on the pokemon object:", pokemon);
    return;
  }

  //    ? define a maintype
  const mainType = pokemon.types[0].type.name;

  //   ? define the color
  const color = typeColors[mainType];
  console.log("the mainType color is:", color);

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

  styleTag.innerHTML = `
     .stats-wrap .progress-bar::webkit-progress-bar {
         background-color: rgba(${rgbaColor}, 0.5);
     }
     .stats-wrap .progress-bar::webkit-progress-value {
         background-color: ${color};
     }
    `;

  // ?append the styles
  document.head.appendChild(styleTag);
};

// ?captialize first letter string in pokemon details
const capitalizeFirstLetter = (string) => {
  console.log("the string is:", string);
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// ? display Pokemon

// ? helper function to create and append elements to the page
function createAndAppendElements(parent, tag, options = {}) {
  // ? create a new HTML element using the tag name (like "p", "div", etc)
  const element = document.createElement(tag);

  // ? loop through the options and set them as properties on the element
  Object.keys(options).forEach((key) => {
    element[key] = options[key];
  });

  // ? attach the element to the parent container in the DOM
  parent.appendChild(element);

  // ? return the created element in case we need to do more with it later
  return element;
}

// ? display the selected pokemon's details in the UI
const displayPokemonDetails = (pokemon) => {
  // ?! guard clause
  if (!pokemon) {
    console.error("Pokemon data is missing!", pokemon);
    return;
  }

  // ? pull out some key details from the pokemon object
  const { name, id, types, weight, height, abilities, stats } = pokemon;

  // ? make sure the name is properly capitalized
  //   console.log("the name currently is:", pokemon.name);
  console.log("pokemon object:", name);

  const capitalizedPokemonName = capitalizeFirstLetter(name);

  // ? set the document’s tab title to show the Pokémon’s name
  document.querySelector("title").textContent = capitalizedPokemonName;

  // ? get the main container element where the Pokémon info will go
  const detailMainElement = document.querySelector(".detail-main");

  // ? add a CSS class to the main container based on the Pokémon's name
  detailMainElement.classList.add(name.toLowerCase());

  // ? set the name in the visible UI
  document.querySelector(".name-wrap .name").textContent =
    capitalizedPokemonName;

  // ? format the ID to always be 3 digits (e.g. 007, 123) and display it
  document.querySelector(
    ".pokemon-id-wrap .body2-fonts"
  ).textContent = `#${String(id).padStart(3, "0")}`;

  // ? create a variable for image element
  const imageElement = document.querySelector(".detail-img-wrapper img");

  imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  imageElement.alt = name;

  //   ? create a variable for the type wrapper
  const typeWrapper = document.querySelector(".power-wrapper");

  // ? clear the power wrapper
  typeWrapper.innerHTML = "";

  // ? loop through the types and add them to the power wrapper
  types.forEach(({ type }) => {
    createAndAppendElements(typeWrapper, "p", {
      // ? set the class and text content
      className: `body3-fonts type ${type.name}`,
      textContent: type.name,
    });
  });

  //   ? Modify the document. targeting the pokemon detailed wrap
  document.querySelector(
    ".pokemon-detail-wrap  .pokemon-detail p.body3-fonts.weight"
  ).textContent = `${weight / 10}kg`;
  document.querySelector(
    ".pokemon-detail-wrap  .pokemon-detail p.body3-fonts.height"
  ).textContent = `${height / 10}kg`;

  //   ? modify abilities wrapper
  const abilitiesWrapper = document.querySelector(
    ".pokemon-detail-wrap .pokemon-detail.move"
  );

  // ? loop through the abilities and add them to detail wrap and move
  abilities.forEach(({ ability }) => {
    //   ? create and append elements to the abilities wrapper
    createAndAppendElements(abilitiesWrapper, "p", {
      // ? set the class and text content
      className: `body3-fonts move ${ability.name}`,
      textContent: ability.name,
    });
  });

  //   ? modify stats wrapper
  const statsWrapper = document.querySelector(".stats-wrapper");
  statsWrapper.innerHTML = "";

  // ? loop through the stats and add them to the stats wrapper
  const statNameMapping = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD",
  };

  // ? loop through the stats and add them to the stats wrapper
  stats.forEach(({ base_stat, stat }) => {
    //  Log the stat name to debug
    console.log("the stat names are:", stat.name);
    //   ? create the stat and class
    const statDiv = document.createElement("div");
    statDiv.className = "stats-wrap";

    //   ? create and append elements to the stats wrapper
    statsWrapper.appendChild(statDiv);

    createAndAppendElements(statsWrapper, "p", {
      className: "body3-fonts stats",
      textContent: statNameMapping[stat.name],
    });

    //  ? adding the stats name and progress bar
    createAndAppendElements(statsWrapper, "p", {
      className: "body3-fonts",
      textContent: String(base_stat).padStart(3, "0"),
    });
    createAndAppendElements(statsWrapper, "progress", {
      className: "progress-bar",
      value: base_stat,
      max: 100,
    });
  });

  // ? call setTypeBackGroundColor  function
  console.log("Calling setTypeBackgroundColor with:", pokemon);
  setTypeBackgroundColor(pokemon);
};

// ? create getEnglishFlavorTex
const getEnglishFlavorText = (pokemonSpecies) => {
  // ? loop through the entiries
  for (let entry of pokemonSpecies.flavor_text_entries) {
    //    ? check if the entry is english
    if (entry.language.name === "en") {
      // ? return the text
      let flavor = entry.flavor_text.replace(/\f/g, " ");
      return flavor;
    }
  }

  return "";
};
