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

  const product = req.query.product || "";
  if (product.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um resumo válido",
      },
    });
    return;
  }

  const tom = req.query.tom || "";
  if (tom.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um resumo válido",
      },
    });
    return;
  }

  const keywords = req.query.keywords;
  const productDescription = req.query.productDescription;

  var prompt = "";

  if (locale == "en") {
    prompt = `Company name: Saad Moda\nProduct name: Saad Leather Bag\nKeywords: Bag,Accessories\nProduct features: Luxurious,Brand\nSpeaking tone: Neutral\n3 Descriptions for the product (300 characters each): The Saad Leather Bag is a luxurious and sophisticated item that will add a touch of elegance to your look. With an impeccable finish and high-quality materials, this bag is a true brand that combines style and practicality./ With the Saad Leather Bag, you will have a fashion accessory that is synonymous with quality and refinement. This bag is perfect for women looking for products from renowned brands and who don't give up sophistication and practicality on a daily basis./The Saad Leather Bag is an investment in style and elegance that will last for years. As well as being a fashion item, this bag is a brand that represents the very best in terms of quality and design. With enough space to carry your belongings, this bag is a must-have accessory for modern and sophisticated women.\nCompany name: ${company}\nProduct name: ${product}\nKeywords: ${keywords}}\nProduct features: ${productDescription}\nTom of speech: ${tom}\n3 Descriptions for the product (300 characters each):`;
  } else if (locale == "es") {
    prompt = `Nombre de la empresa: Saad Moda\nNombre del producto: Saad Leather Bag\nPalabras clave: Bolso,Accesorios\nCaracterísticas del producto: Lujoso, Marca\nTono de conversación: Neutro\n3 Descripciones para el producto (300 caracteres cada uno): El Saad Leather Bag es un artículo lujoso y sofisticado que añadirá un toque de elegancia a tu look. Con un acabado impecable y materiales de alta calidad, este bolso es una auténtica marca que combina estilo y practicidad./ Con el Saad Leather Bag tendrás un complemento de moda sinónimo de calidad y refinamiento. Este bolso es perfecto para mujeres que buscan productos de marcas reconocidas y que no renuncian a la sofisticación y la practicidad en el día a día./El Saad Leather Bag es una inversión en estilo y elegancia que durará años. Además de ser un artículo de moda, este bolso es una marca que representa lo mejor en cuanto a calidad y diseño. Con espacio suficiente para llevar tus pertenencias, este bolso es un accesorio imprescindible para las mujeres modernas y sofisticadas.\nNombre de la empresa: ${company}\nNombre del producto: ${product}\nPalabras clave: ${keywords}}\nCaracterísticas del producto: ${productDescription}\nTom of speech: ${tom}\n3 Descripciones para el producto (300 caracteres cada uno):`;
  } else {
    prompt = `Nome da empresa: Saad Moda\nNome do produto: Bolsa de Couro Saad\nPalavras chaves: Bolsa,Acessórios\nCaracteristicas do produto: Luxuoso,Grife\nTom de fala: Neutro\n3 Descrições para o produto (300 caracteres cada): A Bolsa de Couro Saad é um item luxuoso e sofisticado que vai adicionar um toque de elegância ao seu visual. Com acabamento impecável e materiais de alta qualidade, essa bolsa é uma verdadeira grife que combina estilo e praticidade./Com a Bolsa de Couro Saad, você terá um acessório de moda que é sinônimo de qualidade e requinte. Essa bolsa é perfeita para mulheres que buscam por produtos de grifes renomadas e que não abrem mão de sofisticação e praticidade no dia a dia./A Bolsa de Couro Saad é um investimento em estilo e elegância que vai durar por anos. Além de ser um item de moda, essa bolsa é uma grife que representa o melhor em termos de qualidade e design. Com espaço suficiente para carregar seus pertences, essa bolsa é um acessório indispensável para mulheres modernas e sofisticadas.\nNome da empresa: ${company}\nNome do produto: ${product}\nPalavras chaves: ${keywords}}\nCaracteristicas do produto: ${productDescription}\nTom de fala: ${tom}\n3 Descrições para o produto (300 caracteres cada): `;
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
