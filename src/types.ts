// https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
export type Category =
  | 'Programming'
  | 'Misc'
  | 'Dark'
  | 'Pun'
  | 'Spooky'
  | 'Christmas'

export interface Error {
  error: boolean;
  inferralError: boolean;
  code: number;
  message: string;
  causedBy: string[];
  additionalInfo: string;
  timestamp: number;
}

interface Flags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

interface Joke {
  error: boolean;
  category: Category;
  flags: Flags;
  id: number;
  safe: boolean;
  lang: Lang;
}

// https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types
export interface SingleJoke extends Joke {
  type: 'single';
  joke: string;
}

export interface TwoPartJoke extends Joke {
  type: 'twopart';
  setup: string;
  delivery: string;
}

type Lang = 'cs' | 'de' | 'en' | 'es' | 'fr' | 'pt';
