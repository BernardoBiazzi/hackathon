import { PomodoroProvider } from '@ifood/pomodoro-components';
import Head from 'next/head';

type PageProps = {
  title: string;
  description?: string;
};

export const Page: React.FC<PageProps> = ({ children, title, description }) => {
  return (
    <PomodoroProvider>
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
      <main>{children}</main>
    </PomodoroProvider>
  );
};
