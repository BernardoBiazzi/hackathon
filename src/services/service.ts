/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ImageType } from 'hooks/useGeneratePosts';

const API_URL = 'https://generative-ai-platform.ifood-sandbox.com.br';
const REQUESTER_TOKEN =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBpcGUta2V5MDEifQ.eyJpYXQiOjE3MTk0MTQzMjYsImV4cCI6MTcyMTgzMzUyNiwiaXNzIjoiaUZvb2QtUGlwZWxpbmUiLCJlbnRpdHkiOiJhcHAiLCJwcm9qZWN0X3BhdGgiOiJpZm9vZC9kYXRhL21sLXBsYXRmb3JtL2dlbmVyYXRpdmUtYWkvZ2VuZXJhdGl2ZS1haS1wbGF0Zm9ybS1hcGkiLCJjaWNkIjoiR2l0TGFiIiwibGF5ZXIiOiJnZW4tcGxhdCIsImRlc2NyaXB0aW9uIjoiQmF0Y2ggY3JlYXRlZCB0b2tlbiBleGNlcHRpb25hbGx5IGZvciBIYWNraUZvb2QgR2VuQUkgMjAyNCBKdWx5LiBDcmVhdGVkIGJ5IHRyYWZmaWMgdGVhbSIsInN1YiI6ImhhY2tpZm9vZC1nZW5wbGF0LXRlYW0tMDU3In0.0MOBYDY0sMSNd4j7Txv3O4nEblkjy2YGwKjgUN4CbnLnzCE5-6O2EliOsefM6Y55PMzCicEuOW2kknRIFXLRcg';

const generateContent = (merchant: any, date: string, dish: string) => {
  return `Gere uma sugestão de post do instagram para o restaurante contido no json dessa mensagem. O post deve levar em consideração as informações do merchant, seu catalogo e a data de hoje ${date}. Caso seja uma grande data comemorativa no calendario brasileiro aplique um tema. Escolha ${dish}. Sua descrição deve conter Título, Descrição, Hashtags, Motivação do Post. Deve conter também o texto 'Venha nos conhecer ou faça seu pedido via App iFood'. Além disso deve conter um link para a página do catálogo do restaurante contido no paramêtro site_url do json. Utilize emojis. Nas Hastags, você deve incluir uma hashtag #iFoodEngajAI além de outras que sugerir. Na propriedade prompt você deve gerar as instruções para geração da imagem bem descritivo, de no máximo duas linhas, de uma imagem realista de um prato de comida, na qualidade de foto, apenas com os elementos que deve estar contido na imagem, com base no restaurante contido no json e na mensagem estruturada do post, a imagem não pode conter nenhum tipo de texto ou descrição. Sua resposta deve ser feita em formato json pronta para ser consumida no frontend da exata forma { prompt: STRING, description: STRING}. Json do Restaurante: ${JSON.stringify(
    merchant
  )}. (Na descrição, utilize quebra de linhas com \n)`;
};

export const generatePrompt = async (merchant: any, date: string, dish: string) => {
  const data = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: generateContent(merchant, date, dish),
      },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Requester-Token': REQUESTER_TOKEN,
    },
  };

  try {
    const response = await axios.post(`${API_URL}/api/v1/proxy/openai/v1/chat/completions`, data, config);
    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generateImageContent = (prompt: string, type: ImageType) => {
  return {
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: type == 'Feed' ? '1024x1024' : '1024x1792',
  };
};

export const generateImage = async (prompt: string, type: ImageType) => {
  const data = generateImageContent(prompt, type);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Requester-Token': REQUESTER_TOKEN,
      'X-Privacy-Filter': 'enabled',
    },
  };

  try {
    const response = await axios.post(`${API_URL}/api/v1/proxy/openai/v1/images/generations`, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generateStrategyContent = (merchant: any) => {
  return `{
    "Gere um plano de divulgação de posts no Instagram para os próximos 30 dias considerando o dia de hoje ${new Date().toISOString()}, para o restaurante contido no JSON a seguir. Leve em consideração as características do restaurante, seu catálogo, dias da semana e trends da internet. Sua resposta deve ser subdividida em 3 tópicos: I) Estratégia principal dos próximos trinta dias, explicando os motivadores. II) Explicação dos tipos de postagens. III) Cronograma de postagens. O seu cronograma de postagem deve conter: tipo de post, sugestão de horário e sugestão de temas. A seção de Explicação dos tipos de postagens deve seguir o exemplo: 'Customer Story (História de Cliente): { "Objetivo": "Criar uma conexão emocional com os seguidores", "Formato": "Depoimentos, fotos de clientes no restaurante", "Impacto": "Alta; gera engajamento e fidelização" }'. Faça um cronograma com no máximo 3 posts por semana, organizando as sugestões entre as semanas seguindo esse exemplo: 'Semana 1': [{ "Data de Publicação": "2024-08-05", "Horário Sugerido": "17:00", "Tipo de Postagem": "Destaque do Cardápio", "Descrição da Postagem": "Cheese Bacon - Clássico Imperdível" }]. Dê sua resposta em formato JSON pronta para ser consumida por um front end. JSON do restaurante: ${JSON.stringify(
    merchant
  )}. O retorno precisa ter apenas 2 propriedades no primeiro nível: "strategy" e "cronograma_de_postagens". A propriedade "strategy" deve conter um objeto com duas chaves: "explicacao" (string explicando a estratégia) e "tipos_de_postagens" (um objeto cujas chaves são os tipos de postagens e os valores são objetos contendo "Objetivo", "Formato" e "Impacto"). A propriedade "cronograma_de_postagens" deve ser um objeto cujas chaves são as semanas e os valores são arrays de objetos contendo "Data de Publicação", "Horário Sugerido", "Tipo de Postagem" e "Descrição da Postagem".
  }`;
};

export const generateStrategyPrompt = async (merchant: any) => {
  const data = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: generateStrategyContent(merchant),
      },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Requester-Token': REQUESTER_TOKEN,
    },
  };

  try {
    const response = await axios.post(`${API_URL}/api/v1/proxy/openai/v1/chat/completions`, data, config);
    console.log(JSON.parse(response.data.choices[0].message.content));
    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
