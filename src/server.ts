import http from "node:http";
import { getBooks, getBooksById, getBooksByAuthor } from "./handlers/books.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer((req,res) => {

  const byIdMatch = req.url?.match(/^\/api\/books\/(\d+)$/);
	const authorMatch = req.url?.match(/^\/api\/authors\/([^/]+)+$/);

  if(req.method !== "GET"){
    res.statusCode = 405;
    res.end(JSON.stringify({error: "GET is the only supported method for this route"}));
  }
  else if(req.url === '/api/books'){
    getBooks(req, res);
  }
  else if(byIdMatch?.[1]){
		const bookId = byIdMatch[1];
    getBooksById(req, res, bookId);
  }
	else if(authorMatch?.[1]){
		const encodedName = authorMatch[1];
		const name = decodeURIComponent(encodedName);
		getBooksByAuthor(req, res, name);

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