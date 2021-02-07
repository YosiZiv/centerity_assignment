Centerity Assignment Instruction
 
Install

Backend
cd backend
npm install in backend folder to install concurrently!
npm run installAll to Install all server dependencies
npm start to run all server

Client
cd client
npm install
npm start

Test
cd client
npm run test

Common folder
common is only for reference since the code in common pass to 
all server with npm package.

Work Flow

backend have 8 simple server inspire from json file with different priority.
i wasn't sure about server status on first init so i randomly assignment
them on init
NodeModule class expose 2 methods needed to complete the home assignment.

npm start on client will run and await for setServersStatus complete,
then run getPriorityServer log result and exit the program.
you can play with at in index.ts file in the main iife function

Please let me know if you have any question or future suggestion

