![CS2 HUB Logo](https://res.cloudinary.com/dbhsorjvc/image/upload/h_80/v1702408600/CS2%20STASH/fmbxdwdh6705npfii0ul.webp)

## Introduction

Welcome to the official repository of **CS2 HUB**, an innovative web page designed for CS2 skin enthusiasts. This platform is built using modern and robust technologies, ensuring an exceptional user experience.

The server is hosted on Render: [https://backend-sergi-casiano.onrender.com/](https://backend-sergi-casiano.onrender.com/) (Render is a free service that turns non-active projects into "sleeping mode"). Once you click on the link above, you should wait, and it will only take a minute for the server to wake up!

The frontend user interface is hosted on Vercel: [https://sergi-casiano-final-project-front-202309-mad.vercel.app/](https://sergi-casiano-final-project-front-202309-mad.vercel.app/)

URL to GitHub backend repository: [https://github.com/isdi-coders-2023/Sergi-Casiano-Final-Project-back-202309-mad](https://github.com/isdi-coders-2023/Sergi-Casiano-Final-Project-back-202309-mad)

## Technologies Used

- **Front-end**: Built using technologies like HTML, CSS, JavaScript, Typescript, and uses the React.js framework with Redux.
- **Testing**: Jest (for testing React components).
- **State Management**: Redux (using store, slice, thunk, hooks).
- **Back-end**: MERN Stack (MongoDB, Express.js, React, Node.js).

## Main Features

- **User Authentication**: Registration and login for a personalized experience.
- **Skin Management**:
  - **Administrators**: Can modify, add, and delete skins.
  - **Users**: Can view the list of available skins and their detailed pages.
- **Category Filtering**: Users can filter skins by categories such as Pistols, Rifles, SMGs, Knives, and Gloves.
- **Real-time Interaction**: The frontend allows real-time interaction with the backend, updating data and displaying notifications in real time.

## Testing

The project is 100% tested with Jest, ensuring the reliability and stability of the application.

## Installation and Execution Instructions

To install and run CS2 HUB in your local environment, follow these steps:

1. `git clone https://github.com/isdi-coders-2023/Sergi-Casiano-Final-Project-front-202309-mad.git`
2. `cd Sergi-Casiano-Final-Project-Front-202309-mad`
3. `npm install`
4. Configure environment variables: If necessary, create a .env file in the root directory of the project and set the necessary environment variables.
5. Start the development server: `npm run dev`

## Project Structure

The frontend project follows a common directory structure for a React.js application. Here is a description of the main directories:

- **src**: Contains the source files of the application, including components, styles, and configuration files.
- **public**: Contains static files that are served directly to the browser, such as the main HTML file and image files.
- **components**: Contains the reusable components of the application.
- **pages**: Contains the different pages of the application.
- **styles**: Contains the CSS styles of the application.
- **.husky**: Contains security measures for GitHub branches.
- **.github**: Contains workflows necessary for SonarCloud.

## Contribution

If you wish to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. Make the necessary changes and commit: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request to the original repository.
