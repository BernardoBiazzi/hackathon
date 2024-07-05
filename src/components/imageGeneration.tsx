/* eslint-disable @next/next/no-img-element */
import { Button, DatePicker, Flex, Heading, Loading, Select, Text } from '@ifood/pomodoro-components';
import { EmojiHappyActive, EmojiSad, PlayFilled, Star } from '@ifood/pomodoro-icons';
import { useMerchant } from 'context/merchantContext';
import useGeneratePosts, { ImageType } from 'hooks/useGeneratePosts';
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type CardProps = {
  type: ImageType;
  imageUrl?: string;
};

const Post = styled.div<CardProps>`
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

const Form = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RegenerateButton = styled(Button)`
  display: flex;
  align-items: center;
  margin-left: 16px;
  gap: 8px;
`;

const DescriptionContainer = styled(Flex)`
  flex-direction: column;
  max-width: 60dvw;
`;

const CustomDatePicker = styled(DatePicker)`
  > div {
    width: 200px;
  }
`;

const ImageGeneration = ({ type }: { type: ImageType }) => {
  const { loading, error, imagesData, description, generatePosts } = useGeneratePosts();
  const cardRefs = useRef<(HTMLDivElement | null)[]>(new Array(4).fill(null));
  const { selectedMerchant } = useMerchant();

  const [date, setDate] = useState(`${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
  const [dish, setDish] = useState('Qualquer item');

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
  const descriptions = description ? description.split('\n\n') : ['A descrição vai ser gerada junto com a imagem'];
  const selectOptions = selectedMerchant.items.map((item) => {
    return { value: item.item_name, name: item.item_name };
  });

  const anyDishOption = { value: 'Qualquer item', name: 'Qualquer item' };
  selectOptions.unshift(anyDishOption);

  return (
    <div>
      <Flex alignItems="start" mb="32px" flexDirection="column">
        <Flex flexDirection="column" mb="48px">
          <Heading as="h1" mb="0" mt="16px" fontSize="24px" fontWeight="500">
            {imagesData ? 'Confira as publicações geradas' : `Publicações para o seu ${type}`}
          </Heading>
          <Text color="#717171">
            {imagesData
              ? 'Confira as publicações geradas e poste a que preferir'
              : 'Utilize o botão abaixo para gerar 4 sugestões de publicação'}
          </Text>
        </Flex>

        <Flex height="50px" alignItems="end">
          <Form>
            <CustomDatePicker
              value={date}
              onChange={(e) => setDate(e.target.value)}
              label="Data de publicação"
            ></CustomDatePicker>
            <Select
              label="Prato do cardápio"
              onChange={(e) => setDish(e.target.value)}
              value={{ name: dish, value: dish }}
              items={selectOptions}
            ></Select>
          </Form>

          <Flex>
            <RegenerateButton onClick={() => generatePosts(type, date, dish)}>
              <PlayFilled />
              {imagesData ? 'Gerar novas publicações' : 'Gerar publicações'}
            </RegenerateButton>

            <Flex alignItems="center" ml="24px">
              <Star color="#ea1d2c"></Star>
              <Text ml="8px">Você ainda possui 2 créditos</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <CardContainer type={type}>
        {imagesData &&
          imagesData.map((post, index) => (
            <Post
              key={index}
              type={type}
              imageUrl={post.url}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => handleSaveImage(index)}
            >
              <img className="ifood-logo" alt="imagem" src={ifoodUrl}></img>
              <img className="restaurant-logo" alt="imagem" src={selectedMerchant.site_logo_url}></img>
            </Post>
          ))}
        {loading &&
          [1, 2, 3, 4].map((_, index) => (
            <Post type={type} key={index}>
              <Loading variant="large" color="primary"></Loading>
            </Post>
          ))}
        {errorWithRequest &&
          [1, 2, 3, 4].map((_, index) => (
            <Post type={type} key={index}>
              <Flex width="60%" flexDirection="column" alignItems="center">
                <EmojiSad fontSize="100px" />
                <Text textAlign="center">Falha ao gerar publicação, tente novamente mais tarde</Text>
              </Flex>
            </Post>
          ))}
        {!imagesData &&
          !errorWithRequest &&
          !loading &&
          [1, 2, 3, 4].map((_, index) => (
            <Post type={type} key={index}>
              <Flex width="60%" flexDirection="column" alignItems="center">
                <EmojiHappyActive fontSize="100px" />
              </Flex>
            </Post>
          ))}
      </CardContainer>

      {type === 'Feed' && (
        <DescriptionContainer>
          <Heading mb="0" fontSize="24px">
            Descrição do Post
          </Heading>
          {descriptions.map((text, index) => {
            return (
              <Text key={index} mb="12px" color="#717171">
                {text.replaceAll('*', '')}
              </Text>
            );
          })}
        </DescriptionContainer>
      )}
    </div>
  );
};

export default ImageGeneration;
