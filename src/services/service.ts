import axios from 'axios';

const API_URL = 'https://generative-ai-platform.ifood-sandbox.com.br';
const REQUESTER_TOKEN =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBpcGUta2V5MDEifQ.eyJpYXQiOjE3MTk0MTQzMjYsImV4cCI6MTcyMTgzMzUyNiwiaXNzIjoiaUZvb2QtUGlwZWxpbmUiLCJlbnRpdHkiOiJhcHAiLCJwcm9qZWN0X3BhdGgiOiJpZm9vZC9kYXRhL21sLXBsYXRmb3JtL2dlbmVyYXRpdmUtYWkvZ2VuZXJhdGl2ZS1haS1wbGF0Zm9ybS1hcGkiLCJjaWNkIjoiR2l0TGFiIiwibGF5ZXIiOiJnZW4tcGxhdCIsImRlc2NyaXB0aW9uIjoiQmF0Y2ggY3JlYXRlZCB0b2tlbiBleGNlcHRpb25hbGx5IGZvciBIYWNraUZvb2QgR2VuQUkgMjAyNCBKdWx5LiBDcmVhdGVkIGJ5IHRyYWZmaWMgdGVhbSIsInN1YiI6ImhhY2tpZm9vZC1nZW5wbGF0LXRlYW0tMDU3In0.0MOBYDY0sMSNd4j7Txv3O4nEblkjy2YGwKjgUN4CbnLnzCE5-6O2EliOsefM6Y55PMzCicEuOW2kknRIFXLRcg';

const generateContent = (merchant: any) => {
  return `{
    Gere um prompt descritivo de uma imagem realista de um prato de comida, na qualidade de foto, apenas com os elementos que deve estar contido na imagem, com base no restaurante contido no json a seguir: ${JSON.stringify(
      merchant
    )}. Considere também um tema de acordo com a data de hoje, 2024-03-07. Faça um prompt de no máximo duas linhas e que explicite que não pode ter texto na imagem.
  }`;
};

export const generatePrompt = async (merchant: any) => {
  const data = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: generateContent(merchant),
      },
    ],
    temperature: 0.7,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Requester-Token': REQUESTER_TOKEN,
    },
  };

  try {
    const response = await axios.post(`${API_URL}/api/v1/proxy/openai/v1/chat/completions`, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generateImageContent = (prompt: string) => {
  return {
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
  };
};

export const generateImage = async (prompt: string) => {
  const data = generateImageContent(prompt);

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
