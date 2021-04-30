/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    createRecipe(input: $input, condition: $condition) {
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
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
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
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
