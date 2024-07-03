// * ROTA PADRAO (um exemplo simples)
const express = require('express');
const router = express.Router();

const Petshop = require('../models/petshop');
const Product = require('../models/product');

const createSplitTransaction = require('../services/pagarme').createSplitTransaction;

// ROTA TESTE (quando acessar o "/")
router.get('/', async (req, res) => {
  try {
    res.json({ error: false, message: "Hello Word" })
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
})

// ROTA /PETSHOPS. QUANDO FOR ACESSADO, EXECUTA UMA FUNÇAO ASINCRONA
// retornar todas as petshops do banco de dados
router.get('/petshops', async (req, res) => {
  try {
    const petshops = await Petshop.find(); // funçao do mongoose para achar todas as petshops
    res.json({ error: false, petshops });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// buscando a petchop por id
router.get('/petshop/:id', async (req, res) => {
  try {
    const petshop = await Petshop.findById(req.params.id); // aqui eu recupero o id pelo paramentro que for passar na hora
    let products = await Product.find({ // ele vai buscar onde o petshop_id == id da petshop
      petshop_id: petshop._id,
    }).populate('petshop_id', 'recipient_id'); // populate (saval)

    res.json({ error: false, petshop: { ...petshop._doc, products } });// me retorna os dados da petshop (nao todos) e os produtos
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// rota para comprar
// nessa aqui ele nao faz direto ele usa a rota 8000. 
router.post('/purchase', async (req, res) => {
  try {
    const transaction = await createSplitTransaction(req.body); // ele vai passar tudo que vier da requisiçao
    res.json(transaction); // ela ja ta no padrao la em services
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
