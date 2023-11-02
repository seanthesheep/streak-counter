## Streak Counter

Two apps doing the same thing, one in react/express and the other in Nextjs. They take in an input and determine the highest number of even/odd streaks based on the letters entered.

### Setup With Docker To Run All 3 Apps At Once
```
cd streak-counter
docker compose up
```

### Without Docker
``` 
cd streak-counter/foraged-assesment-nextjs
npm install
npm run dev
```
In Two Terminal Windows:
```
cd streak-counter/foraged-assesment-cra-nodejs/frontend
npm install
npm run start
```
```
cd streak-counter/foraged-assesment-cra-nodejs/backend
npm install
node .
```

NextJS app will be running on port 3002, Plain React app will be running on 3000. Express app endpoint is at 4400/streak
