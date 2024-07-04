import { Button, EmptyState } from '@ifood/pomodoro-components';
import { useTranslation } from 'react-i18next';
import { createGlobalStyle } from 'styled-components';

import { Page } from './page';

export const CustomStyles = createGlobalStyle`
  html,
  div#__next,
  main,
  body {
    height: 100%;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export function UnexpectedError() {
  const { t } = useTranslation('error');
  function handleClick() {
    window.location.href = '/';
  }

  const title = t('unexpected.title');
  const description = t('unexpected.description');

  return (
    <>
      <CustomStyles />
      <Page title={title} description={description}>
        <EmptyState title={title} description={description}>
          <Button onClick={handleClick}>{t('unexpected.reload')}</Button>
        </EmptyState>
      </Page>
    </>
  );
}
