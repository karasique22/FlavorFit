import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

import { GraphQLContext } from '../common/types/graphql.types';
export const getGraphQLConfig = (
  configService: ConfigService,
): ApolloDriverConfig => {
  const isDev = configService.get('NODE_ENV') !== 'production';

  return {
    autoSchemaFile: true,
    sortSchema: true,
    playground: false, // Используем Apollo Sandbox вместо старого Playground
    introspection: isDev, // Только в dev
    csrfPrevention: false, // Отключаем CSRF для dev (в prod лучше включить)
    context: ({ req, res }: GraphQLContext) => ({ req, res }),
    plugins: isDev ? [ApolloServerPluginLandingPageLocalDefault()] : [],
  };
};
