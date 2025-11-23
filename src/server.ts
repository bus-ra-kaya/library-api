import http from "node:http";
import { getBooks, getBooksById, searchBooks } from "./handlers/books.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer((req,res) => {

  const url = new URL(req.url!, `http://${req.headers.host}`);
  const byIdMatch = req.url?.match(/^\/api\/books\/(\d+)$/);
  console.log('req.url:', req.url);
  console.log('url.pathname:', url.pathname);
  console.log('author param:', url.searchParams.get('author'));

  if(req.method !== "GET"){
    res.statusCode = 405;
    return res.end(JSON.stringify({error: "GET is the only supported method for this route"}));
  }
  else if(url.pathname === '/api/books'){
    const author = url.searchParams.get('author');
    const title = url.searchParams.get('title');
    if(author || title){
      searchBooks(req, res, { author, title });
    }
    else {
      getBooks(req, res);
    }
  }
  else if(byIdMatch?.[1]){
		const bookId = byIdMatch[1];
    getBooksById(req, res, bookId);
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({error: "Endpoint not found"}));
  }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});