import http from "node:http";
import { getBooks, getBooksById, getRandomBook, searchBooks } from "./handlers/books.js";
import { requestLogger, cors, runMiddleware } from "./middleware/common.js";
import sendJson from "./utils/sendJson.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer((req,res) => {
  const middlewares = [cors, requestLogger];

  runMiddleware(middlewares, req, res, () => {

    const url = new URL(req.url!, `http://${req.headers.host}`);
  const byIdMatch = req.url?.match(/^\/api\/books\/(\d+)$/);

  if(req.method !== "GET"){
    sendJson(res, 405, {error: 'GET is the only supported method for this route'});
    }
  else if(url.pathname === '/api/books'){
    const params = {
      author: url.searchParams.get('author'),
      title: url.searchParams.get('title'),
      genre: url.searchParams.get('genre'),
      fiction: url.searchParams.get('fiction'),
      year_min: url.searchParams.get('year_min'),
      year_max: url.searchParams.get('year_max'),
      sort_by: url.searchParams.get('sort_by'),
      order: url.searchParams.get('order')
    };

    const hasParams = Object.values(params).some(val => val!== null);

    if(hasParams){
      searchBooks(req, res, params);
    }
    else {
      getBooks(req, res);
    }
  }
  else if(req.url === '/api/books/random'){
    getRandomBook(req, res);
  }
  else if(byIdMatch?.[1]){
		const bookId = byIdMatch[1];
    getBooksById(req, res, bookId);
  }
  else {
    sendJson(res, 404, {error: 'Endpoint not found'});
  }

  })
  
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});