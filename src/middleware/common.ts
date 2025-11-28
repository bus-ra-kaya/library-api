import { IncomingMessage, ServerResponse} from 'node:http';

type Middleware = (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void 
) => void;

export function requestLogger (req: IncomingMessage, res:ServerResponse, next: () => void) {
    const start = Date.now();
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} ${res.statusCode} ${Date.now() - start}ms`);
    })
    next();
}

export function cors(req: IncomingMessage, res: ServerResponse, next: () => void){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if(req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    next();
}

export function runMiddleware(middlewares: Middleware[],req: IncomingMessage,res: ServerResponse,
  finalHandler: () => void)   {
    let index = 0;
    
    function next(){
      const middleware = middlewares[index++];
      if(middleware){
        middleware(req, res, next); 
      }
      else {
        finalHandler();
      }
    }
		next();
}