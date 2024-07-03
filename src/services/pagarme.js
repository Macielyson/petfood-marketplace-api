// SERVIÇO DE PAGAMENTO.
// FAZ UMA REQUISIÇAO MANDANDO OS DADOS EM JSON E É RETORNADO UM JSON
const axios = require('axios'); // axios é tambem usando em backend
const api_key = require('../data/keys.json').api_key;

// essa porra so funcionou desse jeito. ver depois essa questao de autorizaçao.
const base64Credentials = Buffer.from(`${api_key}:`).toString('base64');//

const api = axios.create({
  baseURL: 'https://api.pagar.me/core/v5',
  headers: {
    'Authorization': `Basic ${base64Credentials}`,
    'Content-Type': 'application/json'
  }
});

// exportanto objeto com funçoes
module.exports = {
  // criar um recebedor, ele so ta passando o nome por enquanto para indetificar la no recebimento.
  // poderia colocar validaçoes mas o intuito nao é esse. 
  createRecipient: async (name) => {
    try {
      console.log("Nome:" + name);
      // aqui ele faz a chamada para /recipients e passando um objeto
      const response = await api.post('/recipients', {
        register_information: {
          company_name: name,
          trading_name: "Empresa LTDA",
          email: "jucilene@avengers.com",
          document: "77699131000133",
          type: "corporation",
          site_url: "http://www.site.com",
          annual_revenue: 1000000,
          corporation_type: "LTDA",
          founding_date: "2010-10-30",
          main_address: {
            street: "Av. General Justo",
            complementary: "Bloco A",
            street_number: "375",
            neighborhood: "Centro",
            city: "Rio de Janeiro",
            state: "RJ",
            zip_code: "20021130",
            reference_point: "Ao lado da banca de jornal"
          },
          phone_numbers: [
            {
              ddd: "21",
              number: "994647568",
              type: "mobile"
            }
          ],
          managing_partners: [
            {
              name: "Jucilene Dias",
              email: "jucilenedias@avengers.com",
              document: "26224451990",
              type: "individual",
              mother_name: "Maria claudia",
              birthdate: "1984-10-30T00:00:00",
              monthly_income: 120000,
              professional_occupation: "Vendedor",
              self_declared_legal_representative: true,
              address: {
                street: "Av. General Justo",
                complementary: "Bloco A",
                street_number: "375",
                neighborhood: "Centro",
                city: "Rio de Janeiro",
                state: "RJ",
                zip_code: "20021130",
                reference_point: "Ao lado da banca de jornal"
              },
              phone_numbers: [
                {
                  ddd: "27",
                  number: "999992628",
                  type: "mobile"
                }
              ]
            }
          ]
        },
        transfer_settings: {
          transfer_enabled: "false",
          transfer_interval: "Daily",
          transfer_day: 0
        },
        default_bank_account: {
          holder_name: name,
          holder_type: "individual",
          holder_document: "77699131000133",
          bank: "341",
          branch_number: "1234",
          branch_check_digit: "6",
          account_number: "12345",
          account_check_digit: "6",
          type: "checking"
        }
      });

      return { error: false, data: response.data };
    } catch (err) {
      return { error: true, message: err.message };
    }
  },

  // ele vai passar tudo meno o api_key
  createSplitTransaction: async (data) => { // ele vai receber tudo (json) do front 
    try {
      const response = await api.post('/orders', { // fazer a requisiçao transactions. mandando tudo e a chave
        api_key,
        ...data
      });
      return { error: false, data: response.data };
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
};
