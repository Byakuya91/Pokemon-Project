// ? learning pattern for DOM manipulation
// ? STEP ONE: use query selectors to target specific parts of the DOM for search.

const inputElement = document.getElementById("search-input");
const search_icon = document.getElementById("search-close-icon");
const sort_wrapper = document.querySelector(".sort-wrapper");

// ?Console logs to test(PASS)

// console.log("the inputElement should be:", inputElement);
// console.log("the search_icon  should be:", search_icon);
// console.log("the sort_wrapper  should be:", sort_wrapper);

// ? STEP TWO: add event listeners to the input element for search and the close icon for search(ONGOING)
inputElement.addEventListener("input", () => {
  //   console.log("text entered!");
  handleInputChange(inputElement);
});

search_icon.addEventListener("click", () => {
  //   console.log("Search icon clicked!");
  handleSearchCloseOnClick;
});
sort_wrapper.addEventListener("click", () => {
  //   console.log("text entered!");
  handleSortIconOnClick;
});

// ?handler functions

// const handleInputChange = (inputElement) => {
//   // ? define inputValue for use
//   const inputValue = inputElement.value;

//   // ? targeting if the search Icon is visible
//   if (inputValue !== "") {
//     document
//       .querySelector(".search-close-icon")
//       .classList.add("search-close-icon-visible");
//   } else {
//     document
//       .querySelector(".search-close-icon")
//       .classList.remove("search-close-icon-visible");
//   }
// };
