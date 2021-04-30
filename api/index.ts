import {
  Category,
  GetRecipeQuery,
  GetRecipeQueryVariables,
  ListCategorysQuery,
  ListRecipesQuery,
  Recipe,
  SearchRecipesQuery,
} from './models'
import { withSSRContext, Logger } from 'aws-amplify'
import {
  listCategorys,
  listRecipes as listRecipesQuery,
  searchRecipes as searchRecipesQuery,
  getRecipe as getRecipeQuery,
} from '../graphql/queries'
import {
  GRAPHQL_AUTH_MODE,
  GraphQLAPIClass,
  GraphQLResult,
} from '@aws-amplify/api-graphql'
import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils'

export * from './models'

export type NextRequest = IncomingMessage & {
  cookies: NextApiRequestCookies
}

/** Authentication **/

export type User = {
  readonly id: string
  readonly username: string
  readonly attributes: {
    readonly email: string
    readonly email_verified: boolean
    readonly sub: string
  }
}

export const getCurrentUser = async (
  req: NextRequest,
): Promise<User | null> => {
  const SSR = withSSRContext({ req })
  return SSR.Auth.currentUserInfo()
}

export type Credentials = {
  readonly identityId: string
  readonly accessId?: string
  readonly secretAccessKey?: string
  readonly sessionToken?: string
  expiration?: Date
  authenticated: boolean
}

export const getCurrentCredentials = async (
  req: NextRequest,
): Promise<Credentials | null> => {
  const SSR = withSSRContext({ req })
  return SSR.Auth.currentCredentials()
}

/** Query Calls **/

export type ListCategories = {
  readonly categories: Category[] | null
  readonly nextToken?: string | null
  readonly errors: unknown | null
}

export const listCategories = async (
  req: NextRequest,
): Promise<ListCategories> => {
  const logger = new Logger('listCategories')
  const SSR = withSSRContext({ req })

  try {
    const {
      data: {
        listCategorys: { items: categories, nextToken },
      },
    } = (await SSR.API.graphql({
      query: listCategorys,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<ListCategorysQuery>

    return {
      categories,
      nextToken,
      errors: null,
    }
  } catch (e) {
    if (SSR.API.isCancel(e)) {
      logger.info('Request Cancelled')
      return {
        categories: [],
        nextToken: null,
        errors: null,
      }
    }

    logger.error(e)

    return {
      categories: null,
      nextToken: null,
      errors: e.errors,
    }
  }
}

export type ListRecipes = {
  readonly recipes?: Recipe[] | null
  readonly nextToken?: string | null
  readonly errors?: unknown
}

export const listRecipes = async (req: NextRequest): Promise<ListRecipes> => {
  const logger = new Logger('listRecipes')
  const SSR = withSSRContext({ req })

  try {
    const {
      data: {
        listRecipes: { items: recipes, nextToken },
      },
    } = (await SSR.API.graphql({
      query: listRecipesQuery,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<ListRecipesQuery>

    return {
      recipes,
      nextToken,
      errors: null,
    }
  } catch (e) {
    if (SSR.API.isCancel(e)) {
      logger.info('Request Cancelled')
      return {
        recipes: [],
        nextToken: null,
        errors: null,
      }
    }

    logger.error(e)

    return {
      recipes: null,
      nextToken: null,
      errors: e.errors,
    }
  }
}

export type SearchRecipes = {
  readonly recipes?: Recipe[] | null
  readonly nextToken?: string | null
  readonly total?: number
  readonly errors?: unknown
}

export const searchRecipes = async (
  req: NextRequest,
  query: string = '',
): Promise<SearchRecipes> => {
  const logger = new Logger('searchRecipes')
  const SSR = withSSRContext({ req })

  try {
    const {
      data: {
        searchRecipes: { items: recipes, nextToken, total },
      },
    } = (await SSR.API.graphql({
      query: searchRecipesQuery,
      variables: {
        title: { match: query },
        description: { match: query },
        keywords: { match: query },
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<SearchRecipesQuery>

    return {
      recipes,
      nextToken,
      total,
      errors: null,
    }
  } catch (e) {
    if (SSR.API.isCancel(e)) {
      logger.info('Request Cancelled')
      return {
        recipes: [],
        nextToken: null,
        errors: null,
      }
    }

    logger.error(e)

    return {
      recipes: null,
      nextToken: null,
      errors: e.errors,
    }
  }
}

export type GetRecipeProps = {
  readonly req: NextRequest
} & Required<Pick<Recipe, 'id'>>

export const getRecipe = async ({ req, id }: GetRecipeProps) => {
  const logger = new Logger('getRecipe')
  const SSR = withSSRContext({ req })
  const variables: GetRecipeQueryVariables = { id }

  try {
    const {
      data: { getRecipe: getRecipeResult },
    } = (await (SSR.API as GraphQLAPIClass).graphql({
      query: getRecipeQuery,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<GetRecipeQuery>

    return { recipe: getRecipeResult, errors: null }
  } catch (e) {
    logger.error(e)

    return { recipe: null, errors: e }
  }
}
