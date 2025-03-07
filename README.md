# Request Header Parser Microservice

This is a simple Express-based API that provides information about the client's IP address, preferred language, and user-agent. It's a lightweight server designed to handle GET requests and return JSON-formatted client data.

## Features

- Returns the client's **IP address**, **preferred language**, and **user-agent**.
- Accepts only `GET` requests. Any other HTTP methods return a `405 Method Not Allowed` response.
- Ensures content type is set to `application/vnd.api+json`.
- Includes basic error handling, including `404 Not Found` and `500 Internal Server Error` responses.

## API Endpoints

### `GET /api/whoami`

Returns the following information about the client:

- **IP address** (`ip`): The real IP address of the client.
- **Preferred language** (`language`): The preferred language of the client extracted from the `accept-language` header.
- **User-Agent** (`software`): The client’s User-Agent string.

#### Example Response:

```json
{
  "data": {
    "type": "client-info",
    "attributes": {
      "ip": "127.0.0.1",
      "language": "en",
      "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }
  }
}
```

## Error Handling

- **405 Method Not Allowed**: If a request is made with a method other than `GET`.
- **404 Not Found**: For any unknown routes.
- **500 Internal Server Error**: For unexpected errors.

### Example Error Response:

```json
{
  "errors": [
    {
      "status": "405",
      "code": "method-not-allowed",
      "title": "Method not allowed",
      "detail": "Request method MUST be GET"
    }
  ]
}
```

### Example 404 Error:

```json
{
  "errors": [
    {
      "status": "404",
      "code": "Not Found",
      "title": "Not Found"
    }
  ]
}
```

## Installation

1. Clone this repository or download the project.
2. Install dependencies with npm:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

The server will now be running on `http://localhost:5000`.

## Usage

- Make a `GET` request to `http://localhost:5000/api/whoami` to get the client information.
- Example with `curl`:

    ```bash
    curl http://localhost:5000/api/whoami
    ```

## License

This project is licensed under the MIT License.