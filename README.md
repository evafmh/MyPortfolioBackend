# Backend for Contact Form - Node.js, Express, Nodemailer
This repository contains the backend for the contact form of my portfolio website, built using Node.js, Express, Nodemailer, and the Outlook plugin to handle email sending functionality.

## Prerequisites
Before installing and running this project, make sure you have the following installed:

Node.js (version v20.2.0)
Express (version v4.18.12)
Nodemailer (version v6.9.4)
npm (version v9.6.6)

## Installation
Follow the steps below to install and set up the project locally:

Clone this repository to your machine:\
`git clone https://github.com/evafmh/MyPortfolioBackend.git`

Navigate to the project directory:\
`cd MyPortfolioBackend`

Install the necessary dependencies with the following command:\
`npm install`

## Configuration
Create a `.env.local` file at the root of the project and set the following environment variables:

```
OUTLOOK_EMAIL=your_outlook_email
OUTLOOK_PASSWORD=your_outlook_password
REACT_APP_OUTLOOK_EMAIL=your_recipient_email
```

Replace `your_outlook_email` with your Outlook email address.
Replace `your_outlook_password` with your Outlook account password.
Replace `your_recipient_email` with the email address where you want to receive the contact form submissions.

## Running the Backend:
Launch the backend with the following command:
`npm start`

The backend will be accessible at http://localhost:4000. If the server is running on a different port for any reason, the corresponding port number will be displayed in the console.

## Frontend Integration
To integrate the contact form with your frontend (located in the repository https://github.com/evafmh/MyPortfolio.git), make sure to update the form submission URL to point to your backend's API endpoint for handling the contact form submissions.