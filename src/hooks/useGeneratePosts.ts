import { useMerchant } from 'context/merchantContext';
import { useEffect, useState } from 'react';
import { generateImage, generatePrompt } from 'services/service';

export type ImageType = 'Feed' | 'Storie';

const useGeneratePosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagesData, setImagesData] = useState<any[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const { selectedMerchant } = useMerchant();

  useEffect(() => {
    setImagesData(null);
    setDescription(null);
  }, [selectedMerchant]);

  const generatePosts = async (type: ImageType, date: string, dish: string) => {
    setLoading(true);
    setError(null);
    setImagesData(null);
    setDescription(null);

    try {
      const promptResponse = await generatePrompt(selectedMerchant, date, dish);
      const prompt = promptResponse.prompt;

      console.log(promptResponse);

      const imagePromises = Array(4)
        .fill(null)
        .map(() => generateImage(prompt, type));

      const imageResponses = await Promise.all(imagePromises);
      const posts = imageResponses.map((imageResponse) => imageResponse.data[0]);

      setDescription(promptResponse.description);
      setImagesData(posts);
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    imagesData,
    description,
    generatePosts,
  };
};

export default useGeneratePosts;
