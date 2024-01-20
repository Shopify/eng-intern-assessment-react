
# Setup and Contribution Guide for InternAssessmentSolution

This document provides detailed instructions for setting up, testing, and contributing to the InternAssessmentSolution project.

## Prerequisites

Ensure you have the following installed before you begin:
- Node.js
- npm (comes with Node.js)
- Git

## Cloning the Repository

Clone the repository to your local machine to start working on the project:

\```bash
git clone https://github.com/EDHE08232001/InternAssessmentSolution.git
cd InternAssessmentSolution
\```

## Installing Dependencies

Run this command in the project's root directory to install the necessary dependencies:

\```bash
npm install
\```

## Installing Jest and Related Dependencies

The project uses Jest for testing, along with several related packages for React, TypeScript, and CSS module support:

- `jest`: The core testing framework.
- `@babel/preset-env`: Compiles JavaScript ES6+ down to ES5.
- `@babel/preset-react`: Transforms JSX into JavaScript.
- `@babel/preset-typescript`: Adds TypeScript support to Babel.
- `babel-jest`: Integrates Babel with Jest.
- `@testing-library/react`: Provides React testing utilities.
- `@testing-library/jest-dom`: Custom Jest matchers for DOM elements.
- `ts-jest`: TypeScript preprocessor with source map support for Jest.
- `jest-environment-jsdom`: Simulates a browser-like environment for testing.
- `identity-obj-proxy`: Mocks CSS imports during testing.
- `@types/jest`: TypeScript definitions for Jest.

To install these dependencies, use the command:

\```bash
npm install --save-dev jest @babel/preset-env @babel/preset-react @babel/preset-typescript babel-jest @testing-library/react @testing-library/jest-dom ts-jest jest-environment-jsdom identity-obj-proxy @types/jest
\```

Additionally, to ensure Jest recognizes TypeScript definitions, install the TypeScript types for Jest:

\```bash
npm install --save-dev @types/jest
\```

## Clearing Jest Cache

In some cases, you may need to clear Jest's cache to resolve issues with outdated test data. Use either of these commands:

\```bash
npx jest --clearCache
\```
or
\```bash
jest --clearCache
\```

## Running the Project

Start the development server with:

\```bash
npm start
\```

The server usually runs at `http://localhost:3000`.

## Running Tests

Execute the test suite using:

\```bash
npm test
\```

This runs all tests defined in the project using Jest.

---

Thank you for contributing to the InternAssessmentSolution project!