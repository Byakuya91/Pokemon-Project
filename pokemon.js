// TODO: code out the functionality of the pokemon API

// Defining the maximum number of pokemon. Johto is included.
const MAX_POKEMON = 251;
// ?  listWrapper document.querySelector is going to grab the element inside the DOM
// ? Context: DOM is Document Object Model. It's a tree that represents the structure of the HTML document.
// ? Each HTML tags represent a node within the tree and JavaScript has the ability to manipulate and grab those nodes.
// ? Hence document.querySelector is going to grab the element inside the DOM.
const listWrapper = document.querySelector(".list-wrapper");
// ? Note the # indicates id in CSS.
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-fond-message");

// ? Variable declarations for pokedex

// array to store all pokemon

// We can do API requests based on URL and what's within the URL.

let allPokemon = [];
// ? A way to understand get calls. I will use Axios instead
// fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
//   .then((response) => response.json())
//   .then((data) => {
//     allPokemon = data.results;
//     // ? API structure the .results allows you to dig deeper into the data
//     console.log("the total pokemon in data is:", data.results);
//     console.log("the pokemon in data is:", data.results[0]);
//     console.log("the name of the  pokemon in data is:", data.results[0].name);
//     console.log(
//       "the name url of the  pokemon in data is:",
//       data.results[0].url
//     );
//     // console.log("the pokemon in data is:", data);
//   });

//   ? Axios function
// ! Refactor this code to use async/await(DONE)
const getAllPokemon = async () => {
  try {
    // ?   define a response and data
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`
    );
    const data = response.data;

    //? log the data for debugging
    console.log("The pokemon data:", data);
    console.log("The pokemon in data is:", data.results[0]);
    console.log("The name of the pokemon in data is:", data.results[0].name);
    console.log("The URL of the pokemon in data is:", data.results[0].url);

    //  ? Store all the pokemon
    allPokemon = data.results;
    console.log("the total pokemon in the data is:", data.results.length);
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
  }
};

getAllPokemon();

// ? Seeing if the pokemon are inside AllPokemon outside the function
// ! tutorial code: want to try it using axios
// async function fetchPokemonDataBeforeRedirect(id) {
//   try {
//     const response = await promise.all(
//       `https://pokeapi.co/api/v2/pokemon?limit=${id}`
//     );
//     const data = response.data;
//     allPokemon = data.results;
//   } catch (error) {
//     console.error("Error fetching Pokemon:", error);
//   }
// }

const fetchPokemonDataBeforeRedirect = async (id) => {
  try {
    // ? Attempting a parallel request with two constants, pokemon and pokemon species.
    const [pokemon, pokemonSpecies] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    // Handle your data, which will be in pokemon.data and pokemonSpecies.data
    console.log("Pokemon Data:", pokemon.data);
    console.log("Pokemon Species Data:", pokemonSpecies.data);

    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect:", error);
  }
};

// ? A function that displays the pokemon

const displayPokemon = (pokemon) => {
  // ? call the listWrapper we already made in the HTML
};
