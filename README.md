## Flux Chat Example

Simple random chat application using Flux, React and Node.

## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

`npm install`

This will install all dependencies.

To build the project, first run this command:

`gulp`

This will create a bundle file and will export all source code from app to app/dist. Whenever a file is modified, the command 'gulp' must be run in order to export the changes to dist folder.

To run the project run this command:

nodemon ./server/server.js

After starting the watcher, you can open `index.html` in your browser to
open the app.

