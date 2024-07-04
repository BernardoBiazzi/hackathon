import { Aboyeur } from '@ifood/aboyeur';
import { Button, Card, Flex, Heading, Text } from '@ifood/pomodoro-components';
import { Bomb } from 'components/bomb';
import { Page } from 'components/page';
import type { NextPage } from 'next';
import { useEffect } from 'react';
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
`;

const homeAboyeur = new Aboyeur('home', {
  pages: {
    /**
     * @when the user navigates to a page
     */
    view: () => ({
      label: 'pageview',
    }),
  },
  example: {
    /**
     * @when an example request was successful
     */
    request: (data: boolean) => ({
      label: 'request',
      metadata: { data },
    }),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation('home');
  const { error, data } = useQuery('example-request', getExample);

  useEffect(() => {
    if (!data) {
      return;
    }

    homeAboyeur.events.example.request(data.example);
  }, [data]);

  useEffect(() => {
    homeAboyeur.events.pages.view();
  }, []);

  if (error) {
    return <Bomb />;
  }

  return (
    <Page title={t('page.title')} description={t('page.description')}>
      <Container>
        <Section>
          <Heading as="h1">Gerador de social media</Heading>
          <Text>Gere imagens para postar nas suas redes sociais e alavancar suas vendas</Text>
          <Flex flexDirection="column" flexWrap="wrap"></Flex>
        </Section>
      </Container>
    </Page>
  );
};

export default Home;
