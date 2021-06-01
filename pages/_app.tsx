import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
    return (
        <ApolloWrapper>
            <Component {...pageProps} />
        </ApolloWrapper>
    );
}

function ApolloWrapper({ children }: { children: React.ReactElement }) {
    const client = new ApolloClient({
        uri: "/api/graphql",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default MyApp
