// COM INTEGRAÇAO DE METOS DE PAGAMENTO.
const Petshop = require('../models/petshop');
const Product = require('../models/product');
const petshops = require('./petfood.json');

// petshop.json são os dados a serem iseridos no banco
// addPetshopAndProducts.js scrip para adicionar os dados no banco
// keys.json os dados da minha chave da api pagar.me
const createRecipients = require('../services/pagarme').createRecipient; // importa a funçao recipeit

require('../database'); // PARA INSERIR PRECISA DO BANCO


// TODA FUNÇAO ASSINCRONA TEM UM TRYCATCH
// cria o recebedor no pagarme. com id do recebedor ele cria a petsho e os produtos no banco de dados.
const addPetshopsAndProducts = async () => {
  try {
    // nesse escript ele nao inseri o recipente_id. entao ele apaga e cria esse outro de baixo.
    /* SCRIPT PARA ISERIR OS DAOS NO BANCO, SEM O PAGARME. 
        for (let petshop of petshops) {
          const newPetshop = await new Petshop(petshop).save(); // INSERIR AS PETSHOP
          await Product.insertMany( // insertMany INSERIR OS PRODUTOS DE UMA VEZ
            petshop.produtos.map((p) => ({ ...p, petshop_id: newPetshop._id }))
          );
        }*/

    for (let petshop of petshops) { // PERCORRE A PETSHOP
      const recipient = await createRecipients(petshop.nome); // passa o nome da petshop para funçao criar a petshop
      if (!recipient.error) { // se nao der error, ele entra
        const newPetshop = await new Petshop({ // cria a petshop com o recipient
          ...petshop,
          recipient_id: recipient.data.id,
        }).save();
        await Product.insertMany( // insere os produtos de uma ves na nova petshop
          petshop.produtos.map((p) => ({ ...p, petshop_id: newPetshop._id }))
        );
      } else { // se der erro no recipient ele mostra o erro.
        console.log(recipient.message);
      }
    }

    console.log('Final do Script');
  } catch (err) {
    console.log(err.message);
  }
};

addPetshopsAndProducts();
