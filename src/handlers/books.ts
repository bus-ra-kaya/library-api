import books from '../data/books.json' with {type : "json"};
import sendJson from '../utils/sendJson.js';
import { IncomingMessage, ServerResponse } from 'node:http';

type searchParams = {
  author?: string | null,
  title?: string | null,
  genre?: string| null,
  fiction?: string | null,
  year_min?: string | null,
  year_max?: string | null,
  sort_by?: string | null,
  order?: string | null,
}

type book = {
  id: number,
  title: string,
  author: string,
  year: number,
  fiction: boolean,
  genre: string[],
  pages: number,
  isbn: string
}

type validKeys = "title" | "author" | "pages" | "year";

export function getBooks(req: IncomingMessage, res: ServerResponse){
  sendJson(res, 200, books);
}

export function getBooksById(req: IncomingMessage, res: ServerResponse, bookId: string){
  const id = +bookId;
  const book = books.find(b => b.id === id);

  if (book) {
    sendJson(res, 200, book);
  } else {
    sendJson(res, 404, {error: 'Book is not found'});
  }
}

export function searchBooks(req: IncomingMessage, res: ServerResponse, params: searchParams) {

  const a = params.author 
  ? decodeURIComponent(params.author).toLowerCase().replaceAll('-', ' ')
  : null;

  const t = params.title
  ? decodeURIComponent(params.title).toLowerCase().replaceAll('-', ' ')
  : null;

  const g = params.genre
  ? decodeURIComponent(params.genre).toLowerCase().replaceAll('-', ' ')
  : null;

  const f = params.fiction === 'true' ? true: params.fiction === 'false' ? false : null;
  const yearMin = params.year_min ? +params.year_min : null;
  const yearMax = params.year_max ? +params.year_max : null;

  let results = books.filter((book) => {
    if (a && !book.author.toLowerCase().includes(a)) return false;
    if (t && !book.title.toLowerCase().includes(t)) return false;
    if (g && !book.genre.some(bookGenre => bookGenre.toLowerCase().includes(g))) return false;
    if (f !== null && book.fiction !== f) return false;
    if (yearMin && book.year < yearMin) return false;
    if (yearMax && book.year > yearMax) return false;
    return true;
  });

  const matchFound = results.length > 0;

  if (matchFound){
     if(params.sort_by) {

      const sortBy = params.sort_by;
      const order = params.order === 'desc' ? 'desc' : 'asc';

      const validKeys = ["title", "author", "pages", "year" ];

      if (validKeys.includes(sortBy as validKeys)){
      results = sortBooks(results, sortBy as validKeys, order);
      }
  }

    sendJson(res, 200, results);
  }
  else {
    sendJson(res, 404, {error: 'Match not found'});
  }
}

export function getRandomBook(req: IncomingMessage, res:ServerResponse){
  const bookCount = books.length;
  const index = Math.floor(Math.random() * bookCount);
  const chosenBook = books[index];
  sendJson(res, 200, chosenBook);
}

function sortBooks(results: book[], sortBy: validKeys, order: string = "asc"){
  const sorted = [...results];

  sorted.sort((a, b) => {
    const x = a[sortBy];
    const y = b[sortBy];

    if (typeof x === 'string' && typeof y === 'string'){
      const result = x.localeCompare(y);
      return order === 'asc' ? result : -result;
    }
    if (typeof x === 'number' && typeof y === 'number'){
      const result = x - y;
      return order === 'asc' ? result : -result;
    }
    return 0;
  })

  return sorted;
}