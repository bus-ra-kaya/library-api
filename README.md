# Library API

A Typescript + Node API that serves book data(titles, authors, genres, years)

### Installation

1. Clone the repository
```
git clone https://github.com/bus-ra-kaya/library-api
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file (optional)
```
PORT=8000
```

4. Run the server
```
npm run dev     # Development mode
npm start       # Production mod
```

## Books Endpoints

### Base Operations

- GET /api/books                                  — Get all books  
- GET /api/books/:id                              — Get a specific book by ID  
- GET /api/books/random                           - Get a random book

### Filters
| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | Partial match on book title |
| `author` | string | Partial match on author name |
| `genre` | string | Filter by genre |
| `fiction` | boolean | Filter by fiction/non-fiction |
| `year_min` | integer | Minimum publication year |
| `year_max` | integer | Maximum publication year |

### Sorting
| Parameter | Type | Description | 
|-----------|------|-------------|
| `sort_by` | string | Field to sort by (`title`, `author`, `year`, `pages`) |
| `order` | string | Sort order: `asc` or `desc` (default: `asc`) |

### Examples
```
GET /api/books?author=Murakami&sort_by=year&order=desc
GET /api/books?fiction=true&year_min=2000&year_max=2020
```

# License 

MIT