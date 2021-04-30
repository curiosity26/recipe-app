import { Amplify, API } from 'aws-amplify'
import { useMutation, useQueryClient } from 'react-query'
import {
  Category,
  CreateCategoryMutation,
  CreateRecipeMutation,
  DeleteCategoryMutation,
  DeleteRecipeInput,
  DeleteRecipeMutation,
  Recipe,
  UpdateCategoryMutation,
  UpdateRecipeMutation,
} from './models'
import {
  createCategory,
  createRecipe,
  deleteCategory,
  deleteRecipe,
  updateCategory,
  updateRecipe,
} from '../graphql/mutations'
import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api-graphql'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (category: Omit<Category, '__typename'>) => {
      const {
        data: { createCategory: createCategoryResult } = {},
      } = (await API.graphql({
        query: createCategory,
        variables: {
          input: category,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateCategoryMutation>

      return createCategoryResult
    },
    {
      onSuccess: async ({ id }) => {
        await queryClient.invalidateQueries('listCategories')
        await queryClient.invalidateQueries(['getCategory', id])
      },
    },
  )
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id, name }: Pick<Category, 'id' | 'name'>) => {
      const {
        data: { updateCategory: updateCategoryResult } = {},
      } = (await API.graphql({
        query: updateCategory,
        variables: {
          input: { id, name },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdateCategoryMutation>

      return updateCategoryResult
    },
    {
      onSuccess: async ({ id }) => {
        await queryClient.invalidateQueries('listCategories')
        await queryClient.invalidateQueries(['getCategory', id])
      },
    },
  )
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id }: Pick<Category, 'id'>) => {
      const {
        data: { deleteCategory: deleteCategoryResult } = {},
      } = (await API.graphql({
        query: deleteCategory,
        variables: {
          input: { id },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<DeleteCategoryMutation>

      return deleteCategoryResult
    },
    {
      onSuccess: () => queryClient.invalidateQueries('listCategories'),
    },
  )
}

export const useCreateRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({
      category,
      ...recipe
    }: Omit<Recipe, '__typename' | 'id' | 'createdAt' | 'updatedAt'>) => {
      const {
        data: { createRecipe: createRecipeResult },
      } = (await API.graphql({
        query: createRecipe,
        variables: {
          input: {
            ...recipe,
            recipeCategoryId: category?.id,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateRecipeMutation>

      return createRecipeResult
    },
    {
      onSuccess: ({ id }) => {
        Promise.all([
          queryClient.invalidateQueries('listRecipes'),
          queryClient.invalidateQueries('searchRecipes'),
          queryClient.invalidateQueries(['getRecipe', id]),
        ])
      },
    },
  )
}

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ category, ...recipe }: Omit<Recipe, '__typename'>) => {
      const input = { ...recipe, recipeCategoryId: category?.id }
      delete input.createdAt
      delete input.updatedAt

      const {
        data: { updateRecipe: updateRecipeResult },
      } = (await API.graphql({
        query: updateRecipe,
        variables: {
          input,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdateRecipeMutation>

      return updateRecipeResult
    },
    {
      onSuccess: ({ id }) => {
        Promise.all([
          queryClient.invalidateQueries('listRecipes'),
          queryClient.invalidateQueries('searchRecipes'),
          queryClient.invalidateQueries(['getRecipe', id]),
        ])
      },
    },
  )
}

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id }: Pick<Recipe, 'id'>) => {
      const input: DeleteRecipeInput = {
        id,
      }

      const {
        data: { deleteRecipe: deleteRecipeResult },
      } = (await API.graphql({
        query: deleteRecipe,
        variables: {
          input,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<DeleteRecipeMutation>

      return deleteRecipeResult
    },
    {
      onSuccess: ({ id }) => {
        Promise.all([
          queryClient.invalidateQueries('listRecipes'),
          queryClient.invalidateQueries('searchRecipes'),
          queryClient.invalidateQueries(['getRecipe', id]),
        ])
      },
    },
  )
}
