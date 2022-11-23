# Node Whatsapp App with Docker

## Docker commands

```sh
docker build --tag <mytag> .
docker run -p <port>:3000 <mytag>
```

Running with volume & auto-restart when changing files,
Change the Dockerfile to use `npm run watch` instead of `npm run start`

Rebuild the image and spin it up with docker-compose, which makes node_modules exclusion volume easy:

```sh
docker build --tag <mytag> .
docker-compose -d up
```

and

```sh
docker-compose down
```

to stop it.

## Server

Uses `whatsapp-chat-parser` to parse the `.txt` file to `.json`.
Using `express` to serve it on `/chat` URL and serve the client simultaneously.

## Client

Uses `fetch` (native in the browser) to send HTTP-request to the server for the parsed WhatsApp chat.
Uses regular DOM manipulation (`innerHTML`) to render the data to the DOM (Document Object Model).
The second chart uses `chart.js` for rendering a cool doughnut.

## Deploying

Since it's a Docker container, you can build the image, push it to DockerHub (or similar) and deploy it on a cloud provider like Azure, Google Cloud, Amazon Cloud, etc.

For Azure, you can use `App Service` from `portal.azure.com` and deploy from there.
