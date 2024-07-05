/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { Flex, Heading, Tabs, Text } from '@ifood/pomodoro-components';
import { ChevronRight } from '@ifood/pomodoro-icons';
import ImageGeneration from 'components/imageGeneration';
import { Page } from 'components/page';
import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: left;

  justify-content: left;
  min-height: 100vh;
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

const PostGenerator: NextPage = () => {
  return (
    <Page
      title={'Gerador de publicações'}
      description={'Gere imagens para postar nas suas redes sociais e alavancar suas vendas'}
    >
      <Section>
        <Breadcrumb>
          <Link href="/">
            <Text>Ínicio</Text>
          </Link>
          <ChevronRight></ChevronRight>
          <Link href="/post-generator">
            <Text fontWeight="500">Gerador de publicações</Text>
          </Link>
        </Breadcrumb>

        <Flex flexDirection="column" mb="32px">
          <Heading as="h1" m="0">
            Gerador de publicações
          </Heading>
          <Text color="#717171">Gere imagens para postar nas suas redes sociais e alavancar suas vendas</Text>
        </Flex>

        <Tabs>
          <Tabs.Pane label="Feed">
            <ImageGeneration type="Feed" />
          </Tabs.Pane>
          <Tabs.Pane label="Stories">
            <ImageGeneration type="Storie" />
          </Tabs.Pane>
        </Tabs>
      </Section>
    </Page>
  );
};

export default PostGenerator;
