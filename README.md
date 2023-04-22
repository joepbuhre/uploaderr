# Uploaderr

Uploaderr is a web application that allows users to easily upload files and share them with others. It's built using Node.js and the Express framework.

## Installation

To run Uploaderr, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/joepbuhre/uploaderr.git
   ```
   
2. Install the dependencies:

   ```
   npm install
   ```
   
3. Set up the configuration:

   ```
   cp .env.example .env
   ```
   
   Edit the `.env` file and set the environment variables according to your needs. The following environment variables are available:



| Variable Name | Default | Possible Options | Description |
| --- | --- | --- | --- |
| APP_PORT | 8080 | Any valid port number | This variable sets the port number for the backend server to listen on. |
| FRONTEND_PORT | 8080 | Any valid port number | This variable sets the port number for the backend server to listen on. |
| EMAIL_PORT | 25 | Any valid port number | This variable sets the port number for sending emails. |
| LOG_ENABLED | true | true, false | This variable is a boolean that determines whether or not logging is enabled for the application. |
| LOG_LEVEL | debug | debug, info, warning, error, critical | This variable sets the level of logging to be used. |
| LOGGER_NAME | uploaderr | Any string | This variable sets the name of the logger instance to be used for logging. |
| UPLOAD_PATH | /uploads | Any valid directory path | This variable sets the directory path for uploaded files. |
| ALLOWED_FROM | None | Any valid email address or domain name | This variable sets the list of email addresses or domain names that are allowed to send emails. |
| ALLOWED_TO | None | Any valid email address or domain name | This variable sets the list of email addresses or domain names that are allowed to receive emails. |
| API_KEY | None | Any string | This variable stores an API key that can be used to authenticate requests to the API. |
| VITE_PUBLIC_KEY | None | Any string | This variable stores an API key that can be used by the frontend. |
| MODULE_EMAIL | true | true, false | This variable is a boolean that determines whether or not the email module is enabled. |
| MODULE_FRONTEND | true | true, false | This variable is a boolean that determines whether or not the frontend module is enabled. |
| MODULE_BACKEND | true | true, false | This variable is a boolean that determines whether or not the backend module is enabled. |

4. Start the server:

   ```
   npm run dev:frontend
   npm run dev:server
   ```
   
5. Visit `http://localhost:5173` in your web browser to access the frontend.
   > Note at the moment it is required to proxy requests from http://localhost:5173/api to http://localhost:8080/api if you want to use the frontend
6. Use `http://localhost:8080/api` to access the Uploaderr api.

## API

Uploaderr also provides an API for uploading and downloading files. The following endpoints are available:

- `POST /api/document/create`: Upload a file. The file should be sent as a multipart form data with the name `documentx`.

The API requires an API key, which is set using the `API_KEY` environment variable.

## License

Uploaderr is released under the GNU AGPLv3 License. See `LICENSE` for more information.