var axios = require("axios");

export default function handler(req, res) {
  const locale = req.query.locale;
  const numPalavras = req.query.numPalavras;
  const urlArtigo = req.query.urlArtigo;
  const nomeEmpresa = req.query.urlArtigo;
  const siteEmpresa = req.query.urlArtigo;

  var prompt = "";

  if (locale == "en") {
    prompt = `Write an SEO article with ${numPalavras} words based on the article ${urlArtigo} with a Hook, clickbait Title with the keyword at the beginning, introduction and bold the H2, H3 and H4 with the Conclusion. Make a connection with the ${nomeEmpresa} platform on the ${siteEmpresa} website in order to optimize the creation of B2B prospecting lists by collecting and crossing data in real time. Enter data and links to surveys and studies. Finish by inviting them to like, comment and share this content`;
  } else if (locale == "es") {
    prompt = `Escribe un artículo de SEO con ${numPalavras} palabras basadas en el artículo ${urlArtigo} con un gancho, título de clickbait con la palabra clave al principio, introducción y H2, H3 y H4 en negrita con la conclusión. Haz una conexión con la plataforma ${nomeEmpresa} en el sitio web de ${siteEmpresa} para optimizar la creación de listas de prospección B2B recolectando y cruzando datos en tiempo real. Introducir datos y enlaces a encuestas y estudios. Termine invitándolos a dar me gusta, comentar y compartir este contenido.`;
  } else {
    prompt = `Escreva um artigo de SEO com ${numPalavras} palavras usando como base o artigo ${urlArtigo} com um Gancho, Título clickbait com a palavra-chave no início, introdução e negrito o H2, H3 e H4 com a Conclusão. Faça um conexão com a plataforma ${nomeEmpresa} do site ${siteEmpresa} na otimização de criação de listas de prospecção B2B por ter uma coleta e cruzamento de dados em tempo real. Insira dados e links de pesquisas e estudos. Finalize fazendo um convite para curtir, comentar e compartilhar esse conteúdo.`;
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
