Local dev environment
1. git clone
2. `cd app && npm install`
3. `cd server && npm install`
4. go to `/server/config/environments/development/database.json` and add mysql connection params
5. `cd app && npm run dev`
6. `cd server && npm run dev`

--------
Deploy on server
1. launch ubuntu 18 server, install docker
2. clone repo (in home folder). don't forget to ssh-keygen and add key to bitbucket/github
3. redirect domain to server ip (in cloudflare most likely)
4. generate certs:
~~~~
docker run --name=letsencrypt -e TZ=Europe/Bucharest -e URL=lnkd.co -e SUBDOMAINS=www,api -e VALIDATION=http -e EMAIL=sorin@q3.ro -p 443:443 -p 80:80 -v /etc/letsencrypt:/config linuxserver/letsencrypt
~~~~
5. create .env file (from .env-sample)
6. `docker-compose build && docker-compose up -d`
7. mysql: page slug must be unique. `command: ALTER TABLE pages ADD UNIQUE (slug)`

--------
Deploy on Google Cloud Run
1. "cd app" / "cd server", then steps below, replacing 'server' and 'app'
2. `gcloud builds submit --tag gcr.io/lnkdco/app` 
3. `gcloud beta run deploy --platform managed --image gcr.io/lnkdco/app`