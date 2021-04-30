/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe {
    onCreateRecipe {
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
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe {
    onUpdateRecipe {
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
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe {
    onDeleteRecipe {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
