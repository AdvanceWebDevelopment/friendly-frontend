# Friendly Frontend

This is frontend of the Doran House project

To start the project, at the root directory, run:

```shell
> docker run -p 3000:80 -e REACT_APP_API_HOST="http://localhost:9090" --name doran-frontend kafkawannafly/doran-house.friendly-frontend
```



## Development

To start the project for development, run:

```shell
> npm i --legacy-peer-deps

> npm run lint

> npm start
```

It will open a browser tab at `http://localhost:3000/`

Check out `.env` for proper environment variables.
