# Next.js Web App boilerplate ⚛️

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [Tompero's Furnace](https://tompero.ifoodcorp.com.br/furnace)

## Contents

This boilerplate contains

- [TypeScript](https://www.typescriptlang.org/) support
- [Next.js 12+](https://nextjs.org/)
- [Developer Experience](https://rwondemand.atlassian.net/wiki/spaces/EN/pages/1546453329/RFC+-+Web+Applications#Developer-Experience)
  - [iFood Eslint + Prettier Config](https://code.ifoodcorp.com.br/ifood/frontend-engineering/ifood-lint)
  - [EditorConfig](https://editorconfig.org/)
  - [nvm support](https://nvm.sh)
  - [stylelint](https://code.ifoodcorp.com.br/ifood/frontend-engineering/ifood-lint/-/tree/master/packages/stylelint-config)
  - [conventional commit](https://rwondemand.atlassian.net/wiki/spaces/FRONT/pages/2246247499/Entendendo+o+universo+do+conventional-commits)
  - [lintstaged](https://rwondemand.atlassian.net/wiki/spaces/FRONT/pages/185696257/Configurando+linters+e+formatters+na+sua+aplica+o#B%C3%B4nus%3A-Husky-e-lint-staged)
  - [husky](https://github.com/typicode/husky)
- Testing setup with:
  - [Jest](https://jestjs.io/)
  - [Jest Axe](https://github.com/nickcolley/jest-axe)
  - [Testing Library](https://testing-library.com/)
- Trackings with [Aboyeur](https://code.ifoodcorp.com.br/ifood/frontend-engineering/aboyeur)
  - [Docs](https://code.ifoodcorp.com.br/ifood/frontend-engineering/aboyeur/-/tree/main/pipelines/ifood-aboyeur-docs)
  - [TrackJs Plugin](https://code.ifoodcorp.com.br/ifood/frontend-engineering/aboyeur/-/blob/main/packages/trackjs-plugin/README.md)
  - [Faster Plugin](https://code.ifoodcorp.com.br/ifood/frontend-engineering/aboyeur/-/blob/main/packages/faster-plugin/README.md)
  - [Google Analytics Plugin](https://code.ifoodcorp.com.br/ifood/frontend-engineering/aboyeur/-/blob/main/packages/google-analytics-plugin/README.md)
- [iFood Design System](https://pomodoro-react.ifoodcorp.com.br/)
- [Error Boundary setup](https://pt-br.reactjs.org/docs/error-boundaries.html)
- [Internationalization](https://github.com/i18next/react-i18next)
- [Renovate bot](https://rwondemand.atlassian.net/wiki/spaces/FRONT/pages/2716729552/Integrando+o+Renovate+Bot+ao+seu+projeto)
- [SonarQube](https://rwondemand.atlassian.net/wiki/spaces/EN/pages/1611432216/SonarQube)
- [Axios](https://axios-http.com/)
- [Server Cache State](https://react-query.tanstack.com/)
- [Client side pipeline](https://code.ifoodcorp.com.br/ifood/pipelines/gitlab-pipelines/-/tree/main/pipelines/ifood-web-application)

## install

- [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install)

## Getting Started

First, setup your node version

```bash
nvm install
nvm use
```

Run yarn to install dependencies

```bash
yarn install
```

Start Fake backend:

```bash
# or
yarn start:fake
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

## SSR vs CSR vs SSG vs ISG

This boilerplate is agnostic to page rendering, but since we are using Next.js this boilerplate support every kind of [page rendering](https://developers.google.com/web/updates/2019/02/rendering-on-the-web):

- [Server Side Rendering: SSR](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#server-rendering)
- [Client Side Rendering: CSR](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#csr)
- [Static Site Generation: SSG](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#static-rendering)
- [Incremental Static Regeneration: ISG](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)

## CI/CD

If your want to dive deep in iFood front-end infrastructure please check [this article](https://rwondemand.atlassian.net/wiki/spaces/FRONT/pages/2724397067/Infrastructure?atlOrigin=eyJpIjoiMjQ1ZGFkZDQ4ZTQzNDNjY2EyZmI5YWQ5ODRkOGRkODgiLCJwIjoiY29uZmx1ZW5jZS1jaGF0cy1pbnQifQ).

Using iFood's standard pipelines and infrastructure we currently support these renderings:

### SSR

To deploy your application you must follow [ifood-server-side-web-application](https://code.ifoodcorp.com.br/ifood/pipelines/gitlab-pipelines/-/tree/main/pipelines/ifood-server-side-web-application)

**Examples**

- [Whitelabel](https://code.ifoodcorp.com.br/ifood/restaurant/whitelabel/whitelabel-webapp)
- [Self Sign In](https://code.ifoodcorp.com.br/ifood/restaurant/acquisition/ifood-next-self-sign-in-web-front)

### CSR and SSG

To deploy your static assets you must use [ifood-web-application pipeline](https://code.ifoodcorp.com.br/ifood/pipelines/gitlab-pipelines/-/tree/main/pipelines/ifood-web-application)

**Examples**

- [Partner Portal](https://code.ifoodcorp.com.br/ifood/restaurant/partner-portal-shared/partner-portal-web-front)
- [Order Manager](https://code.ifoodcorp.com.br/ifood/restaurant/order-manager/order-manager-reboot)
- [Developer Portal](https://code.ifoodcorp.com.br/ifood/restaurant/merchant-platform/developer-portal-front)

## Learn More

To learn more about iFood and Next.js, take a look at the following resources:

- [Web App RFC](https://rwondemand.atlassian.net/wiki/spaces/EN/pages/1546453329/RFC+-+Web+Applications) - our guide and standard on what a Web Application **must** follow at iFood.
- [iFood Front-end Ecosystem](https://rwondemand.atlassian.net/wiki/spaces/FRONT/overview) - learn everything about our ecosystem: user guides, initiatives, applications, libraries, roadmap, chapters, research (#innovation), etc. 🚀
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

You can check out our [#chapter-frontend](https://ifood.slack.com/archives/C79QBTH08) if you have questions - your feedback and contributions are welcome!
