import books from '../data/books.json' with {type : "json"};
import { IncomingMessage, ServerResponse } from 'node:http';

type searchParams = {
  author?: string | null,
  title?: string | null
}

export function getBooks(req: IncomingMessage, res: ServerResponse){
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify(books));
}

export function getBooksById(req: IncomingMessage, res: ServerResponse, bookId: string){
  const id = +bookId;
  const book = books.find(b => b.id === id);

  if (book) {
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify(book));
  } else {
  res.statusCode = 404;
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({ error: 'Book not found'}));
  }
}

export function searchBooks(req: IncomingMessage, res: ServerResponse, { author, title}: searchParams) {

  const a = author?.toLowerCase().replaceAll('-', ' ');
  const t = title?.toLowerCase().replaceAll('-',' ');

  const results = books.filter((book) => {
    if (a && !book.author.toLowerCase().includes(a)) return false;
    if (t && !book.title.toLowerCase().includes(t)) return false;
    return true;
  });

  const matchFound = results.length > 0;
  
  res.setHeader("Content-Type", "application/json");

  if (matchFound){
    res.statusCode = 200;
    res.end(JSON.stringify(results));
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({error: "Match not found"}));
  }
  
}