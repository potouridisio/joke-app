import "./index.css";

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import { type Category, type SingleJoke, type TwoPartJoke } from "./types";
import { fetchJoke } from "./utils";

// https://www.typescripttutorial.net/typescript-tutorial/type-casting/
const jokeElement = document.getElementById("joke") as HTMLElement;
const categoryForm = document.getElementById("categoryForm") as HTMLElement;
const inputElements = categoryForm.querySelectorAll<HTMLInputElement>(
  "input[type=checkbox]"
);

categoryForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Retrieve selected categories
  const selectedCategories: Category[] = [];

  inputElements.forEach((inputElement) => {
    if (inputElement.checked) {
      selectedCategories.push(inputElement.value as Category);
    }
  });

  const joke = await fetchJoke(selectedCategories);

  if ('message' in joke) {
    jokeElement.textContent = joke.additionalInfo;
  } else {
    displayJoke(joke);
  }
});

// Function to display joke
function displayJoke(joke: SingleJoke | TwoPartJoke) {
  jokeElement.innerHTML = "";
  if (joke.type === "single") {
    jokeElement.textContent = joke.joke;
  } else {
    jokeElement.innerHTML = `<p>${joke.setup}</p><p>${joke.delivery}</p>`;
  }

  // Implement a feature to blur flagged jokes and provide a button to unblur them.
  if (Object.values(joke.flags).some((value) => value)) {
    jokeElement.style.filter = "blur(15px)";
    const unblurButton = document.createElement("button");
    unblurButton.textContent = "Unblur Joke";
    unblurButton.classList.add("button");
    unblurButton.classList.add("blurButton");
    unblurButton.addEventListener("click", () => {
      jokeElement.style.filter = "";
      unblurButton.remove();
    });
    jokeElement.insertAdjacentElement("afterend", unblurButton);
  }
}
