const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {user_router} = require("./router/users.router.js");
const path = require("path")

const app = express();
const PORT = 4000;

const corsOptions = {
    origin: '*'
};


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use('/',user_router);

app.listen(PORT, () => {
    console.log(`Server listening in PORT: ${PORT}`)
});