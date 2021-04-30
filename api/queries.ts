import { InitialDataFunction, useInfiniteQuery, useQuery } from 'react-query'
import {
  Category,
  GetCategoryQuery,
  GetRecipeQuery,
  ListCategorysQuery,
  ListCategorysQueryVariables,
  ListRecipesQuery,
  ListRecipesQueryVariables,
  Recipe,
  SearchableRecipeFilterInput,
  SearchRecipesQuery,
  Unit,
} from './models'
import { Amplify, API } from 'aws-amplify'
import {
  getCategory,
  getRecipe,
  listCategorys,
  listRecipes,
  searchRecipes,
} from '../graphql/queries'
import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api-graphql'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)

export type UseListCategoriesOptions = Pick<
  ListCategorysQueryVariables,
  'filter' | 'limit'
>

export const useListCategories = ({
  filter,
  limit = 24,
}: UseListCategoriesOptions = {}) => {
  return useInfiniteQuery(
    ['listCategories', filter, limit],
    async (context) => {
      const {
        data: { listCategorys: listCategorysResult },
      } = (await API.graphql({
        query: listCategorys,
        variables: {
          filter,
          limit,
          nextToken: context.pageParam,
        },
      })) as GraphQLResult<ListCategorysQuery>

      return listCategorysResult
    },
    {
      getNextPageParam: ({ nextToken }) => nextToken,
      getPreviousPageParam: ({ nextToken }) => nextToken,
    },
  )
}

export const useGetCategory = (id: string) => {
  return useQuery(['getCategory', id], async () => {
    const {
      data: { getCategory: getCategoryResult },
    } = (await API.graphql({
      query: getCategory,
      variables: {
        id,
      },
    })) as GraphQLResult<GetCategoryQuery>

    return getCategoryResult
  })
}

export const useSearchRecipes = (query?: string, limit: number = 100) => {
  const lcQuery = `${query}`.toLowerCase()
  return useInfiniteQuery(
    ['searchRecipes', lcQuery, limit],
    async (context) => {
      const filter: SearchableRecipeFilterInput = {
        or: [
          { title: { wildcard: `*${lcQuery}*` } },
          { description: { wildcard: `*${lcQuery}*` } },
          { keywords: { wildcard: `*${lcQuery}*` } },
        ],
      }

      const {
        data: { searchRecipes: searchRecipesResult },
      } = (await API.graphql({
        query: searchRecipes,
        variables: {
          filter,
          limit,
          nextToken: context.pageParam,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<SearchRecipesQuery>

      return searchRecipesResult
    },
    {
      getNextPageParam: ({ nextToken }) => nextToken,
      getPreviousPageParam: ({ nextToken }) => nextToken,
    },
  )
}

export type UseListRecipes = Pick<ListRecipesQueryVariables, 'filter' | 'limit'>

export const useListRecipes = ({ filter, limit = 24 }: UseListRecipes = {}) => {
  return useInfiniteQuery(
    ['listRecipes', filter, limit],
    async (context): Promise<ListRecipesQuery['listRecipes'] | null> => {
      const {
        data: { listRecipes: listRecipesResult },
      } = (await API.graphql({
        query: listRecipes,
        variables: {
          filter,
          limit,
          nextToken: context.pageParam,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<ListRecipesQuery>

      return listRecipesResult
    },
    {
      getNextPageParam: ({ nextToken }) => nextToken,
      getPreviousPageParam: ({ nextToken }) => nextToken,
    },
  )
}

export const useGetRecipe = ({
  id,
  throwIfNotFound = false,
}: Pick<Recipe, 'id'> & { readonly throwIfNotFound?: boolean }) => {
  return useQuery(
    ['getRecipe', id],
    async (): Promise<Recipe | null> => {
      if (!id) {
        if (throwIfNotFound) {
          throw new Error('No ID provided')
        }

        return {
          ingredients: [
            {
              measurement: 1,
              unit: Unit.CUP,
              description: '',
            },
          ],
          steps: [{ order: 0, instruction: '' }],
        } as Recipe
      }
      const { data: { getRecipe: getRecipesResult } = {} } = (await API.graphql(
        {
          query: getRecipe,
          variables: {
            id,
          },
        },
      )) as GraphQLResult<GetRecipeQuery>

      return getRecipesResult
    },
    {
      initialData: {
        ingredients: [
          {
            measurement: 1,
            unit: Unit.CUP,
            description: '',
          },
        ],
        steps: [{ order: 0, instruction: '' }],
      } as Recipe,
    },
  )
}
