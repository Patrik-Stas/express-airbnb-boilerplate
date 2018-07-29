# Another JS Boilerplate
- Pretty standard boilerplate - Node, Express, Mongo, Jest for testing with all the code under AirBnb linter.
- In addition to that, I provide some guidance how to deploy your Node application to linux server as
1. Docker container
2. Dokku application
- I am also providing guidance on secret storage - password, API tokens etc. using `git-secret`

##### Don't care about Docker, Dokku, git-secret?
- If so, just run
```bash
rm Dockerfile docker-compose.yml dokku-setup.sh
rmdir secrets
```


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

# Deployment secrets
Your application will probably need to have certain secret information - API tokens, database passwords, certificates, private keys etc. Simple way to take care of secrets is using `git secret`.

For illustration, let's say we have following secret value to take care of
```bash
mongodb://db-admin:NjkasDSARXXXA4431@ds21321.mlab.com:29115/database-name-kay
```
Now you have 2 main options:
- Store the secret out of project, somewhere else (HashiCorp Vault or under your pillow)
- Encrypt the secret in the repo itself, encrypted - this is not good practice for bigger projects, but should be enough for getting started (see arguments here https://news.ycombinator.com/item?id=11662364)

We'll go with the second option, encrypted secrets stored in the repo itself, using [git-secret](http://git-secret.io/).
Steps:
- Create new file with the secret in `./secrets` directory
```bash
mkdir -p secrets
echo 'mongodb://db-admin:NjkasDSARXXXA4431@ds21321.mlab.com:29115/database-name-kay' > ./secrets/database.txt
```
- Initialize git-secret
```bash
git secret init
```
- This will generate `.gitsecret` directory which **should be** committed to git repo.
- If you don't yet have, generate GPG key. GPG keys is pair of public and private key. Public key representing an identity, while the private key represents proof of identity ownership.
```bash
gpg --full-generate-key
```
- Add your GPG identity to git secret. This will grant access to encrypt and decrypt git-secrets in this repo to owner of this identity (you). Make sure you specify the same email as you've specified in your GPG key.
```bash
git secret tell your@gpg.email
```
- Now let's encrypt. Let's encrypt our secret file `./secrets/database.txt`.
```bash
git secret add ./secrets/database.txt
git secret hide ./secrets/database.txt
```
- After running the second command, new file `./secrets/database.txt.secret` will be generated.
- The `.gitignore` file is setup in such way that only files with `.secret` postfix in directory `secret` are encrypted. 


# Run server
`yarn start` - runs server

# Run tests
`yarn test` - run concurrently both unit and integrations tests

# Run dev server
`yarn dev` - runs `nodemon` which reloads the server on any detected changes
