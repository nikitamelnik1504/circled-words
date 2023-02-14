import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import type { NormalizedCacheObject } from "@apollo/client/core";

export default class CoreService {
  connection: ApolloClient<NormalizedCacheObject>;

  constructor() {
    const cache = new InMemoryCache();

    this.connection = new ApolloClient({
      cache,
      uri: "",
    });
  }

  async checkCircledAvailability() {
    return await this.connection.query({
      query: gql`
        query Circled {
          circled {
            tokenAddress
          }
        }
      `,
    });
  }
}
