var axios = require("axios");

export default function handler(req, res) {
  const locale = req.query.locale;

  const caracteres = req.query.caracteres;

  const keywords = req.query.keywords;

  const midiaSocial = req.query.midiaSocial;

  const topic = req.query.topic || "";
  if (topic.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um tipo válido",
      },
    });
    return;
  }

  var prompt = "";

  if (locale == "en") {
    prompt = `Topic: SEO tool to help e-commerces\nKeywords: SEO,e-commerce\n12 ${midiaSocial} ads (maximum ${caracteres} characters): SEO tool that offers keyword analysis to optimize e-commerce content./ SEO tool that helps monitor and improve the ranking of e-commerce websites in search engines./SEO tool that helps identify errors in optimizing e-commerce content./SEO tool that provides detailed reports to help improve performance of e-commerces./SEO tool that helps to identify and fix SEO problems in e-commerces./SEO tool that offers recommendations to improve the structure and content of e-commerces./SEO tool that helps to generate optimized content for e-commerces./SEO tool that offers tools to help improve the loading speed of e-commerce pages./SEO tool that helps to optimize e-commerce URLs to improve ranking in search engines search anisms./SEO tool that offers competitor analysis to help improve e-commerce visibility. /SEO tool that helps monitor and improve the authority of e-commerce websites./SEO tool that offers optimization recommendations to help increase e-commerce traffic.\nTopic: ${topic}\nKeywords: ${keywords}\n12 ${midiaSocial} Ads (maximum ${caracteres} characters):`;
  } else if (locale == "es") {
    prompt = `Tema: Herramienta de SEO para ayudar a los comercios electrónicos\nPalabras clave: SEO, comercio electrónico\n12 Anuncios en ${midiaSocial} (máximo ${caracteres} caracteres): Herramienta de SEO que ofrece análisis de palabras clave para optimizar el contenido de comercio electrónico./ Herramienta de SEO que ayuda a monitorear y mejorar la clasificación del comercio electrónico sitios web en motores de búsqueda./Herramienta SEO que ayuda a identificar errores en la optimización de contenido de comercio electrónico./Herramienta SEO que proporciona informes detallados para ayudar a mejorar el rendimiento de los comercios electrónicos./Herramienta SEO que ayuda a identificar y solucionar problemas de SEO en comercios electrónicos. ./Herramienta SEO que ofrece recomendaciones para mejorar la estructura y contenido de los comercios electrónicos./Herramienta SEO que ayuda a generar contenido optimizado para comercios electrónicos./Herramienta SEO que ofrece herramientas para ayudar a mejorar la velocidad de carga de las páginas de comercio electrónico. /Herramienta SEO que ayuda a optimizar las URL de comercio electrónico para mejorar la clasificación en los motores de búsqueda search anisms./SEO herramienta que ofrece análisis de la competencia para ayudar a mejorar la visibilidad del comercio electrónico. /Herramienta de SEO que ayuda a monitorear y mejorar la autoridad de los sitios web de comercio electrónico./Herramienta de SEO que ofrece recomendaciones de optimización para ayudar a aumentar el tráfico de comercio electrónico.\nTema: ${topic}\nPalabras clave: ${keywords}\n12 Anuncios en ${midiaSocial} (máximo ${caracteres} caracteres):`
  } else {
    prompt = `Tópico: Ferramenta de SEO para ajudar e-commerces\nPalavras chaves: SEO,e-commerce\n12 Anúncios ${midiaSocial} (máximo ${caracteres} caracteres): Ferramenta de SEO que oferece análise de palavras-chave para otimizar os conteúdos de e-commerces./ Ferramenta de SEO que ajuda a monitorar e melhorar a classificação dos sites de e-commerces nos mecanismos de busca./Ferramenta de SEO que ajuda a identificar os erros de otimização do conteúdo de e-commerces./Ferramenta de SEO que oferece relatórios detalhados para ajudar a melhorar o desempenho de e-commerces./Ferramenta de SEO que ajuda a identificar e corrigir problemas de SEO em e-commerces./Ferramenta de SEO que oferece recomendações para melhorar a estrutura e o conteúdo de e-commerces./Ferramenta de SEO que ajuda a gerar conteúdo otimizado para e-commerces./Ferramenta de SEO que oferece ferramentas para ajudar a melhorar a velocidade de carregamento de páginas de e-commerces./Ferramenta de SEO que ajuda a otimizar URLs de e-commerces para melhorar o ranqueamento nos mecanismos de busca./Ferramenta de SEO que oferece análise de concorrência para ajudar a melhorar a visibilidade de e-commerces. /Ferramenta de SEO que ajuda a monitorar e melhorar a autoridade dos sites de e-commerces./Ferramenta de SEO que oferece recomendações de otimização para ajudar a aumentar o tráfego de e-commerces.\nTópico: ${topic}\nPalavras chaves: ${keywords}\n12 Anúncios ${midiaSocial} (máximo ${caracteres} caracteres): `;
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
