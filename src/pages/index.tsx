import { Card, Flex, Heading, Text } from '@ifood/pomodoro-components';
import { ChevronRight, FourPeopleOutlined, PhotoOutlined, PlayFilled } from '@ifood/pomodoro-icons';
import { Page } from 'components/page';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: left;

  justify-content: left;
  min-height: 100vh;
`;

const CardCustom = styled(Card)`
  &:hover {
    cursor: pointer;
    filter: brightness(0.97);
  }
  svg path {
    color: #ea1d2c;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`;

const Home: NextPage = () => {
  const router = useRouter();

  const handleRedirectToGeneration = () => {
    router.push('/post-generator');
  };

  const handleRedirectToStrategy = () => {
    router.push('/strategy');
  };

  return (
    <Page
      title={'Gerador de social media'}
      description={'Gere imagens para postar nas suas redes sociais e alavancar suas vendas'}
    >
      <Section>
        <Flex flexDirection="column" mb="48px">
          <Heading as="h1" m="0">
            EngajAI
          </Heading>
          <Text color="#717171">
            Os Engajamentos são formas de ajudar seu restaurante a crescer e alcançar todos os públicos
          </Text>
        </Flex>

        <Flex flexDirection="column" mb="32px">
          <Heading as="h1" m="0" fontSize="24px" fontWeight="500">
            Turbine suas redes sociais
          </Heading>
          <Text color="#717171">Crie ou encontre o post ideal para cada público</Text>
        </Flex>

        <CardContainer>
          <CardCustom p="24px" onClick={handleRedirectToGeneration}>
            <PhotoOutlined fontSize="32px" />
            <Flex alignItems="center" justifyContent="space-between">
              <Heading m="0" as="h4" fontSize="20px" fontWeight="500">
                Criar post para suas redes sociais
              </Heading>
              <ChevronRight fontSize="24px" />
            </Flex>
            <Text fontSize="16px" lineHeight="24px" color="#717171">
              Gere através de inteligencia artificial o que vai para o seu Feed
            </Text>
          </CardCustom>

          <CardCustom p="24px" onClick={handleRedirectToStrategy}>
            <FourPeopleOutlined fontSize="32px" />
            <Flex alignItems="center" justifyContent="space-between">
              <Heading m="0" as="h4" fontSize="20px" fontWeight="500">
                Sugestões para alavancar
              </Heading>
              <ChevronRight fontSize="24px" />
            </Flex>
            <Text fontSize="16px" lineHeight="24px" color="#717171">
              Dicas para destacar seu restaurante nas redes sociais
            </Text>
          </CardCustom>
        </CardContainer>
      </Section>
    </Page>
  );
};

export default Home;
