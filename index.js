import express from 'express'
import dotenv from 'dotenv/config.js'
//Db
import connectDb from './config/db.js';

//Routes
import customerRoutes from './routes/customer.js'
import roleRoutes from './routes/role.js'
import seederRoutes from './routes/seeder.js'

const app = express();
const port = process.env.PORT || 4000;
const version = "/api/V1"

connectDb();

app.use(express.json({extended: true}));


app.use(`${version}/customer`, customerRoutes);
app.use(`${version}/position`, roleRoutes);
app.use(`${version}/seeder`, seederRoutes)
// app.use(`${version}/employee`, require('./routes/employee'));

app.listen(port, () => {
    console.log(`The server is using the port:  ${port}`);
})