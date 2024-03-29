import './index.css'

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import { type Category, type SingleJoke, type TwoPartJoke } from './types'
import { fetchJoke } from './utils'

// https://www.typescripttutorial.net/typescript-tutorial/type-casting/
const jokeElement = document.getElementById('joke') as HTMLElement
const categoryForm = document.getElementById('categoryForm') as HTMLElement
const button = document.createElement('button') as HTMLInputElement
button.textContent = "READ MORE"
button.disabled = false

const answer = document.createElement('h1') as HTMLElement
const unblurbtn = document.createElement('button') as HTMLInputElement
unblurbtn.textContent = "UNBLUR"





categoryForm.addEventListener('submit', async (event) => {
  event.preventDefault() // Prevent default form submission behavior
  jokeElement.textContent = " "

  answer.textContent = " "


  // Retrieve selected categories
  const selectedCategories: Category[] = []
  let boxes = document.getElementsByTagName('input') as HTMLCollection
  console.log(boxes)
  for (let i = 0; i < boxes.length; i++) {
    if ((boxes[i] as HTMLInputElement).checked) {
      let x = (boxes[i] as HTMLInputElement).value
      selectedCategories.push(x as Category)
    }

  }
  console.log(selectedCategories)

  const joke = await fetchJoke(selectedCategories)

  displayJoke(joke)
})

// Function to display joke
function displayJoke(joke: SingleJoke | TwoPartJoke) {
  // TODO: Implement a feature to blur flagged jokes and provide a button to unblur them.
  console.log(Object.values(joke.flags))
  let flags = Object.values(joke.flags) as boolean[]

  if (flags.includes(true)) {
    console.log('joke flagged')
    unblurbtn.style.display = 'block'
    document.body.appendChild(unblurbtn)




    jokeElement.style.filter = 'blur(5px)'
    unblurbtn.addEventListener('click', () => {
      jokeElement.style.filter = 'none'
      unblurbtn.remove()
    })


  }






  if (joke.type === 'single') {
    button.style.display = 'none'
    jokeElement.textContent = joke.joke

  }
  else {
    button.disabled = false
    jokeElement.textContent = joke.setup
    button.style.display = 'block'


    document.body.appendChild(button)
    button.addEventListener('click', () => {

      answer.textContent = joke.delivery
      document.body.appendChild(answer)
      button.remove()

    })

  }
}
