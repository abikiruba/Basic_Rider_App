# Rider Management Application
This is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to manage rider details. It allows users to perform CRUD (Create, Read, Update, Delete) operations on rider records. The application also incorporates additional features such as image upload using Cloudinary and Multer, form validation with Validator, and a responsive UI design using Material-UI.

## Features
**CRUD Operations**: Users can create new rider profiles, view existing profiles, update rider information, and delete rider records.

**Image Upload**: The application supports image upload for rider profiles. Images are stored on Cloudinary, and the image URL is saved in the database.

**Form Validation**: Validator is used to validate form inputs and ensure that data is entered in the correct format.

**Error Handling**: Proper error handling is implemented throughout the application to provide meaningful error messages and prevent application crashes.

**Loading Indicators**: Loading indicators are added to necessary places in the user interface to indicate when data is being fetched or operations are in progress.

**Backend Pagination**: Backend pagination is implemented for the list of riders. This ensures that only a certain number of riders are fetched from the database at a time, improving performance and reducing network load.

**Search Functionality**: Users can search for riders by name, email, or ID. The application performs a search query based on the provided search term and displays the matching results.

**Admin Seed File**: A seed file is provided to add an admin user directly to the database. This ensures that an admin user is available to manage the application from the start.

## Setup Instructions
Clone the repository from GitHub.

Install the required dependencies by running the following command in the project's root directory:

Copy code

```
npm install
```

Update the .env file in the /server directory with the correct details. Set the following environment variables:

```
MONGODB_URI: Connection URI for your MongoDB database.
CLOUDINARY_CLOUD_NAME: Cloudinary cloud name for image upload.
CLOUDINARY_API_KEY: Cloudinary API key for image upload.
CLOUDINARY_API_SECRET: Cloudinary API secret for image upload.
```
Run the application by executing the following command in both server and client directory:

Copy code
```
npm start
```

Access the application by navigating to http://localhost:3000 in your web browser.

## Repository Structure
The repository is structured as follows:

**/client**: Contains the frontend application built with React.js.

**/server**: Contains the backend application built with Node.js and Express.js.

**/public**: Includes the static assets and HTML template for the frontend application.

**/models**: Defines the data models for riders in the MongoDB database.

**/routes**: Contains the API routes for handling CRUD operations and search functionality.

**/controllers**: Implements the logic for handling API requests and responses.

**/middlewares**: Includes custom middleware functions for multer image.

**/utils**: Includes custom middleware functions for cloudinary image.

**/seeds**: Contains the seed file to add an admin user to the database.


## Thankyou...

