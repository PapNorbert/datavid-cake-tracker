# Datavid Cake Tracker

Datavid Cake Tracker is a management tool that helps in keeping track of all Datavid members and their birthdays.



## Features

- **Create Member:** Add new members by entering their first name, last name, birth date, country, and city.
- **View Members:** Easily navigate through a paginated list of all members added to the app.
- **Filter Members:** Search and filter members by their first or last name to find specific individuals quickly.
- **Edit and Delete:** Update member details or remove them from the database as necessary.
- **Sort by Birthday:** View members sorted by the closest upcoming birthday to keep track of important dates.


## Usage

- **Adding Members:** Navigate to the 'Add Member' page and fill in the required fields.
- **Viewing Members:** Access the 'Members' page to see the paginated list of all members.
- **Editing or Deleting Members:** Click on the edit or delete icons next to each member entry in the list.
- **Filtering Members:** Use the search bar in the 'Members' page to filter members by last name and/or first name.
- **Sorting by Birthday:** Click on the 'Members ordered by birth date closest' in the Members page to view members sorted by upcoming birthdays.


## Used Technologies

This Members Management App utilizes the following technologies:

- **Backend Framework:** Spring Boot
- **Frontend Framework:** React
- **Database:** MySQL

## Prerequisites

Before running the Members Management App locally, ensure you have the following set up:

1. **MySQL Database:** Install MySQL and create a database named `datavid_tracker`. Configure access credentials in `application-jpa.yml`.

3. **Frontend Dependencies:** Install Node.js and npm, then run `npm install` in the client directory.

4. **Java Development Kit (JDK):** Install JDK compatible with Spring Boot version used.


## Running the App

The backend, built using Gradle, can be started by navigating to the **backend** directory and executing the command `gradlew bootRun`. This will launch the backend server. 

Next, navigate to the **client** directory, install dependencies with `npm install`, and start the frontend development server with `npm start`. Once both servers are running, access the app at `http://localhost:5173/` in your web browser.