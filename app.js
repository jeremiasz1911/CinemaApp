const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { notFound, catchErrors } = require('./middlewares/errors');
const { routes } = require('./routes/index.js');

const cors = require('cors')

const bodyParser = require('body-parser');

app.use(cors())

app.set('view engine', 'pug');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes config
app.use('/users', routes());

// errors handling
app.use(notFound);
app.use(catchErrors);

app.listen(8080, () => {
  console.log(`Server is up on port: 8080`);
});
