// *SERVIDOR*
const express = require('express');
const app = express(); // invocando o construtor
const cors = require('cors'); // CONTROLE DE ACESSO
const morgan = require('morgan'); // CONTROLE DE REQUISIÇOES (um loger das requisiçoes )

// database
require('./database');

app.set('port', process.env.PORT || 8000); // CASO NAO TENHA UM DOTENV. VARIAVEL 'PORT'
app.use(cors()); // USANDO ESSES CARAS
app.use(morgan('dev')); // SO NO AMBIENTE DE DESENVOLVIMENTO
app.use(express.json()); // PEGAR O JSON

// usando as rotas
app.use('/', require('./routes/main.routes'));

// dizendo a porta que vai rodar
app.listen(app.get('port'), () => {
  console.log('Server is Up.');
});
