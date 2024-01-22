# LeadFlow

A comprehensive full-stack web application that allows users to seamlessly log in and manage prospective customer information through Create, Read, Update, and Delete (CRUD) operations. The front-end is crafted using React, with state management being handled by Redux. The front-end is integrated into the Django back-end framework through Django templates and the application is supported by two APIs. One API oversees user account management, while the other facilitates CRUD operations on lead records. Hosting the user account and lead information is a MySQL database. (Work-in-Progress)

## Tech Stack

**Front-End**

-   React (with react-router-dom, react-helmet)
-   Redux (with @reduxjs/toolkit)
-   Bootstrap (with react-bootstrap)
-   Webpack (Build and Bundling)
-   Babel (JavaScript Transpilation)

**Back-End:**

-   Django
-   Django REST Framework (REST APIs, simple JWT)
-   Node.js (API fetching, other utilities)
-   mysqlclient (Connects back-end to the database)

**Database:**

-   MySQL

**Other:**

-   Core-js (JavaScript polyfill, integrated in build process with Babel)
-   js-cookie (Document cookie management)

## API Endpoints

| Endpoint              | Allowed Methods               | Purpose                                                                      |
| --------------------- | ----------------------------- | ---------------------------------------------------------------------------- |
| `/api/leads/`         | POST, GET, PUT, PATCH, DELETE | Facilitates all CRUD operations related to maintaining lead records          |
| `/api/token/`         | POST                          | Returns access and refresh tokens given a valid username and password        |
| `/api/token/refresh/` | POST                          | Returns an access token given a valid refresh token                          |
| `/api/token/verify/`  | POST                          | Takes a token and returns its status (valid/invalid)                         |
| `/api/users/register` | POST                          | Creates a new user                                                           |
| `/api/users/me`       | GET                           | Obtains the first name, last name, and email of the user currently logged in |

## Setup

This section goes over project setup

### Prerequisites/Requirements

-   Node.js
-   Python (pipenv and Django)
-   MySQL

### Installation of Dependencies

Open a terminal in the root directory of the project and run the following to install the virtual environment and required python dependencies:

`pipenv install`

In the same terminal, install the required JavaScript dependencies with:

`npm install`

### Running the Project

Open a terminal in the root directory. Activate the virtual environment:

`pipenv shell`

Create a `.env` file in the root directory with the following contents:

```
SECRET_KEY=django-secret-key
DEBUG=True
DB_NAME=database-name
DB_HOST=000.0.0.0
DB_USER=db_user
DB_PORT=9999
DB_PASSWORD=password
```

Replace the credentials with your database credentials.

Ensure the MySQL server is running on your machine. Step into the directory `root/leadflow` and run the following commands to create the database on your computer:

```
python manage.py makemigrations
python manage.py migrate
```

In the same terminal, run the Django server:

`python manage.py runserver`

The project is up and running on your localhost!

If you want to make changes to the front-end and see them in real-time, open another terminal at the root directory and run:

`npm run dev`

Every time a file is saved, Webpack, Babel, and Core-js will bundle and transpile the code, updating the front-end application.
