/* eslint-disable @next/next/no-img-element */
import { Button, Flex, Heading, Text } from '@ifood/pomodoro-components';
import { PlayFilled } from '@ifood/pomodoro-icons';
import { Bomb } from 'components/bomb';
import useGenerateImages from 'hooks/useGenerateImages';
import html2canvas from 'html2canvas';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import merchants from '../mocks/merchants.json';

const CardCustom = styled.div`
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  position: relative;

  .generated-image {
    width: 100%;
    height: 100%;
  }

  .restaurant-logo {
    width: 20%;
    border-radius: 50px;
    bottom: 16px;
    right: 16px;
    position: absolute;
  }

  .ifood-logo {
    width: 16%;
    bottom: 16px;
    left: 16px;
    position: absolute;
  }

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
    pointer-events: none; /* Allow clicks to pass through the gradient */
  }
`;

const CardContainer = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const RegenerateButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeedGeneration = () => {
  const { loading, error, imagesData, generateImagesFromMerchant } = useGenerateImages();
  const cardRefs = useRef<(HTMLDivElement | null)[]>(new Array(4).fill(null));

  const merchant = merchants[4];

  useEffect(() => {
    generateImagesFromMerchant(merchant);
  }, []);

  const ifoodUrl = 'https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-01.png';
  const restaurantLogo =
    'https://img.freepik.com/vetores-premium/vetor-do-logotipo-do-burger-art-design_260747-248.jpg';

  const handleSaveImage = (index: number) => {
    const cardElement = cardRefs.current[index];
    if (cardElement) {
      html2canvas(cardElement, {
        scale: 1,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `captured-image-${index}.png`;
        link.click();
      });
    }
  };

  if (loading) return <Text>Loading...</Text>;

  console.log(imagesData);

  return (
    <>
      <Flex flexDirection="column" mb="32px">
        <Heading as="h1" mb="0" mt="16px" fontSize="24px" fontWeight="500">
          Confira as publicações geradas
        </Heading>
        <Text color="#717171">Confira as imagens geradas e selecioe a que preferir</Text>
      </Flex>
      <CardContainer>
        {imagesData &&
          imagesData.map((image, index) => (
            <CardCustom key={index} ref={(el) => (cardRefs.current[index] = el)} onClick={() => handleSaveImage(index)}>
              <img className="ifood-logo" alt="imagem" src={ifoodUrl}></img>
              <img className="restaurant-logo" alt="imagem" src={merchant.site_logo_url}></img>
              <img alt="imagem" className="generated-image" src={image.url}></img>
            </CardCustom>
          ))}
      </CardContainer>
      <Flex mt="24px">
        <RegenerateButton onClick={() => generateImagesFromMerchant(merchant)}>
          <PlayFilled />
          Gerar novamente
        </RegenerateButton>
      </Flex>
    </>
  );
};

export default FeedGeneration;
