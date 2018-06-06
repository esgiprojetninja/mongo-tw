# Twitter Ninja Api
The goal is to fetch and store twits to use as a big data source

# Requirements
- `docker pull mongo`
- `docker run --name bigdata_2 -d mongo`
- retreive container's ip with `docker inspect -f '{{ .NetworkSettings.IPAddress }}' bigdata_2`
- `cp .env.sample .env.local`
- replace the IP given in .env.local's DB_PATH with the actual container's ip
- `npm i`
- `npm serve`
