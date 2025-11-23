# Library API (WIP)

A Typescript + Node API that serves book data(titles, authors, genres, years)

## Books Endpoints

### Base Operations

- GET /api/books                                  — Get all books  
- GET /api/books/:id                              — Get a specific book by ID  
- GET /api/books/random                           - Get a random book (not yet implemented!)

### Filters
| Parameter | Type | Description | Status |
|-----------|------|-------------|--------|
| `title` | string | Partial match on book title | ✓ Implemented |
| `author` | string | Partial match on author name | ✓ Implemented |
| `genre` | string | Filter by genre | Not yet implemented |
| `fiction` | boolean | Filter by fiction/non-fiction | Not yet implemented |
| `year_min` | integer | Minimum publication year | Not yet implemented |
| `year_max` | integer | Maximum publication year | Not yet implemented |

### Sorting
| Parameter | Type | Description | Status |
|-----------|------|-------------|--------|
| `sort_by` | string | Field to sort by (`title`, `author`, `year`, `pages`) | Not yet implemented |
| `order` | string | Sort order: `asc` or `desc` (default: `asc`) | Not yet implemented |

### Examples
```
GET /api/books?author=Murakami&sort_by=year&order=desc
GET /api/books?fiction=true&year_min=2000&year_max=2020
```
