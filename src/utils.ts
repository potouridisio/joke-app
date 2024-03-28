import { type Category, type Error, type SingleJoke, type TwoPartJoke } from './types'

const baseURL = 'https://v2.jokeapi.dev';

export async function fetchJoke(
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
  categories: Category[] = []
): Promise<SingleJoke | TwoPartJoke | Error> {
  const response = await fetch(
    // https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    `${baseURL}/joke/${categories.length ? categories.join(',') : 'Any'}`
  );
  return await response.json();
}
