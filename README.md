## Text Summarizer Chrome Extension

This is the frontend of a Chrome Extension that summarizes highlighted the text on a webpage.
[Backend repository](https://github.com/Siefke1/ChromeSummarizerBackend)

Consider it work in progress.

## Prerequisites

* [node + npm](https://nodejs.org/)

## Project Structure

* src : content script, background script, popup script
* src/components: React components
* src/components/__tests__: React component unit tests
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Build

```
npm run build
```

## Build in watch mode

### terminal

```
npm run watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory

## Test
`npx jest` or `npm run test`

## Thanks @chibat for the starter template

* [React Chrome Extension Boilerplate](https://github.com/chibat/chrome-extension-typescript-starter)