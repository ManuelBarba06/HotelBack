# Hotel Back-end

## Tecnologies:
- Node.js
- Express.js
- Mongodb
- Docker

## Initialization Steps:
1. Install all libraries from project using the next command:
```
npm install
```
or
```
npm i
```
2. Duplicate **.env.template** and rename the new one with the next name **.env**
3. Inside **.env** and add the next variables and values:

**Server**
| Variable | Example | Description |
| :---        |    :----:   |          ---: |
PORT | 4000 | Port where the system is running
SECRET_KEY | S3cr3tK3y | The key for the json web token

**Mongodb**
| Variable | Example | Description |
| :---        |    :----:   |          ---: |
MONGO_DB_NAME | NombreDB | Database name
MONGO_USERNAME | admin | User for the database
MONGO_PASSWORD | mongodb://localhost:27017 | Url of the database in the local
URL_PROD_DB_NAME | mongodb+srv://admin:root@cluster0.fjplh.mongodb.net | Url where is hosted
4. Execute docker compose to create the db in our local:
```
    docker compose up -d
```
5. If you change the docker-compose excute the next command and then execute command of the four step
```
    docker compose down
```

## Start the project
### Development
Start the project in development is with the next command:
**Windows**
```
    npm run dev:windows
```