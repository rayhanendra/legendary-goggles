'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
// import { offsetLimitPagination } from '@apollo/client/utilities';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: 'https://wpe-hiring.tokopedia.net/graphql',
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    // fetchOptions: { cache: 'no-store' },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      // typePolicies: {
      //   Query: {
      //     fields: {
      //       // Note: this is needed for the pagination cache to work but it doesn't
      //       contact: offsetLimitPagination(),
      //     },
      //   },
      // },
    }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
