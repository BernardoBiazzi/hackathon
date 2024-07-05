/* eslint-disable @next/next/no-img-element */
import { Button, EmptyState, Flex, Heading, Loading, Text } from '@ifood/pomodoro-components';
import { EmojiHappyActive, EmojiSad, PlayFilled } from '@ifood/pomodoro-icons';
import { Bomb } from 'components/bomb';
import useGenerateImages from 'hooks/useGenerateImages';
import html2canvas from 'html2canvas';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import merchants from '../mocks/merchants.json';

type CardProps = {
  type: ImageType;
  imageUrl?: string;
};

const CardCustom = styled.div<CardProps>`
  aspect-ratio: ${({ type }) => (type === 'Feed' ? '1' : '1080/1920')};
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  position: relative;
  ${({ imageUrl }) => (imageUrl ? `background-image: url("${imageUrl}");` : `background-color: #eaeaea;`)}
  background-size: cover;
  background-position: center;

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
    ${({ imageUrl }) => (imageUrl ? `background: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));` : '')}
    pointer-events: none; /* Allow clicks to pass through the gradient */
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div<CardProps>`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${({ type }) => (type == 'Feed' ? '300px' : '250px')}, 1fr));
  gap: 24px;
`;

const RegenerateButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type ImageType = 'Feed' | 'Storie';

const ImageGeneration = ({ type }: { type: ImageType }) => {
  const { loading, error, imagesData, generateImagesFromMerchant } = useGenerateImages();
  const cardRefs = useRef<(HTMLDivElement | null)[]>(new Array(4).fill(null));
  const merchant = merchants[7];

  const ifoodUrl = 'https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-01.png';

  const handleSaveImage = (index: number) => {
    const cardElement = cardRefs.current[index];
    if (cardElement) {
      html2canvas(cardElement, {
        scale: 4,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `captured-image-${index}.png`;
        link.click();
      });
    }
  };

  const errorWithRequest = error != null;

  return (
    <>
      <Flex flexDirection="column" mb="32px">
        <Heading as="h1" mb="0" mt="16px" fontSize="24px" fontWeight="500">
          {imagesData ? 'Confira as publicações geradas' : `Publicações para o seu ${type}`}
        </Heading>
        <Text color="#717171">
          {imagesData
            ? 'Confira as publicações geradas e poste a que preferir'
            : 'Utilize o botão abaixo para gerar 4 sugestões de publicação'}
        </Text>
      </Flex>

      <CardContainer type={type}>
        {imagesData &&
          imagesData.map((image, index) => (
            <CardCustom
              type={type}
              imageUrl={image.url}
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => handleSaveImage(index)}
            >
              <img className="ifood-logo" alt="imagem" src={ifoodUrl}></img>
              <img className="restaurant-logo" alt="imagem" src={merchant.site_logo_url}></img>
            </CardCustom>
          ))}
        {loading &&
          [1, 2, 3, 4].map((_, index) => (
            <CardCustom type={type} key={index}>
              <Loading variant="large" color="primary"></Loading>
            </CardCustom>
          ))}
        {errorWithRequest &&
          [1, 2, 3, 4].map((_, index) => (
            <CardCustom type={type} key={index}>
              <Flex width="60%" flexDirection="column" alignItems="center">
                <EmojiSad fontSize="100px" />
                <Text textAlign="center">Falha ao gerar publicação, tente novamente mais tarde</Text>
              </Flex>
            </CardCustom>
          ))}
        {!imagesData &&
          !errorWithRequest &&
          !loading &&
          [1, 2, 3, 4].map((_, index) => (
            <CardCustom type={type} key={index}>
              <Flex width="60%" flexDirection="column" alignItems="center">
                <EmojiHappyActive fontSize="100px" />
              </Flex>
            </CardCustom>
          ))}
      </CardContainer>

      <Flex mt="32px">
        <RegenerateButton onClick={() => generateImagesFromMerchant(merchant)}>
          <PlayFilled />
          {imagesData ? 'Gerar novas' : 'Gerar publicações'}
        </RegenerateButton>
      </Flex>
    </>
  );
};

export default ImageGeneration;
