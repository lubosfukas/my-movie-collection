# My Movie Collection

Simple movie database application using React and OMDb API.

## File structure

```text
src
├── components          # Feature first grouped components
├── hooks               # Hooks used across whole application
├── pages               # Top level views
├── utils               # Tools and utilities
```

## Installation

Install latest LTS version of [Node](https://nodejs.org/en/).


Install latest version of yarn.

```bash
npm install -g yarn
```


In `src` folder create file `.env.local`. Add to this file `REACT_APP_API_KEY` with OMDb API key generated [here](https://www.omdbapi.com/apikey.aspx).

```text
REACT_APP_API_KEY=your_key_here
```


Install Visual Studio Code recommended extensions. Open Extensions tab and type `@recommended`. Install all of them.


Install all dependencies.

```bash
yarn install
```

or simply

```bash
yarn
```


Start the project.

```bash
yarn start
```

## Development

Preferably in Visual Studio Code with ESLint and Prettier installed. Commits are written in [Conventional Commits](https://www.conventionalcommits.org/).


Scripts

```bash
yarn
yarn install
yarn start
yarn lint
yarn lint:fix
```


Build with

```bash
yarn build
```
