export interface User {
    id: string;
    username: string;
    password: string;
}

export interface Cocktail {
    id: string;
    name: string;
    imageUrl: string;
    ingredients: string;
}

export interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface Favorite {
  id: string;
  cocktail: Cocktail;
}