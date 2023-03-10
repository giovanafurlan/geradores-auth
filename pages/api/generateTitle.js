var axios = require("axios");

export default function handler(req, res) {
  const locale = req.query.locale;

  const keywords = req.query.keywords;

  const type = req.query.type || "";
  if (type.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um tipo válido",
      },
    });
    return;
  }

  var prompt = "";

  if (locale == "en") {
    prompt = `Keyword: Tea,Flavor\nType: Store\nTitle: Try Tea and Enjoy a Unique Experience!\nKeyword: ${keywords}\nType: ${type}\nTitle:`;
  } else if (locale == "es") {
    prompt = `Palabra clave: Té,Sabor\nTipo: Tienda\nTítulo: ¡Prueba el té y disfruta de una experiencia única!\nPalabra clave: ${keywords}\nTipo: ${type}\nTítulo:`;
  } else {
    prompt = `Palavra chave: Chá,Sabor\nTipo: Loja\nTítulo: Experimente o Chá e Desfrute de Uma Experiência Única!\nPalavra chave: ${keywords}\nTipo: ${type}\nTítulo: `;
  }

  var data = JSON.stringify({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  var config = {
    method: "post",
    url: "https://api.openai.com/v1/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "OpenAI-Organization": process.env.OPENAI_API_KEY_ORG,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
      console.log(JSON.stringify(response.data));
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: "An error occurred during your request.",
          },
        });
      }
    });
}
