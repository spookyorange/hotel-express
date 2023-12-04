# Hotel Express

Hotel Express is an app about hotel management, reservation and more!

## Installation For Development

1. Clone this repository
2. Install dependencies(`npm install` or `yarn`)
3. Copy ".env.template" to ".env"
4. Update ".env" with your own configuration(make sure to create a secret key with crypto)
5. Generate the prisma client(`npx prisma generate`)
6. Run the app(`npm run dev` or `yarn dev`)

## Installation For Production

1. Clone this repository
2. Use docker to build the image(`docker build -t hotel-express .`(use tags if you want to version your image))
3. Update the docker-compose.yml file with your own configuration, change passwords and secrets
4. Run the app(`docker compose up -d`)
5. Push the prisma schema if you haven't already, get inside the container with `docker exec -it hotel-express-hotel-express-1 sh`, then run `npx prisma db push` inside the container, then exit the container with `exit` or `ctrl + d`

Note: Stop the app with `docker compose down` and start it again with `docker compose up -d`
