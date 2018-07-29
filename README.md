# Another JS Boilerplate
## Node / Express / Mongoose / Jest / AirBnB ESlint / Dokku / Docker

- The server will run endoint `GET /users`, returns some data from preconfigured mlab MongoDB instance.
- AirBnB's superior ES-lint rules ^_^
- Test template for `jest` tests (No, `jest` is not for React only)

# Dokku deploy @ DigitalOcean
- Use DigitalOcean GUI to start new Dokku instance, or else
- use DigitalOcean `doctl` command line utility to create Dokku instance:
```bash
doctl compute droplet create dokku-boilerplate-project --image dokku-16-04 --region sgp1 --size s-1vcpu-1gb --ssh-keys <SSH key MD5 fingerprint>
``` 
- To find get MD5 fingerprint of your SSH key (the one you want to use to access droplet) run 
```bash
ssh-keygen -E md5 -lf <path-to-public-key>
```
- List your droplets
```bash
doctl compute droplet list
```
- **!!!!! Important !!!!!** Take the IP address of your droplet and visit it using your browser to finish Dokku configuration
- Now you need to create new application in Dokku. Follow http://dokku.viewdocs.io/dokku/deployment/application-deployment/
- Because there is Dockerfile in our repo, Dokku will be default try to deploy our application as container built out of this dockerfile. To prevent this behaviour and simply run our application as Node application with `yarn start`, you need to either delete Dockerfile from repo, or go to your Dokku instance and run 
```
dokku config:set wallet-scanner BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs
```
to tell Dokku explicitly to use NodeJS buildpack.

# Docker deploy
- Create docker repo at docker hub https://hub.docker.com/r/pstas/wallet-scanner/
- Login to docker repo: `docker login`
- Build docker image `yarn bimage`
- Push image to to dockerhub `yarn pimage`

Now on your server
- Login to docker
- Pull your image, depending on the image tag, something like `docker pull yourname/boilerplate-project:latest`
- Start a container `docker run -t yourname/boilerplate-project:latest`

# Run server
`yarn start` - runs server


# Run tests
`yarn test` - run concurrently both unit and integrations tests

# Run dev server
`yarn dev` - runs `nodemon` which reloads the server on any detected changes
