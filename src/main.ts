import './index.css'

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import { type Category, type SingleJoke, type TwoPartJoke } from './types'
import { fetchJoke } from './utils'

// https://www.typescripttutorial.net/typescript-tutorial/type-casting/
const jokeElement = document.getElementById('joke') as HTMLElement
const categoryForm = document.getElementById('categoryForm') as HTMLElement

categoryForm.addEventListener('submit', async (event) => {
  event.preventDefault() // Prevent default form submission behavior

  // Retrieve selected categories
  const selectedCategories: Category[] = []

  const joke = await fetchJoke(selectedCategories)

  displayJoke(joke)
})

// Function to display joke
function displayJoke(joke: SingleJoke | TwoPartJoke) {
  // TODO: Implement a feature to blur flagged jokes and provide a button to unblur them.
}
