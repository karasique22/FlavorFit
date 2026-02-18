/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** User activity level */
export const ActivityLevel = {
  ExtremelyActive: 'EXTREMELY_ACTIVE',
  LightlyActive: 'LIGHTLY_ACTIVE',
  ModeratelyActive: 'MODERATELY_ACTIVE',
  Sedentary: 'SEDENTARY',
  VeryActive: 'VERY_ACTIVE'
} as const;

export type ActivityLevel = typeof ActivityLevel[keyof typeof ActivityLevel];
export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  user: AuthUser;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  role: Role;
};

export type BodyMeasurements = {
  __typename?: 'BodyMeasurements';
  armCircumference?: Maybe<Scalars['Float']['output']>;
  chestMeasurement?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  thighCircumference?: Maybe<Scalars['Float']['output']>;
  waistCircumference?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CommentCreateInput = {
  content: Scalars['String']['input'];
  recipeId: Scalars['String']['input'];
};

export type CommentUpdateInput = {
  content: Scalars['String']['input'];
};

export type Courier = {
  __typename?: 'Courier';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  vehicleType: Scalars['String']['output'];
};

export type CreateIngredientInput = {
  defaultUnit?: InputMaybe<Unit>;
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** Price in cents */
  price: Scalars['Float']['input'];
};

export type CreateOrderInput = {
  items: Array<OrderItemInput>;
};

export type CreateRecipeIngredientInput = {
  amount: Scalars['Float']['input'];
  ingredientId: Scalars['String']['input'];
  unit?: Unit;
};

export type CreateRecipeInput = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  carbs?: InputMaybe<Scalars['Int']['input']>;
  cookTimeMinutes?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dietType?: InputMaybe<DietType>;
  difficulty?: Difficulty;
  fat?: InputMaybe<Scalars['Int']['input']>;
  fibers?: InputMaybe<Scalars['Int']['input']>;
  heroImage?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<Array<CreateRecipeIngredientInput>>;
  mealType?: InputMaybe<MealType>;
  prepTimeMinutes?: InputMaybe<Scalars['Int']['input']>;
  protein?: InputMaybe<Scalars['Int']['input']>;
  servings?: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
  steps?: InputMaybe<Array<CreateRecipeStepInput>>;
  tagNames?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateRecipeStepInput = {
  instruction: Scalars['String']['input'];
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

/** Dietary restriction or preference */
export const DietType = {
  Balanced: 'BALANCED',
  DairyFree: 'DAIRY_FREE',
  GlutenFree: 'GLUTEN_FREE',
  HighProtein: 'HIGH_PROTEIN',
  Keto: 'KETO',
  LowCarb: 'LOW_CARB',
  Paleo: 'PALEO',
  Vegan: 'VEGAN',
  Vegetarian: 'VEGETARIAN'
} as const;

export type DietType = typeof DietType[keyof typeof DietType];
/** Recipe difficulty level */
export const Difficulty = {
  Easy: 'EASY',
  Hard: 'HARD',
  Medium: 'MEDIUM'
} as const;

export type Difficulty = typeof Difficulty[keyof typeof Difficulty];
/** User gender */
export const Gender = {
  Female: 'FEMALE',
  Male: 'MALE',
  Other: 'OTHER'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];
export type Ingredient = {
  __typename?: 'Ingredient';
  defaultUnit: Unit;
  description?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Price in cents */
  price: Scalars['Int']['output'];
};

/** Type of meal (breakfast, lunch, dinner, etc.) */
export const MealType = {
  Breakfast: 'BREAKFAST',
  Dessert: 'DESSERT',
  Dinner: 'DINNER',
  Drink: 'DRINK',
  Lunch: 'LUNCH',
  Snack: 'SNACK'
} as const;

export type MealType = typeof MealType[keyof typeof MealType];
export type Mutation = {
  __typename?: 'Mutation';
  /** Create a comment on a recipe */
  createComment: Comment;
  /** Create a new ingredient in the catalog */
  createIngredient: Ingredient;
  createOrder: Order;
  /** Create a new recipe */
  createRecipe: Recipe;
  /** Delete a comment (own comments or admin) */
  deleteComment: Comment;
  /** Delete an ingredient from the catalog */
  deleteIngredient: Ingredient;
  /** Delete a recipe */
  deleteRecipe: Recipe;
  /** Authenticate user and return tokens */
  login: AuthResponse;
  /** Logout user and clear refresh token cookie */
  logout: Scalars['Boolean']['output'];
  /** Refresh access and refresh tokens using refresh token cookie */
  refreshTokens: AuthResponse;
  /** Register a new user account */
  register: AuthResponse;
  /** Toggle like on a recipe */
  toggleLike: ToggleLikeResponse;
  /** Update a comment (own comments or admin) */
  updateComment: Comment;
  /** Update an existing ingredient */
  updateIngredient: Ingredient;
  /** Update user profile and body measurements */
  updateProfile: User;
  /** Update an existing recipe */
  updateRecipe: Recipe;
};


export type MutationCreateCommentArgs = {
  input: CommentCreateInput;
};


export type MutationCreateIngredientArgs = {
  input: CreateIngredientInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationDeleteIngredientArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: AuthInput;
};


export type MutationRegisterArgs = {
  data: AuthInput;
};


export type MutationToggleLikeArgs = {
  recipeId: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['String']['input'];
  input: CommentUpdateInput;
};


export type MutationUpdateIngredientArgs = {
  id: Scalars['String']['input'];
  input: UpdateIngredientInput;
};


export type MutationUpdateProfileArgs = {
  measurements?: InputMaybe<UpdateBodyMeasurementsInput>;
  profile?: InputMaybe<UpdateProfileInput>;
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['String']['input'];
  input: UpdateRecipeInput;
};

/** Nutritional goal for the user */
export const NutritionalGoal = {
  Endurance: 'ENDURANCE',
  Maintenance: 'MAINTENANCE',
  MuscleGain: 'MUSCLE_GAIN',
  WeightGain: 'WEIGHT_GAIN',
  WeightLoss: 'WEIGHT_LOSS'
} as const;

export type NutritionalGoal = typeof NutritionalGoal[keyof typeof NutritionalGoal];
export type Order = {
  __typename?: 'Order';
  courier?: Maybe<Courier>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  orderItems: Array<OrderItem>;
  status: OrderStatus;
  /** Total price in cents */
  totalPrice: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['String']['output'];
  ingredient: Ingredient;
  /** Line total in cents */
  lineTotal: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  recipe?: Maybe<Recipe>;
  /** Unit price in cents */
  unitPrice: Scalars['Int']['output'];
};

export type OrderItemInput = {
  ingredientId: Scalars['String']['input'];
  quantity?: Scalars['Int']['input'];
};

/** Status of an order */
export const OrderStatus = {
  Canceled: 'CANCELED',
  Delivered: 'DELIVERED',
  Pending: 'PENDING',
  Processing: 'PROCESSING',
  Shipped: 'SHIPPED'
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
export type PaginatedRecipes = {
  __typename?: 'PaginatedRecipes';
  items: Array<Recipe>;
  totalCount: Scalars['Int']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  activityLevel?: Maybe<ActivityLevel>;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  bodyMeasurements: Array<BodyMeasurements>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['String']['output'];
  nutritionalGoal?: Maybe<NutritionalGoal>;
  socials?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Get currently authenticated user profile */
  currentUser: User;
  /** Get a single ingredient by ID (admin) */
  ingredient: Ingredient;
  /** Get all ingredients in the catalog (admin) */
  ingredients: Array<Ingredient>;
  myOrders: Array<Order>;
  /** Get a single recipe by ID (admin) */
  recipe: Recipe;
  /** Get a single recipe by slug (public) */
  recipeBySlug: Recipe;
  /** Get all recipes (public) */
  recipes: PaginatedRecipes;
  /** Get all users (admin only) */
  users: Array<User>;
};


export type QueryIngredientArgs = {
  id: Scalars['String']['input'];
};


export type QueryRecipeArgs = {
  id: Scalars['String']['input'];
};


export type QueryRecipeBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryRecipesArgs = {
  input: RecipesQueryInput;
};

export type Recipe = {
  __typename?: 'Recipe';
  author?: Maybe<User>;
  calories?: Maybe<Scalars['Int']['output']>;
  carbs?: Maybe<Scalars['Int']['output']>;
  cookTimeMinutes?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dietType?: Maybe<DietType>;
  difficulty: Difficulty;
  fat?: Maybe<Scalars['Int']['output']>;
  fibers?: Maybe<Scalars['Int']['output']>;
  heroImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  ingredients?: Maybe<Array<RecipeIngredient>>;
  likesCount: Scalars['Int']['output'];
  mealType?: Maybe<MealType>;
  prepTimeMinutes?: Maybe<Scalars['Int']['output']>;
  protein?: Maybe<Scalars['Int']['output']>;
  servings?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  steps?: Maybe<Array<RecipeStep>>;
  tags?: Maybe<Array<RecipeTag>>;
  title: Scalars['String']['output'];
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  amount: Scalars['Float']['output'];
  ingredient: Ingredient;
  unit: Unit;
};

export type RecipeStep = {
  __typename?: 'RecipeStep';
  instruction: Scalars['String']['output'];
  mediaUrl?: Maybe<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type RecipeTag = {
  __typename?: 'RecipeTag';
  tag: Tag;
};

export type RecipesQueryInput = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

/** User role in the system */
export const Role = {
  Admin: 'ADMIN',
  User: 'USER'
} as const;

export type Role = typeof Role[keyof typeof Role];
export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type ToggleLikeResponse = {
  __typename?: 'ToggleLikeResponse';
  liked: Scalars['Boolean']['output'];
};

/** Measurement unit for ingredients */
export const Unit = {
  Cup: 'CUP',
  Gram: 'GRAM',
  Kilogram: 'KILOGRAM',
  Liter: 'LITER',
  Milliliter: 'MILLILITER',
  Piece: 'PIECE',
  Tablespoon: 'TABLESPOON',
  Teaspoon: 'TEASPOON'
} as const;

export type Unit = typeof Unit[keyof typeof Unit];
export type UpdateBodyMeasurementsInput = {
  armCircumference?: InputMaybe<Scalars['Float']['input']>;
  chestMeasurement?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  thighCircumference?: InputMaybe<Scalars['Float']['input']>;
  waistCircumference?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateIngredientInput = {
  defaultUnit?: InputMaybe<Unit>;
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** Price in cents */
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProfileInput = {
  activityLevel?: InputMaybe<ActivityLevel>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  nutritionalGoal?: InputMaybe<NutritionalGoal>;
  socials?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateRecipeInput = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  carbs?: InputMaybe<Scalars['Int']['input']>;
  cookTimeMinutes?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dietType?: InputMaybe<DietType>;
  difficulty?: InputMaybe<Difficulty>;
  fat?: InputMaybe<Scalars['Int']['input']>;
  fibers?: InputMaybe<Scalars['Int']['input']>;
  heroImage?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<Array<CreateRecipeIngredientInput>>;
  mealType?: InputMaybe<MealType>;
  prepTimeMinutes?: InputMaybe<Scalars['Int']['input']>;
  protein?: InputMaybe<Scalars['Int']['input']>;
  servings?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  steps?: InputMaybe<Array<CreateRecipeStepInput>>;
  tagNames?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  role: Role;
};

export type LoginMutationVariables = Exact<{
  data: AuthInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'AuthUser', email: string } } };


export const LoginDocument = gql`
    mutation Login($data: AuthInput!) {
  login(data: $data) {
    accessToken
    user {
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;