require('dotenv').config();
const express = require('express');

const cors = require('cors');
const { FB } = require('./firebase/firebase');
const { makeUserRoutes } = require('./routes/user.routes');
const { makeFileRoutes } = require('./routes/file.routes');
const { makeGroupRoutes } = require('./routes/group.routes');
const { createServices } = require('./configuration/setup');
const { Log } = require('./logging/logging');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const services = createServices(FB);

app.use('/user', makeUserRoutes(services.user));
app.use('/file', makeFileRoutes(services.file));
app.use('/group', makeGroupRoutes(services.group));

app.listen(process.env.PORT, () => {
  Log.info(`Server Listening on ${process.env.PORT}`);
});