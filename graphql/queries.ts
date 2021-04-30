/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchRecipes = /* GraphQL */ `
  query SearchRecipes(
    $filter: SearchableRecipeFilterInput
    $sort: SearchableRecipeSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchRecipes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        title
        description
        image
        cookTime
        cookTimeUnit
        cookMethods
        prepTime
        prepTimeUnit
        recipeCategoryId
        keywords
        servings
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      description
      image
      cookTime
      cookTimeUnit
      cookMethods
      prepTime
      prepTimeUnit
      recipeCategoryId
      category {
        id
        name
        createdAt
        updatedAt
      }
      ingredients {
        measurement
        unit
        description
      }
      steps {
        order
        instruction
      }
      keywords
      servings
      createdAt
      updatedAt
    }
  }
`;
export const listRecipes = /* GraphQL */ `
  query ListRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        image
        cookTime
        cookTimeUnit
        cookMethods
        prepTime
        prepTimeUnit
        recipeCategoryId
        keywords
        servings
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
