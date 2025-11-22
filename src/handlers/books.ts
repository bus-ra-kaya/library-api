import books from '../data/books.json' with {type : "json"};
import { IncomingMessage, ServerResponse } from 'node:http';

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

export function getBooksByAuthor(req: IncomingMessage, res: ServerResponse, name: string) {

  const normalizedName = name.toLowerCase().replaceAll('-', ' ');

  const booksByAuthor = books.filter((book) => {
    return book.author.toLowerCase() === normalizedName;
  })
  if (booksByAuthor.length > 0) {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(booksByAuthor));
  }
  else {
  res.statusCode = 404;
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({ error: 'Author not found'}));
  }

}