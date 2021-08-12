<p align="center">
  <img src="https://images.webdesigan.com/7977a440fb96487d9c34aa9441405929" alt="">
   <img src="https://images.webdesigan.com/9d05d12c35f54675bc03fbd331ebd218" alt="">
   <img src="https://images.webdesigan.com/638580d812d14554b0aa5bbb42b0b4cc" alt="">
</p>
<p align="center">
    <a href="https://webdesigan.com">WebDesigan, Find Inspiration</a>
  
</p>
</p>

# About The Project

This repository hosts all the frontend code of my Capstone Project. The frontend is a GatsbyJS application that integrates with TailwindCSS, HeadlessUI, react-hook-form, and framer-motion for a fast and nice-to-use web experience. If setup help is required, please contact me: philip.bizmis@code.berlin.  
The related backend repository can be found [here](https://github.com/pbizimis/cp-backend).  
A running production system can be found here: https://webdesigan.com. 

# Getting Started

### Setup

Please make sure that you have [GatsbyJS installed](https://www.gatsbyjs.com/docs/tutorial/part-0/) (please follow only the Part 0 guide).
_____________

Clone the repository
```
git clone https://github.com/pbizimis/cp-frontend.git
cd cp-frontend/
```
Install all packages
```
npm install
```
The created developer Auth0 account that is used for testing, cannot access the scope without explicitly asking for it. Therefore, please open the `gatsby-browser.js` file and add a line at line 14 with `scope={“use:all”}`.
### Running
The application can run without a running instance of the backend API. However, after login there might be endless loading screens because of missed data fetching. Therefore, please run your backend with `uvicorn app.main:app --reload` or run the Docker container (see Setup instructions for backend repository).
_______________________
After that, please move your `.env.development` file into the root directory (`cp-frontend/`). You should be able to run the application with:
```
# /cp-frontend
gatsby develop -p 3000
```
Please make sure that the port is set to 3000. This is necessary for the correct configuration with Auth0 and the backend.
### Testing
There are two kinds of tests that can be executed: unit and integration tests. You can run all tests with:
```
# /cp-frontend
npm test
```
To isolate a test, run:
```
# /cp-frontend
npm test path/to/file
```
______________________
This setup guide is tested and should work as presented.

# Project Structure
### Overview
The repository has one main codebase: The src directory.
Inside the src directory are three import directories. Tests are always alongside their main files in a __tests__ or __integrationTests__ directory.
#### pages
The pages directory includes all pages that the application has. In addition to that, the pages directory holds all integration tests. The tests run against a mocked API backend server.
#### components
The components directory includes all components and their corresponding sub-components. Sub-components are rendered by their parent-components, which are again rendered by a page. Therefore, only unit tests are necessary for each component.
#### utils
The utils directory includes all code that is not React code such as a sorting function or a fetch API factory function.
