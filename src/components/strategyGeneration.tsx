/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { Card, Flex, Heading, Loading, Text } from '@ifood/pomodoro-components';
import { ChevronRight, EmojiSad } from '@ifood/pomodoro-icons';
import { useGenerateStrategy } from 'hooks/useGenerateStrategy';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  h1,
  h2,
  h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .influenciadores {
    margin: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const CustomCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;

  span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Influencers = styled.div`
  display: flex;
  margin-top: 24px;
  gap: 16px;

  img {
    width: 100%;
  }
`;

const StrategyGeneration = () => {
  const { data, loading, error } = useGenerateStrategy();

  return (
    <Container>
      <Breadcrumb>
        <Link href="/">
          <Text>Ínicio</Text>
        </Link>
        <ChevronRight></ChevronRight>
        <Link href="/post-generator">
          <Text fontWeight="500">Sugestões para alavancar</Text>
        </Link>
      </Breadcrumb>

      {loading && !data && (
        <Flex mt="48px">
          <Loading variant="large" color="primary"></Loading>
        </Flex>
      )}

      {error && !data && (
        <Flex width="60%" flexDirection="column" alignItems="center">
          <EmojiSad fontSize="100px" />
          <Text textAlign="center">Falha ao gerar estratégia, tente novamente mais tarde</Text>
        </Flex>
      )}

      {data && (
        <>
          <Heading as="h1">Estratégia de Postagens</Heading>

          <Section>
            <Heading as="h2">I) Estratégia Principal</Heading>
            <Text>{data.strategy.explicacao}</Text>
          </Section>

          <Section>
            <Heading as="h2">II) Tipos de Postagens</Heading>
            {Object.entries(data.strategy.tipos_de_postagens).map(([key, value]: any) => (
              <CustomCard key={key} marginBottom="16px">
                <Heading as="h3">{key}</Heading>
                <Text>
                  <strong>Objetivo:</strong> {value.Objetivo}
                </Text>
                <Text>
                  <strong>Formato:</strong> {value.Formato}
                </Text>
                <Text>
                  <strong>Impacto:</strong> {value.Impacto}
                </Text>
              </CustomCard>
            ))}
          </Section>

          <Section>
            <Heading as="h2">Cronograma de Postagens</Heading>
            {Object.entries(data.cronograma_de_postagens).map(([week, posts]: any) => (
              <Card key={week} marginBottom="24px">
                <Heading as="h3">{week}</Heading>
                {posts.map((post: any, index: number) => (
                  <CustomCard key={index}>
                    <Text>
                      <strong>Data de Publicação:</strong> {post['Data de Publicação']}
                    </Text>
                    <Text>
                      <strong>Horário Sugerido:</strong> {post['Horário Sugerido']}
                    </Text>
                    <Text>
                      <strong>Tipo de Postagem:</strong> {post['Tipo de Postagem']}
                    </Text>
                    <Text>
                      <strong>Descrição da Postagem:</strong> {post['Descrição da Postagem']}
                    </Text>
                  </CustomCard>
                ))}
              </Card>
            ))}
          </Section>

          <Heading className="influenciadores">Influenciadores</Heading>
          <Text>
            No mundo dinâmico do marketing digital, os influenciadores desempenham um papel crucial ao conectar
            restaurantes com seu público-alvo de maneira autêntica e envolvente. Ao colaborar com influenciadores
            locais, seu restaurante pode ganhar visibilidade, construir credibilidade e atrair novos clientes. Abaixo,
            destacamos alguns influenciadores da região que podem ajudar a amplificar sua presença online e elevar sua
            estratégia de marketing a um novo patamar.
          </Text>
          <Influencers>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Card key={index}>
                <img alt="influencer" src="https://cdn-icons-png.flaticon.com/512/3736/3736502.png"></img>
                <Text>Nome do influenciador</Text>
                <br />
                <Text>@influenciador</Text>
                <br />
                <Text>contato do influenciador</Text>
              </Card>
            ))}
          </Influencers>
        </>
      )}
    </Container>
  );
};

export default StrategyGeneration;
