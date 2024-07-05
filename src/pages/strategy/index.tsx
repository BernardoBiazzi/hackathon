import { Page } from 'components/page';
import StrategyGeneration from 'components/strategyGeneration';
import React from 'react';

const StrategyPage = () => {
  return (
    <Page
      title={'Gerador de publicações'}
      description={'Gere imagens para postar nas suas redes sociais e alavancar suas vendas'}
    >
      <StrategyGeneration />
    </Page>
  );
};

export default StrategyPage;
