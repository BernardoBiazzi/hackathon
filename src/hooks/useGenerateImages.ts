import { useState } from 'react';
import { generateImage, generatePrompt } from 'services/service';

const useGenerateImages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagesData, setImagesData] = useState<any[] | null>(null);

  const generateImagesFromMerchant = async (merchant: any) => {
    setLoading(true);
    setError(null);
    setImagesData(null);

    try {
      const promptResponse = await generatePrompt(merchant);
      const prompt = promptResponse.choices[0].message.content;

      const imagePromises = Array(4)
        .fill(null)
        .map(() => generateImage(prompt));

      const imageResponses = await Promise.all(imagePromises);
      setImagesData(imageResponses.map((response) => response.data[0]));
    } catch (err) {
      console.log(err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    imagesData,
    generateImagesFromMerchant,
  };
};

export default useGenerateImages;
