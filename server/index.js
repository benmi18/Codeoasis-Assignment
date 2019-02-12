const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRouter = require('./router/auth-router');
const deviceRouter = require('./router/device-router');
const infoRouter = require('./router/info-router');
const departmentRouter = require('./router/department-router');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.port || 3000);

app.use(cors());

app.use('/auth', authRouter);
app.use('/device', deviceRouter);
app.use('/info', infoRouter);
app.use('/department', departmentRouter);

app.listen(app.get('port'), () =>
  console.log(`Server runing on port ${app.get('port')}`)
);
