var axios = require("axios");

export default function handler(req, res) {
  const locale = req.query.locale;

  const company = req.query.company || "";
  if (company.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira uma empresa válida",
      },
    });
    return;
  }

  const resume = req.query.resume || "";
  if (resume.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um resumo válido",
      },
    });
    return;
  }

  const audience = req.query.audience || "";
  if (audience.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira uma audiência válida",
      },
    });
    return;
  }

  const keywords = req.query.keywords;
  const avoidKeywords = req.query.avoidKeywords;

  const midiaSocial = req.query.midiaSocial;

  var prompt = "";

  if (locale == "en") {
    prompt = `Company Name: Google\nAudience: Young People\nSummary: American multinational technology company focusing on online advertising, search engine technology\nKeywords: Search,Online\nWords to avoid: Slow,Awful\n3 Descriptions ${midiaSocial} (maximum 90 characters each): Google is a company focused on search engines. Reach youth and get results with Google!/Explore Google's search engine to get results and reach youth more efficiently!/Google is an American multinational technology company focused on online advertising, search engine technology and digital products. Try Google products for young people!\nCompany name: ${company}\nAudience: ${audience}\nSummary: ${resume}\nKeywords: ${keywords}\nWords to avoid: ${avoidKeywords}\n3 Descriptions ${midiaSocial} (maximum 90 characters each):`;
  } else if (locale == "es") {
    prompt = `Nombre de la empresa: Google\nPúblico: jóvenes\nResumen: empresa multinacional de tecnología estadounidense que se centra en la publicidad en línea, la tecnología de motores de búsqueda\nPalabras clave: búsqueda, en línea\nPalabras que se deben evitar: lento, horrible\n3 Descripciones ${midiaSocial} (máximo 90 caracteres cada uno) : Google es una empresa enfocada en los motores de búsqueda. Llega a los jóvenes y obtén resultados con Google ¡Pruebe los productos de Google para jóvenes!\nNombre de la empresa: ${company}\nAudiencia: ${audience}\nResumen: ${resume}\nPalabras clave: ${keywords}\nPalabras que debe evitar: ${avoidKeywords}\n3 Descripciones ${midiaSocial} (máximo 90 caracteres cada uno):`;
  } else {
    prompt = `Nome da empresa: Google\nAudiência: Jovens\nResumo: empresa de tecnologia multinacional americana com foco em publicidade on-line, tecnologia de mecanismo de pesquisa\nPalavras chaves: Pesquisa,Online\nPalavras para evitar: Devagar,Horrível\n3 Descrições Anúncio ${midiaSocial} (máximo 90 caracteres cada):A Google é uma empresa focada em mecanismo de pesquisa. Alcance jovens e obtenha resultados com a Google!/Explore o mecanismo de pesquisa da Google para obter resultados e alcançar jovens com mais eficiência!/A Google é uma empresa de tecnologia multinacional americana com foco em publicidade on-line, tecnologia de mecanismo de pesquisa e produtos digitais. Experimente os produtos da Google para jovens!\nNome da empresa: ${company}\nAudiência: ${audience}\nResumo: ${resume}\nPalavras chaves: ${keywords}\nPalavras para evitar: ${avoidKeywords}\n3 Descrições Anúncio ${midiaSocial} (máximo 90 caracteres cada): `;
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
      console.log(JSON.stringify(response.data));
      console.log(data);
      res.status(200).json(response.data);
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
