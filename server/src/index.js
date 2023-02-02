const express = require('express');
require('dotenv').config({path:`${__dirname}/.env`});

const { ConnectDB } = require('./repos/base.repo');
const { makeUserRoutes } = require('./routes/user.routes');
const { makeFileRoutes } = require('./routes/file.routes');
const { makeGroupRoutes } = require('./routes/group.routes');
const { createServices } = require('./configuration/setup')
const { Log } = require('./logging/logging');

const app = express();
const services = createServices();

app.use('/user', makeUserRoutes(services.user));
app.use('/file', makeFileRoutes(services.file));
app.use('/group', makeGroupRoutes(services.group));

console.log(process.env);

ConnectDB(process.env.DB_URI);
app.listen(process.env.PORT, () => {
  Log.info(`Server Listening on ${process.env.PORT}`);
});