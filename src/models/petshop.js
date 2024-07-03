// MODEL PETSHOPP
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petshop = new Schema({
  nome: String,
  logo: String,
  categoria: String,
  destaque: Number,
  location: Object,
  recipient_id: String, // ID DESSE RECEBEDOR PARA QUAND FOR PAGAMENTO
});

// Petshop o nome desse schema.
module.exports = mongoose.model('Petshop', petshop);
