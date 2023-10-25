const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const petshop = new Schema({
  nome: String,
  logo: String,
  categoria: String,
  destaque: Number,
  location: Object, // (lng e lat)
  recipient_id: String, // id desse recebedor
});

module.exports = mongoose.model('Petshop', petshop);
