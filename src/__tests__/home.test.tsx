import { screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Home from '../pages/index';
import * as services from '../services';
import { assertAboyeurEvent } from './utils';
import { renderWithProviders } from './wrappers';

const getExample = jest.spyOn(services, 'getExample');

afterEach(() => {
  getExample.mockClear();
});

describe('<Home />', () => {
  it('should have no a11y violations', async () => {
    getExample.mockResolvedValue({ example: true });

    const { container } = renderWithProviders(<Home />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should call every tracking accordingly', async () => {
    getExample.mockResolvedValue({ example: true });

    renderWithProviders(<Home />);

    const heading = screen.getByRole('heading', { name: /ifood/gi });
    expect(heading).toBeInTheDocument();

    await assertAboyeurEvent({ entity: 'home', feature: 'pages', label: 'pageview' });

    await assertAboyeurEvent({ entity: 'home', feature: 'example', label: 'request' });
  });
});
1;
