## Quality & connectivity

The application uses the Capacitor Geolocation plugin to obtain the device's current location. Before accessing the location, it checks the permission status and requests permission when necessary. If the user does not grant permission or the location cannot be retrieved, the application displays an error message.

The application uses the DummyJSON API to authenticate users. After a successful login, it receives an access token and uses it to request the protected `/auth/me` endpoint. If the API returns a 401 status, the application informs the user that the session has expired or the token is invalid.

The application also handles connection problems by checking network availability and catching request errors. Loading indicators, successful data and error messages help users understand the current state of the application.

Unit tests are implemented with Vitest to verify the authentication service, and Playwright is used to test that the application loads correctly.