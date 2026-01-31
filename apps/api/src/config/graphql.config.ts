import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export interface GraphQLContext {
  req: Request;
  res: Response;
}

export const getGraphQLConfig = async (
  configService: ConfigService,
): Promise<ApolloDriverConfig> => {
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
