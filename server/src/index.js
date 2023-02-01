const express = require('express');
const { ConnectDB } = require('./repos/base.repo');
const { makeUserRoutes } = require('./routes/user.routes');
const { makeFileRoutes } = require('./routes/file.routes');
const { makeGroupRoutes } = require('./routes/group.routes');
const { DB_URI, PORT } = require('./configuration/config');
const { createServices } = require('./configuration/setup')
const { Log } = require('./logging/logging');

const app = express();
const services = createServices();

app.use('/user', makeUserRoutes(services.user));
app.use('/file', makeFileRoutes(services.file));
app.use('/group', makeGroupRoutes(services.group));

ConnectDB(DB_URI);

app.listen(PORT, () => {
  Log.info(`Server Listening on ${PORT}`);
});