const express = require('express');
const conectarDB = require("./config/db");
const app = express();

conectarDB();

const PORT = process.env.PORT || 4000;

app.use(express.json({extended: true}));

app.use('/customer', require('./routes/customer'));
app.use('/api/v1/position', require('./routes/position'));
app.use('/api/v1/employee', require('./routes/employee'));

app.listen(PORT, () => {
    console.log(`The server is using the port:  ${PORT}`);
})