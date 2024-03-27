import './index.css'

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import { type Category, type SingleJoke, type TwoPartJoke } from './types'
import { fetchJoke } from './utils'

// https://www.typescripttutorial.net/typescript-tutorial/type-casting/
const jokeElement = document.getElementById('joke') as HTMLElement;
const categoryForm = document.getElementById('categoryForm') as HTMLElement;
const progCategory = document.getElementsByName('category')[0] as HTMLInputElement;
const miscCategory = document.getElementsByName('category')[1] as HTMLInputElement;
const darkCategory = document.getElementsByName('category')[2] as HTMLInputElement;
const punCategory = document.getElementsByName('category')[3] as HTMLInputElement;
const spookyCategory = document.getElementsByName('category')[4] as HTMLInputElement;
const christCategory = document.getElementsByName('category')[5] as HTMLInputElement;

const categories = [progCategory, miscCategory, darkCategory, punCategory, spookyCategory, christCategory];
categoryForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Retrieve selected categories
  const selectedCategories: Category[] = [];

  categories.forEach((category) => {
    if (category.checked) {

      if (category.value === 'Programming' || category.value === 'Misc' || category.value === 'Dark' || category.value === 'Pun' || category.value === 'Spooky' || category.value === 'Christmas') {
        selectedCategories.push(category.value);   
      }
    }
  });

  const joke = await fetchJoke(selectedCategories);

  displayJoke(joke);
})

// Function to display joke
function displayJoke(joke: SingleJoke | TwoPartJoke) {
  // TODO: Implement a feature to blur flagged jokes and provide a button to unblur them.
  jokeElement.innerHTML = '';
  switch (joke.type) {
    case 'single':
      jokeElement.textContent = joke.joke;
      break;
    case 'twopart':
      const setupParagraph = document.createElement('p');
      setupParagraph.textContent = joke.setup;
      const deliveryParagraph = document.createElement('p');
      deliveryParagraph.textContent = joke.delivery;
      jokeElement.appendChild(setupParagraph);
      jokeElement.append(deliveryParagraph);
  }
 if (joke.flags) {
  jokeElement.style.filter = "blur(10px)";
  const blurButton = document.createElement('button');
  blurButton.classList.add('button');
  blurButton.classList.add('blurButton');
  blurButton.textContent = 'Show joke';
  jokeElement.insertAdjacentElement('afterend', blurButton);
  blurButton.addEventListener('click', () => {
    jokeElement.style.filter = "";
  });
 }

}