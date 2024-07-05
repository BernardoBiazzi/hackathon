import { PomodoroProvider } from '@ifood/pomodoro-components';
import { MerchantProvider } from 'context/merchantContext';
import Head from 'next/head';
import styled from 'styled-components';

import { Navbar } from './navbar';

type PageProps = {
  title: string;
  description?: string;
};

const Main = styled.main`
  display: grid;
  grid-template-columns: 250px 1fr;
`;

const ChildrenContainer = styled.div`
  padding: 3rem 4rem;
  min-height: 100dvh;
  width: calc(100dvw - 270px);
`;

export const Page: React.FC<PageProps> = ({ children, title, description }) => {
  return (
    <PomodoroProvider>
      <MerchantProvider>
        <Head>
          <title>{title}</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta property="og:title" content={title} />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta charSet="UTF-8" />
          {description ? (
            <>
              <meta name="description" property="og:description" content={description} />
            </>
          ) : null}
        </Head>
        <Main>
          <Navbar></Navbar>
          <ChildrenContainer>{children}</ChildrenContainer>
        </Main>
      </MerchantProvider>
    </PomodoroProvider>
  );
};
