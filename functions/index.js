const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/users');

const app = express();
app.use(cors());

app.use('/', userRoute);

exports.users = functions.https.onRequest(app);
