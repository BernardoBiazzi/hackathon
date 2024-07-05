import { useMerchant } from 'context/merchantContext';
import { useEffect, useState } from 'react';
import { generateStrategyPrompt } from 'services/service';

export const useGenerateStrategy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const { selectedMerchant } = useMerchant();

  useEffect(() => {
    generateStrategy();
  }, [selectedMerchant]);

  const generateStrategy = async () => {
    setData(null);
    setLoading(true);
    setError(null);

    try {
      const merchantId = selectedMerchant.merchant_id;
      const storedData = sessionStorage.getItem(`strategy_${merchantId}`);

      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        const result = await generateStrategyPrompt(selectedMerchant);
        setData(result);
        sessionStorage.setItem(`strategy_${merchantId}`, JSON.stringify(result));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    generateStrategy,
  };
};
