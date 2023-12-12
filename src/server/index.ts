import express, { json, Express } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(json());

app.use(cors());

const server = app.listen(4200, (): void => {
  console.log(
    'Server is Successfully Running and App is listening on port ' + 4200,
  );
});

server.on('error', (error) =>
  console.log("Error occurred, server can't start", error),
);
