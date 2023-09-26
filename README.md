# News API Documentation
This documentation provides information on how to use the News API to fetch articles, top head lines, search by keywords.

## Run code

```
cd news-api
npm i
npm start
```

## Base URL
The base URL for the News API is:
```
http://localhost:3000
```
## Fetching Articles
### Endpoint: /articles/< number >

### Method: GET

Description: Fetch a specified number of top news articles.

Parameters:

count (integer): The number of articles to fetch. Must be a positive integer.

Example Request:

```
http

GET http://localhost:3000/articles/5
```
Example Response:

```
json

[
  {
    "title": "Sample Article 1",
    "description": "This is a sample article.",
    "url": "https://example.com/article1"
  },
  {
    "title": "Sample Article 2",
    "description": "This is another sample article.",
    "url": "https://example.com/article2"
  },
  // ... (more articles)
]
```

## Searching for Articles
### Endpoint: /search

### Method: GET

Description: Search for articles by keywords.

Parameters:

count (integer): The number of articles to fetch. Must be a positive integer.

query (string): The search query.

Example Request:

#### Search articles by keyword:
```
http
GET http://localhost:3000/search?count=10&query=john%20doe
```

#### Example Response:

```
json
[
  {
    "title": "Sample Article 1",
    "description": "This is a sample article.",
    "url": "https://example.com/article1"
  },
  {
    "title": "Sample Article 2",
    "description": "This is another sample article.",
    "url": "https://example.com/article2"
  },
  // ... (more articles)
]
```

## Searching for Articles by title
### Endpoint: /search_title

### Method: GET

Description: Search for articles by title.

Parameters:

count (integer): The number of articles to fetch. Must be a positive integer.

query (string): The search query for the title.

Example Request:

#### Search articles by title:
```
http
GET http://localhost:3000/search_title?count=10&query=john%20doe
```

#### Example Response:

```
json
[
  {
    "title": "John Doe",
    "description": "This is a sample article.",
    "url": "https://example.com/article1"
  },
  {
    "title": "Sample Article John doe",
    "description": "This is another sample article.",
    "url": "https://example.com/article2"
  },
  // ... (more articles)
]
```

## Fetching for Top-Headlines
### Endpoint: /top_headlines

### Method: GET

Description: Search for top headlines based of category.

Parameters:

count (integer): The number of articles to fetch. Must be a positive integer.

category (string): This parameter allows you to change the category for the request. 

ps: The available categories are: general, world, nation, business, technology, entertainment, sports, science and health.

Example Request:

#### Search top headlines based on category:
```
http
GET http://localhost:3000/top_headlines?count=10&category=general
```

#### Example Response:

```
json
[
  {
    "title": "Sample Article 1",
    "description": "This is a sample article.",
    "url": "https://example.com/article1"
  },
  {
    "title": "Sample Article 2",
    "description": "This is another sample article.",
    "url": "https://example.com/article2"
  },
  // ... (more articles)
]
```

## Fetching List of valid categories
### Endpoint: /top_headlines_categories

### Method: GET

Description: Fetch a list of valid categories for top headlines.


Example Request:

```
http

GET http://localhost:3000/top_headlines_categories
```
Example Response:

```
json

["general", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"]
```

### Error Responses
HTTP Status 500: Internal Server Error - If there is an issue with the API server or the external GNews API.

HTTP Status 404: Not Found - If there is an issue with the API end point.

HTTP Status 400: Bad request - If there is an issue with the query params.

### Caching
To improve performance, the API caches responses for a limited time period. This means that if you request the same data within the cache duration, you may receive cached data for faster response times.
this will also prevent us exceed rate limmit that might be implented on 3rd party api side.

### Authentication
No authentication is required to use this API. However, ensure that you have a valid GNews API key configured in the app.js file.


### Dockerization 
To Build the Docker Image.

```docker build -t news-api .
```
### Test Cases
To run the tests, execute mocha from the command line:

```
npm test
```

### Code Coverage

```npx jest --coverage
```
-----------------|---------|----------|---------|---------|----------------------------------------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|----------------------------------------------------
All files        |   74.33 |    78.12 |     100 |   74.33 |
 news-api        |     100 |      100 |     100 |     100 |
  app.js         |     100 |      100 |     100 |     100 |
  logger.js      |     100 |      100 |     100 |     100 |
 news-api/routes |    70.1 |    78.12 |     100 |    70.1 |
  news.js        |    70.1 |    78.12 |     100 |    70.1 | 14,22-24,36-37,52-70,89-91,103-104,127-129,141-142

The test cases will help you verify that your API endpoints are working as expected and provide a baseline for testing as you continue to develop your API.

## Future enhancements

config and secret keys should be moved to some secret management tool