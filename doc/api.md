# /api/v1

|    endpoint    | method |             purpose             |
| -------------- | ------ | ------------------------------- |
| /              |  GET   | fetches the client SPA          |
| /api/v1/signup |  POST  | account registration            |
| /api/v1/login  |  POST  | account login                   |
| /api/v1/bikes  |  GET   | list all of the user's bikes    |

## /api/v1/signup (POST)
The body of the request must contain a json object containing the user's credentials:
```json
{
  credentials: {
    username: 'abner',
    password: 'asdf1234'
  }
}
```

Returns a token in the body of the response which must be included in subsequent requests.

## /api/v1/login (POST)

The body of the request must contain a json object containing the user's credentials:
```json
{
  credentials: {
    username: 'abner',
    password: 'asdf1234'
  }
}
```

Returns a token in the body of the response which must be included in subsequent requests.

## /api/v1/bikes (GET)

The Authorization header must contain the web token obtained from /signup or the user's most recent /login.
```
Authorization: Bearer <token>
```
