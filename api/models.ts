/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRecipeInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  image?: string | null,
  cookTime?: number | null,
  cookTimeUnit?: CookTimeUnit | null,
  cookMethods?: Array< CookMethod | null > | null,
  prepTime?: number | null,
  prepTimeUnit?: CookTimeUnit | null,
  recipeCategoryId?: string | null,
  ingredients: Array< IngredientInput | null >,
  steps: Array< StepInput | null >,
  keywords?: Array< string | null > | null,
  servings?: number | null,
};

export enum CookTimeUnit {
  MINUTES = "MINUTES",
  HOURS = "HOURS",
}


export enum CookMethod {
  FRYING = "FRYING",
  BAKING = "BAKING",
  STEAMING = "STEAMING",
  ROASTING = "ROASTING",
  GRILLING = "GRILLING",
  SIMMERING = "SIMMERING",
  BROILING = "BROILING",
  POACHING = "POACHING",
  BLANCHING = "BLANCHING",
  BRAISING = "BRAISING",
  STEWING = "STEWING",
}


export type IngredientInput = {
  measurement: number,
  unit?: Unit | null,
  description: string,
};

export enum Unit {
  POUND = "POUND",
  GALLON = "GALLON",
  QUART = "QUART",
  CUP = "CUP",
  OUNCE = "OUNCE",
  PINT = "PINT",
  FLUID_CUP = "FLUID_CUP",
  FLUID_OUNCE = "FLUID_OUNCE",
  TABLESPOON = "TABLESPOON",
  TEASPOON = "TEASPOON",
  DASH = "DASH",
  PINCH = "PINCH",
}


export type StepInput = {
  order: number,
  instruction: string,
};

export type ModelRecipeConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  cookTime?: ModelFloatInput | null,
  cookTimeUnit?: ModelCookTimeUnitInput | null,
  cookMethods?: ModelCookMethodListInput | null,
  prepTime?: ModelFloatInput | null,
  prepTimeUnit?: ModelCookTimeUnitInput | null,
  recipeCategoryId?: ModelIDInput | null,
  keywords?: ModelStringInput | null,
  servings?: ModelIntInput | null,
  and?: Array< ModelRecipeConditionInput | null > | null,
  or?: Array< ModelRecipeConditionInput | null > | null,
  not?: ModelRecipeConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelCookTimeUnitInput = {
  eq?: CookTimeUnit | null,
  ne?: CookTimeUnit | null,
};

export type ModelCookMethodListInput = {
  eq?: Array< CookMethod | null > | null,
  ne?: Array< CookMethod | null > | null,
  contains?: CookMethod | null,
  notContains?: CookMethod | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Recipe = {
  __typename: "Recipe",
  id?: string,
  title?: string,
  description?: string | null,
  image?: string | null,
  cookTime?: number | null,
  cookTimeUnit?: CookTimeUnit | null,
  cookMethods?: Array< CookMethod | null > | null,
  prepTime?: number | null,
  prepTimeUnit?: CookTimeUnit | null,
  recipeCategoryId?: string | null,
  category?: Category,
  ingredients?:  Array<Ingredient | null >,
  steps?:  Array<Step | null >,
  keywords?: Array< string | null > | null,
  servings?: number | null,
  createdAt?: string,
  updatedAt?: string,
};

export type Category = {
  __typename: "Category",
  id?: string,
  name?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type Ingredient = {
  __typename: "Ingredient",
  measurement?: number,
  unit?: Unit | null,
  description?: string,
};

export type Step = {
  __typename: "Step",
  order?: number,
  instruction?: string,
};

export type UpdateRecipeInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  image?: string | null,
  cookTime?: number | null,
  cookTimeUnit?: CookTimeUnit | null,
  cookMethods?: Array< CookMethod | null > | null,
  prepTime?: number | null,
  prepTimeUnit?: CookTimeUnit | null,
  recipeCategoryId?: string | null,
  ingredients?: Array< IngredientInput | null > | null,
  steps?: Array< StepInput | null > | null,
  keywords?: Array< string | null > | null,
  servings?: number | null,
};

export type DeleteRecipeInput = {
  id?: string | null,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  name?: string | null,
};

export type DeleteCategoryInput = {
  id?: string | null,
};

export type SearchableRecipeFilterInput = {
  id?: SearchableIDFilterInput | null,
  title?: SearchableStringFilterInput | null,
  description?: SearchableStringFilterInput | null,
  image?: SearchableStringFilterInput | null,
  cookTime?: SearchableFloatFilterInput | null,
  prepTime?: SearchableFloatFilterInput | null,
  recipeCategoryId?: SearchableIDFilterInput | null,
  keywords?: SearchableStringFilterInput | null,
  servings?: SearchableIntFilterInput | null,
  and?: Array< SearchableRecipeFilterInput | null > | null,
  or?: Array< SearchableRecipeFilterInput | null > | null,
  not?: SearchableRecipeFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableFloatFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableRecipeSortInput = {
  field?: SearchableRecipeSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableRecipeSortableFields {
  id = "id",
  title = "title",
  description = "description",
  image = "image",
  cookTime = "cookTime",
  prepTime = "prepTime",
  recipeCategoryId = "recipeCategoryId",
  keywords = "keywords",
  servings = "servings",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableRecipeConnection = {
  __typename: "SearchableRecipeConnection",
  items?:  Array<Recipe | null > | null,
  nextToken?: string | null,
  total?: number | null,
};

export type ModelRecipeFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  cookTime?: ModelFloatInput | null,
  cookTimeUnit?: ModelCookTimeUnitInput | null,
  cookMethods?: ModelCookMethodListInput | null,
  prepTime?: ModelFloatInput | null,
  prepTimeUnit?: ModelCookTimeUnitInput | null,
  recipeCategoryId?: ModelIDInput | null,
  keywords?: ModelStringInput | null,
  servings?: ModelIntInput | null,
  and?: Array< ModelRecipeFilterInput | null > | null,
  or?: Array< ModelRecipeFilterInput | null > | null,
  not?: ModelRecipeFilterInput | null,
};

export type ModelRecipeConnection = {
  __typename: "ModelRecipeConnection",
  items?:  Array<Recipe | null > | null,
  nextToken?: string | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items?:  Array<Category | null > | null,
  nextToken?: string | null,
};

export type CreateRecipeMutationVariables = {
  input?: CreateRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type CreateRecipeMutation = {
  createRecipe?:  {
    __typename: "Recipe",
    id: string,
    title: string,
    description?: string | null,
    image?: string | null,
    cookTime?: number | null,
    cookTimeUnit?: CookTimeUnit | null,
    cookMethods?: Array< CookMethod | null > | null,
    prepTime?: number | null,
    prepTimeUnit?: CookTimeUnit | null,
    recipeCategoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    ingredients:  Array< {
      __typename: "Ingredient",
      measurement: number,
      unit?: Unit | null,
      description: string,
    } | null >,
    steps:  Array< {
      __typename: "Step",
      order: number,
      instruction: string,
    } | null >,
    keywords?: Array< string | null > | null,
    servings?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRecipeMutationVariables = {
  input?: UpdateRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type UpdateRecipeMutation = {
  updateRecipe?:  {
    __typename: "Recipe",
    id: string,
    title: string,
    description?: string | null,
    image?: string | null,
    cookTime?: number | null,
    cookTimeUnit?: CookTimeUnit | null,
    cookMethods?: Array< CookMethod | null > | null,
    prepTime?: number | null,
    prepTimeUnit?: CookTimeUnit | null,
    recipeCategoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    ingredients:  Array< {
      __typename: "Ingredient",
      measurement: number,
      unit?: Unit | null,
      description: string,
    } | null >,
    steps:  Array< {
      __typename: "Step",
      order: number,
      instruction: string,
    } | null >,
    keywords?: Array< string | null > | null,
    servings?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRecipeMutationVariables = {
  input?: DeleteRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type DeleteRecipeMutation = {
  deleteRecipe?:  {
    __typename: "Recipe",
    id: string,
    title: string,
    description?: string | null,
    image?: string | null,
    cookTime?: number | null,
    cookTimeUnit?: CookTimeUnit | null,
    cookMethods?: Array< CookMethod | null > | null,
    prepTime?: number | null,
    prepTimeUnit?: CookTimeUnit | null,
    recipeCategoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    ingredients:  Array< {
      __typename: "Ingredient",
      measurement: number,
      unit?: Unit | null,
      description: string,
    } | null >,
    steps:  Array< {
      __typename: "Step",
      order: number,
      instruction: string,
    } | null >,
    keywords?: Array< string | null > | null,
    servings?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input?: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input?: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input?: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SearchRecipesQueryVariables = {
  filter?: SearchableRecipeFilterInput | null,
  sort?: SearchableRecipeSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
};

export type SearchRecipesQuery = {
  searchRecipes?:  {
    __typename: "SearchableRecipeConnection",
    items?:  Array< {
      __typename: "Recipe",
      id: string,
      title: string,
      description?: string | null,
      image?: string | null,
      cookTime?: number | null,
      cookTimeUnit?: CookTimeUnit | null,
      cookMethods?: Array< CookMethod | null > | null,
      prepTime?: number | null,
      prepTimeUnit?: CookTimeUnit | null,
      recipeCategoryId?: string | null,
      keywords?: Array< string | null > | null,
      servings?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    total?: number | null,
  } | null,
};

export type GetRecipeQueryVariables = {
  id?: string,
};

export type GetRecipeQuery = {
  getRecipe?:  {
    __typename: "Recipe",
    id: string,
    title: string,
    description?: string | null,
    image?: string | null,
    cookTime?: number | null,
    cookTimeUnit?: CookTimeUnit | null,
    cookMethods?: Array< CookMethod | null > | null,
    prepTime?: number | null,
    prepTimeUnit?: CookTimeUnit | null,
    recipeCategoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    ingredients:  Array< {
      __typename: "Ingredient",
      measurement: number,
      unit?: Unit | null,
      description: string,
    } | null >,
    steps:  Array< {
      __typename: "Step",
      order: number,
      instruction: string,
    } | null >,
    keywords?: Array< string | null > | null,
    servings?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRecipesQueryVariables = {
  filter?: ModelRecipeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecipesQuery = {
  listRecipes?:  {
    __typename: "ModelRecipeConnection",
    items?:  Array< {
      __typename: "Recipe",
      id: string,
      title: string,
      description?: string | null,
      image?: string | null,
      cookTime?: number | null,
      cookTimeUnit?: CookTimeUnit | null,
      cookMethods?: Array< CookMethod | null > | null,
      prepTime?: number | null,
      prepTimeUnit?: CookTimeUnit | null,
      recipeCategoryId?: string | null,
      keywords?: Array< string | null > | null,
      servings?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id?: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategorysQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategorysQuery = {
  listCategorys?:  {
    __typename: "ModelCategoryConnection",
    items?:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRecipeSubscription = {
  onCreateRecipe?:  {
    __typename: "Recipe",
    id: string,
    title: string,
    description?: string | null,
    image?: string | null,
    cookTime?: number | null,
    cookTimeUnit?: CookTimeUnit | null,
    cookMethods?: Array< CookMethod | null > | null,
    prepTime?: number | null,
    prepTimeUnit?: CookTimeUnit | null,
    recipeCategoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    ingredients:  Array< {
      __typename: "Ingredient",
      measurement: number,
      unit?: Unit | null,
      description: string,
    } | null >,
    steps:  Array< {
      __typename: "Step",
      order: number,
      instruction: string,
    } | null >,
    keywords?: Array< string | null > | null,
    servings?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRecipeSubscription = {
  onUpdateRecipe?:  {
    __typename: "Recipe",
    id: string,
    title: string,
    description?: string | null,
    image?: string | null,
    cookTime?: number | null,
    cookTimeUnit?: CookTimeUnit | null,
    cookMethods?: Array< CookMethod | null > | null,
    prepTime?: number | null,
    prepTimeUnit?: CookTimeUnit | null,
    recipeCategoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    ingredients:  Array< {
      __typename: "Ingredient",
      measurement: number,
      unit?: Unit | null,
      description: string,
    } | null >,
    steps:  Array< {
      __typename: "Step",
      order: number,
      instruction: string,
    } | null >,
    keywords?: Array< string | null > | null,
    servings?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRecipeSubscription = {
  onDeleteRecipe?:  {
    __typename: "Recipe",
    id: string,
    title: string,
    description?: string | null,
    image?: string | null,
    cookTime?: number | null,
    cookTimeUnit?: CookTimeUnit | null,
    cookMethods?: Array< CookMethod | null > | null,
    prepTime?: number | null,
    prepTimeUnit?: CookTimeUnit | null,
    recipeCategoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    ingredients:  Array< {
      __typename: "Ingredient",
      measurement: number,
      unit?: Unit | null,
      description: string,
    } | null >,
    steps:  Array< {
      __typename: "Step",
      order: number,
      instruction: string,
    } | null >,
    keywords?: Array< string | null > | null,
    servings?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
