K9k# Project2Interactive

<a href="https://github.com/DamianMcNulty/project2interactive/stargazers">
    <img src="https://img.shields.io/github/stars/DamianMcNulty/project2interactive.svg?style=social" alt="GitHub stars">
</a>

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/DamianMcNulty/project2interactive/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/DamianMcNulty/project2interactive/tree/main)

## Goal

> Create a Data Dashboard visualising a dataset using D3.js and DC.js

## Table of Contents

-   [Description](#description)

-   [UX](#ux)

-   [Technologies Used](#technologies-used)

-   [Local Development](#local-development)

-   [Local Testing](#local-testing)

-   [Deploy](#deploy)

-   [Credits](#credits)

-   [LICENSE](#license)

## Description

[(Back to top)](#table-of-contents)

1.  This project visualises an expense dataset for the year 2019. 
2.  The data was generated using the website Mockaroo.com. 
3.  There are **265** transactions with each having a date, account name and amount. 
4.  Graphs have been prepared using D3, DC and Crossfilter.

## UX

[(Back to top)](#table-of-contents)

### User Stories

1.  As a user, I want to view a dashboard, so that I can analyse an expense dataset.
2.  As a user, I want to interact with an expense dashboard, so that I can discover interesting trends in the data.
3.  As a user, I want to view an expense dataset using desktop devices.
4.  As a user, I want to load an expense dataset into the browser to create a new dashboard, so that the dashboard can be reused.
5.  As a user, I want to create a pdf of the dashboard, so that I can print the dashboard.
6.  As a user, I want to view descriptive statistics of the dataset, so that I can easily characterise my outgoing expenses. 

## Questions

1.  What is the average expense amount for each account?
2.  How many transactions are there for each account?
3.  How many transactions are there in total?
4.  What is the total expense amount for each account?
5.  How many accounts are there?

## Technologies Used

[(Back to top)](#table-of-contents)

1.  [HTML5](https://en.wikipedia.org/wiki/HTML5) 

2.  [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)

3.  [Git](https://git-scm.com/)  

4.  [Github](https://github.com/) 

5.  [D3](https://d3js.org/) 

6.  [DC](https://dc-js.github.io/dc.js/)

7.  [Node v10.15.1](https://nodejs.org/)

8.  [NPM 6.4.1](https://www.npmjs.com/)

9. [Cypress.io](https://www.cypress.io/)

10. [HTML5 Validator](https://validator.w3.org/)

11. [CSS3 Validator](https://jigsaw.w3.org/css-validator/)

12. [csv2json](https://www.csvjson.com/csv2json)

14. [CircleCI](https://circleci.com/)

## Local Development

[(Back to top)](#table-of-contents)

    git clone https://github.com/DamianMcNulty/project2interactive.git
    npm i
    npm run build
    open http://127.0.0.1:5500/build/index.html with live-server in vscode

## Local testing

[(Back to top)](#table-of-contents)

    (in separate terminals)
    npm run buildandwatch
    npm run test_open

    python -m venv env
    pip install -r requirements.txt


## CI

[(Back to top)](#table-of-contents)

    git push

note: Integration tests are carried out using Cypress and Netlify.

## Production

[(Back to top)](#table-of-contents)

    git tag -a v1.0.0 -m "version 1.0.0"

    (in git bash terminal)
    sh ./publish.sh 1.0.0

The production version is hosted at <https://project2interactive.herokuapp.com/>

## Research

1.  <https://codepen.io/DamianMcNulty/pen/BqyZQq>
2.  <https://github.com/dc-js/dc.js/issues/731#issuecomment-59599016>
3.  <https://stackoverflow.com/questions/36494956/elasticxtrue-doesnt-work-dc-js>

## Credits

[(Back to top)](#table-of-contents)

-   <https://www.linkedin.com/learning/dc-js-for-data-science-essential-training> <a href="http://vizdata.co.uk/">Emma Saunders</a>

## License

[(Back to top)](#table-of-contents)

See [LICENSE](LICENSE).
