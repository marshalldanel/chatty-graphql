const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use('*', cors({ origin: 'http://localhost:3000' }));

const schema = require('./src/schema');

app.use('/graphql', bodyParser.json(), graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => console.log('Listening on 4000...'));
