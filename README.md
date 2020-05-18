# Loyal card core service
## Background
I am a regular coffee consumer and see lots of the coffee shop use paper-based cards to reward customers with regular purchases. There are lots of paper waste of this solution and the data is not tracked and the stamp verification can be hacked easily.
So the idea is to create a digital loyalty card solution to reduce the paper usage that can protect our environment to some extent. Also, as the spreading of the COVID-19, this solution also reduces the unnecessary contact during the business activity as the whole process is contactless. Meanwhile, this digital solution will keep the data for reporting and future big-data analysis for the customer coffee consumption behavior if the data collection is accumulated to a certain amount, and the scan verification on the one time QR code token can make sure the security of the system.
This is a MVP (Most viable product) that verifies that the solution is feasible and makes sure the core functionalities are achieved, there will be an ongoing development roadmap to extend the features of this solution.
The whole solution consists of three components, `core-service` , `admin-dashboard` and `client-mobile-app`.
## Introduction
This`core-service` support the core business functionality and provide the RESTful service to the `admin-dashboard` and `client-mobile-app`
### Highlights
- This project is a Node Express application connected to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud database.
- Use Time-based One-time Password to for the purchase verification.
- Integrate Auth0 as the authorization middleware for the API.
- Implement JWT autorization middleware for the admin dashboard.
- Use Web Socket to push data to the mobile client.
- Continuous deployment to Heroku.
## Getting started
### Prerequisites
1. Node: any version starting with 10.16.0 or greater
  - run `node --version` to check current node version
  - If you need to upgrade or install [NodeJs](http://nodejs.org/) : suggest to install via [Node Version Manager NVM](https://github.com/creationix/nvm)
2. A clone or download of this repo on your local machine
### Installation
1. `cd` to the project root
2. `npm install`to install the npm dependencies
### Running locally
- `npm run start` to start the local development server.
