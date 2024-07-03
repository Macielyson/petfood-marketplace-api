// * CONEXAO COM BANCO
const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/petfood'; // nao precisa criar o banco de dados ele faz isso automaticamente

/* não precisa mais disso descontinuado
 mongoose.set('useNewUrlParser', true);
 mongoose.set('useFindAndModify', false);
 mongoose.set('useCreateIndex', true);
 mongoose.set('useUnifiedTopology', true);
 */
 mongoose.set('debug', true); //CONSEGUI VER OS COMANDOS POR TRAS (alterado, inserido, deletado no mongo)

 // MONGOOSE.CONECT É UMA PROMISE RETORNA UM THEN E CATCH
mongoose
  .connect(URI)
  .then(() => console.log('DB is up.'))
  .catch((err) => console.log("Erro: " + err));
