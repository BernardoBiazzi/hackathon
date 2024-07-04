import { Card, Flex, Heading, Text } from '@ifood/pomodoro-components';
import { ChevronRight, FourPeopleOutlined, PhotoOutlined, PlayFilled } from '@ifood/pomodoro-icons';
import { Bomb } from 'components/bomb';
import { Page } from 'components/page';
import type { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getExample } from 'services';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem 2rem;
`;

const Section = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: left;

  justify-content: left;
  min-height: 100vh;
  padding: 50px;
  padding-top: 32px;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const Home: NextPage = () => {
  const { t } = useTranslation('home');
  const { error, data } = useQuery('example-request', getExample);
  const router = useRouter();

  console.log(data);

  if (error) {
    return <Bomb />;
  }

  const handleRedirectToGeneration = () => {
    router.push('/post-generator');
  };

  return (
    <Page title={t('page.title')} description={t('page.description')}>
      <Container>
        <Section>
          <Flex flexDirection="column" mb="48px">
            <Heading as="h1" m="0">
              Gerador de social media
            </Heading>
            <Text color="#717171">Gere imagens para postar nas suas redes sociais e alavancar suas vendas</Text>
          </Flex>

          <Flex flexDirection="column" mb="32px">
            <Heading as="h1" m="0" fontSize="24px" fontWeight="500">
              Turbine suas redes sociais
            </Heading>
            <Text color="#717171">Crie ou tenha ideias de publicações para seu estabelecimento</Text>
          </Flex>

          <CardContainer>
            <CardCustom p="24px" onClick={handleRedirectToGeneration}>
              <PhotoOutlined fontSize="32px" />
              <Flex alignItems="center" justifyContent="space-between">
                <Heading m="0" as="h4" fontSize="20px" fontWeight="500">
                  Criar post para o Feed
                </Heading>
                <ChevronRight fontSize="24px" />
              </Flex>
              <Text fontSize="16px" lineHeight="24px" color="#717171">
                Gere imagens para postar no feed do instagram
              </Text>
            </CardCustom>

            <CardCustom p="24px" onClick={handleRedirectToGeneration}>
              <PlayFilled fontSize="32px" />
              <Flex alignItems="center" justifyContent="space-between">
                <Heading m="0" as="h4" fontSize="20px" fontWeight="500">
                  Criar post para o Stories
                </Heading>
                <ChevronRight fontSize="24px" />
              </Flex>
              <Text fontSize="16px" lineHeight="24px" color="#717171">
                Gere imagens para postar no stories do instagram
              </Text>
            </CardCustom>

            <CardCustom p="24px">
              <FourPeopleOutlined fontSize="32px" />
              <Flex alignItems="center" justifyContent="space-between">
                <Heading m="0" as="h4" fontSize="20px" fontWeight="500">
                  Sugestões para alavancar
                </Heading>
                <ChevronRight fontSize="24px" />
              </Flex>
              <Text fontSize="16px" lineHeight="24px" color="#717171">
                Obtenha um guia atualizado sobre as tendencias sociais
              </Text>
            </CardCustom>
          </CardContainer>
        </Section>
      </Container>
    </Page>
  );
};

export default Home;
