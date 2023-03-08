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
    prompt = `Company name: Saad Moda\nProduct name: Saad Leather Bag\nKeywords: Bag,Accessories\nProduct features: Luxurious,Brand\nSpeaking tone: Neutral\n5 Descriptions for the product (maximum 250 characters each): The Saad leather bag is the perfect accessory for those seeking elegance and sophistication. Made with high quality materials and impeccable finish, it is a real luxury for any occasion./With a unique design and the high -embossed Saad brand, this leather bag is the right choice for those who want to always be in fashion. Its sophisticated and versatile style suits any look./A SAAD Bag is the ideal choice for those who value luxury and style. With its refined appearance and exquisite finish, it is an accessory that can not be missed in the wardrobe of those seeking elegance and exclusivity.//Stand out from the crowd with the luxurious Saad leather bag. This brand is ideal for any occasion and helps to complete your look in a unique way./Add a touch of luxury to your style with the Saad leather bag. Made with high-quality materials, you'll love this accessory's impeccable finish.\nCompany name: ${company}\nProduct name: ${product}\nKeywords: ${keywords}}\nProduct features: ${productDescription}\nTom of speech: ${tom}\n5 Descriptions for the product (maximum 250 characters each):`;
  } else if (locale == "es") {
    prompt = `Nombre de la empresa: Saad Moda\nNombre del producto: Saad Leather Bag\nPalabras clave: Bolso,Accesorios\nCaracterísticas del producto: Lujoso, Marca\nTono de conversación: Neutro\n5 Descripciones para el producto (máximo 250 caracteres cada uno): La bolsa de cuero Saad es el accesorio perfecto para aquellos que buscan elegancia y sofisticación. Hecho con materiales de alta calidad y acabado impecable, es un verdadero lujo para cualquier ocasión. Con un diseño único y la marca Saad de alta cubierta, esta bolsa de cuero es la opción correcta para aquellos que siempre desean estar de moda. Su estilo sofisticado y versátil se adapta a cualquier aspecto./La bolsa Saad es la opción ideal para aquellos que valoran el lujo y el estilo. Con su apariencia refinada y su exquisito acabado, es un accesorio que no se puede perder en el armario de aquellos que buscan elegancia y exclusividad.//Destaca entre la multitud con el lujoso bolso de cuero Saad. Esta marca es ideal para cualquier ocasión y ayuda a completar tu look de una manera única./Añade un toque de lujo a tu estilo con el bolso de piel Saad. Fabricado con materiales de alta calidad, te encantará el acabado impecable de este accesorio.\nNombre de la empresa: ${company}\nNombre del producto: ${product}\nPalabras clave: ${keywords}}\nCaracterísticas del producto: ${productDescription}\nTom of speech: ${tom}\n5 Descripciones para el producto (máximo 250 caracteres cada uno):`;
  } else {
    prompt = `Nome da empresa: Saad Moda\nNome do produto: Bolsa de Couro Saad\nPalavras chaves: Bolsa,Acessórios\nCaracteristicas do produto: Luxuoso,Grife\nTom de fala: Neutro\n5 Descrições para o produto (máximo 250 caracteres cada): A bolsa de couro Saad é o acessório perfeito para quem busca elegância e sofisticação. Feita com materiais de alta qualidade e acabamento impecável, ela é um verdadeiro luxo para qualquer ocasião./Com um design exclusivo e a grife Saad estampada em alto relevo, esta bolsa de couro é a escolha certa para quem quer estar sempre na moda. Seu estilo sofisticado e versátil combina com qualquer look./A bolsa Saad é a escolha ideal para quem valoriza o luxo e o estilo. Com sua aparência refinada e acabamento primoroso, ela é um acessório que não pode faltar no guarda-roupa de quem busca elegância e exclusividade./Se destaque na multidão com a luxuosa bolsa de couro Saad. Esta grife é ideal para qualquer ocasião e ajuda a compor seu look de maneira única./Adicione um toque de luxo ao seu estilo com a bolsa de couro Saad. Feita com materiais de alta qualidade, você vai adorar o acabamento impecável deste acessório.\nNome da empresa: ${company}\nNome do produto: ${product}\nPalavras chaves: ${keywords}}\nCaracteristicas do produto: ${productDescription}\nTom de fala: ${tom}\n5 Descrições para o produto (máximo 250 caracteres cada): `;
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
