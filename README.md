# Google Map Finder by Pau Rodríguez

## How it looks

🔗 [Live Demo](https://google-map-finder.vercel.app/)

With this React application you can find any direction from google map and set a marker on the map.

I have developed this application using atomic design and test driven development. All components have been tested with **unit tests** and the application has several **e2e tests** to corroborate its robustness.

I also make use of **github actions to run a pipeline** that automates the checking of the tests, and the different rules applied during the build.

The template [create-boilerplate-react](https://www.npmjs.com/package/create-boilerplate-react), also developed by me, was used to start this project.

## Quick Start

```
git clone https://github.com/Silinde87/google-map-finder.git
cd google-map-finder
yarn install

create .env.local file at root and set REACT_APP_API_KEY=google map api key

yarn start
```

## Available scripts in the application

### yarn install

> **Install app dependencies**

### yarn start

> **Runs the app** in the development mode. Open http://localhost:3000 to view it in the browser.

### yarn test

> **Launches the unit test runner** (Jest/RTL) in the interactive watch mode.

### yarn cy:open:local

> **Launches the e2e test runner** (Cypress) in interactive watch mode.

### yarn build

> **Generates a build version ready for deploy**.

---

## Stack

| Package              | Version |
| -------------------- | ------- |
| React & react-dom    | 18.0.0  |
| styled-components    | 5.3.5   |
| jest/testing-library | 5.16.4  |
| cypress              | 9.5.4   |
| eslint               | 8.13.0  |
| prettier             | 2.6.2   |
| prop-types           | 15.8.1  |

## Output

```
.
├── README.md
├── package.json
├── jest-setup.ts
├── jest.config.js
├── cypress.json
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── public                  # Assets
├── cypress                 # Cypress configurations and utils
└── src                     # React App folder
    ├── components          # All the components of the application
    │   ├── atoms           # The smallest components
    │   └── molecules       # A combination of atoms components
    ├── context             # The React context for this app.
    ├── globals             # Shared files such as utils or constants
    ├── utils               # Shared utilites and files such as utils or rules
    ├── routes              # The layouts or routes
    ├── services            # The controllers that manage the communication with Google API
    ├── fonts.css
    ├── GlobalStyles.ts
    ├── index.ts
    └── setupTests.js
```

---

## Author

👤 **Pau Rodríguez**

- Website: https://www.linkedin.com/in/paurodriguezmolina/
- Github: [@Silinde87](https://github.com/Silinde87)
- LinkedIn: [@paurodriguezmolina](https://linkedin.com/in/paurodriguezmolina)
- Twitter: [@Silinde87](https://twitter.com/Silinde87)

## License

[GNU General Public License](https://opensource.org/licenses/gpl-license)
