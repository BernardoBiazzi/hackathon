import { useEffect } from 'react';

/**
 * This component is for Learning purposes only
 */
export const Bomb = () => {
  useEffect(() => {
    throw new Error('💣  Kabum 🧨 !!');
  }, []);

  return null;
};
