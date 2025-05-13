// search.js
// This file handles all DOM input, search filtering, and UI-related event listeners

// Importing the data and display logic from pokemon.js
import {
  allPokemon,
  displayAllPokemon,
  getFilteredPokemon,
} from "./pokemon.js";

// Grab search input and related DOM elements
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-fond-message");
const closeButton = document.querySelector(".search-close-icon");
const sortIcon = document.getElementById("sort-icon");
const filterWrapper = document.querySelector(".filter-wrapper");

// Event Listners

numberFilter.addEventListener("change", () => {
  searchInput.placeholder = "Enter Pokemon Number";
});

nameFilter.addEventListener("change", () => {
  searchInput.placeholder = " Enter Pokemon Name";
});

// Set placeholder on initial load based on which filter is checked
if (numberFilter.checked) {
  searchInput.placeholder = "Enter Pokémon number";
} else {
  searchInput.placeholder = "Enter Pokémon name";
}

// Show or hide the close ("X") button based on input
const toggleCloseButton = () => {
  if (searchInput.value.trim() !== "") {
    closeButton.style.display = "block";
  } else {
    closeButton.style.display = "none";
  }
};

// Clear the search input and redisplay the full Pokémon list
const clearSearch = () => {
  searchInput.value = "";
  closeButton.style.display = "none";
  displayAllPokemon(allPokemon); // Restore full list
  notFoundMessage.style.display = "none"; // Hide "not found" message
};

// Perform search and filtering based on selected criteria
const handleSearch = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filterType = numberFilter.checked ? "number" : "name";
  const filtered = getFilteredPokemon(searchTerm, filterType);

  displayAllPokemon(filtered); // Update list with filtered results
  notFoundMessage.style.display = filtered.length === 0 ? "block" : "none";
};

// Input change listener (fires on each keystroke)
searchInput.addEventListener("input", () => {
  // ? remove any unnecessary white space
  const searchValue = searchInput.value.trim();
  console.log("user typed:", searchValue);

  // STEP ONE: auto-toggle the filter based on input type
  if (searchValue !== " ") {
    // ?Check if the value starts with a digit using regex
    if (/^\d/.test(searchValue)) {
      console.log("Input starts with a digit. Switching to number filter.");
      numberFilter.checked = true;
    } else {
      console.log("Input starts with a letter. Switching to name filter.");
      nameFilter.checked = true;
    }
  }

  toggleCloseButton();
  handleSearch();
});

// Clear button listener
closeButton.addEventListener("click", clearSearch);

// Sort icon toggles dropdown visibility
sortIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  filterWrapper.classList.toggle("visible");
});
