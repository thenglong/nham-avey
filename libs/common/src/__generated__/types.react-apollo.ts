import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EnhancedDate: any;
};

export type AdminCreateRestaurantInput = {
  address: Scalars['String'];
  categories?: InputMaybe<Array<Scalars['String']>>;
  coverImageUrls?: InputMaybe<Array<Scalars['String']>>;
  logoImageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  vendorIds: Array<Scalars['String']>;
};

export type AdminUpdateRestaurantInput = {
  address?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  coverImageUrls?: InputMaybe<Array<Scalars['String']>>;
  logoImageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  restaurantId: Scalars['Float'];
  vendorIds?: InputMaybe<Array<Scalars['String']>>;
};

export type AllCategoriesOutput = {
  __typename?: 'AllCategoriesOutput';
  categories?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Category = {
  __typename?: 'Category';
  coverImageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['EnhancedDate'];
  id: Scalars['Float'];
  name: Scalars['String'];
  restaurantCount: Scalars['Int'];
  slug: Scalars['String'];
  updatedAt: Scalars['EnhancedDate'];
};

export type CreateAccountInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type CreateDishInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  options?: InputMaybe<Array<DishOptionInputType>>;
  price: Scalars['Int'];
  restaurantId: Scalars['Int'];
};

export type CreateDishOutput = {
  __typename?: 'CreateDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateOrderInput = {
  items?: InputMaybe<Array<CreateOrderItemInput>>;
  restaurantId: Scalars['Int'];
};

export type CreateOrderItemInput = {
  dishId: Scalars['Int'];
  options?: InputMaybe<Array<OrderItemOptionInputType>>;
};

export type CreateOrderOutput = {
  __typename?: 'CreateOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orderId?: Maybe<Scalars['Int']>;
};

export type CreatePaymentInput = {
  restaurantId: Scalars['Int'];
  transactionId: Scalars['String'];
};

export type CreatePaymentOutput = {
  __typename?: 'CreatePaymentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateRestaurantOutput = {
  __typename?: 'CreateRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurant?: Maybe<Restaurant>;
};

export type DeleteDishInput = {
  dishId: Scalars['Int'];
};

export type DeleteDishOutput = {
  __typename?: 'DeleteDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteRestaurantOutput = {
  __typename?: 'DeleteRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Dish = {
  __typename?: 'Dish';
  createdAt: Scalars['EnhancedDate'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  options?: Maybe<Array<DishOption>>;
  photo?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  restaurant?: Maybe<Restaurant>;
  updatedAt: Scalars['EnhancedDate'];
};

export type DishChoice = {
  __typename?: 'DishChoice';
  extra?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishChoiceInputType = {
  extra?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishOption = {
  __typename?: 'DishOption';
  choices?: Maybe<Array<DishChoice>>;
  extra?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishOptionInputType = {
  choices?: InputMaybe<Array<DishChoiceInputType>>;
  extra?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type EditDishInput = {
  description?: InputMaybe<Scalars['String']>;
  dishId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<DishOptionInputType>>;
  price?: InputMaybe<Scalars['Int']>;
};

export type EditDishOutput = {
  __typename?: 'EditDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditOrderInput = {
  id: Scalars['Float'];
  status: OrderStatus;
};

export type EditOrderOutput = {
  __typename?: 'EditOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetOrderInput = {
  id: Scalars['Float'];
};

export type GetOrderOutput = {
  __typename?: 'GetOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  order?: Maybe<Order>;
};

export type GetOrdersInput = {
  status?: InputMaybe<OrderStatus>;
};

export type GetOrdersOutput = {
  __typename?: 'GetOrdersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orders?: Maybe<Array<Order>>;
};

export type GetPaymentsOutput = {
  __typename?: 'GetPaymentsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  payments?: Maybe<Array<Payment>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminCreateRestaurant: CreateRestaurantOutput;
  adminUpdateRestaurant: UpdateRestaurantOutput;
  createAdmin: CreateAccountOutput;
  createDish: CreateDishOutput;
  createOrder: CreateOrderOutput;
  createPayment: CreatePaymentOutput;
  deleteDish: DeleteDishOutput;
  deleteRestaurant: DeleteRestaurantOutput;
  editDish: EditDishOutput;
  editOrder: EditOrderOutput;
  signUpCustomer: SignUpAccountOutput;
  signUpVendor: SignUpAccountOutput;
  takeOrder: TakeOrderOutput;
  updateMeAsAdmin: UpdateProfileOutput;
  updateMeAsCustomer: UpdateProfileOutput;
  updateMeAsVendor: UpdateProfileOutput;
  vendorCreateRestaurant: CreateRestaurantOutput;
  vendorUpdateRestaurant: UpdateRestaurantOutput;
};


export type MutationAdminCreateRestaurantArgs = {
  input: AdminCreateRestaurantInput;
};


export type MutationAdminUpdateRestaurantArgs = {
  input: AdminUpdateRestaurantInput;
};


export type MutationCreateAdminArgs = {
  input: CreateAccountInput;
};


export type MutationCreateDishArgs = {
  input: CreateDishInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationDeleteDishArgs = {
  input: DeleteDishInput;
};


export type MutationDeleteRestaurantArgs = {
  restaurantId: Scalars['Int'];
};


export type MutationEditDishArgs = {
  input: EditDishInput;
};


export type MutationEditOrderArgs = {
  input: EditOrderInput;
};


export type MutationSignUpCustomerArgs = {
  input: SignUpAccountInput;
};


export type MutationSignUpVendorArgs = {
  input: SignUpAccountInput;
};


export type MutationTakeOrderArgs = {
  input: TakeOrderInput;
};


export type MutationUpdateMeAsAdminArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateMeAsCustomerArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateMeAsVendorArgs = {
  input: UpdateProfileInput;
};


export type MutationVendorCreateRestaurantArgs = {
  input: VendorCreateRestaurantInput;
};


export type MutationVendorUpdateRestaurantArgs = {
  input: VendorUpdateRestaurantInput;
};

export type MyRestaurantOutput = {
  __typename?: 'MyRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurant?: Maybe<Restaurant>;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['EnhancedDate'];
  customer?: Maybe<User>;
  driver?: Maybe<User>;
  id: Scalars['Float'];
  items: Array<OrderItem>;
  restaurant?: Maybe<Restaurant>;
  status: OrderStatus;
  total?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['EnhancedDate'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['EnhancedDate'];
  dish: Dish;
  id: Scalars['Float'];
  options?: Maybe<Array<OrderItemOption>>;
  updatedAt: Scalars['EnhancedDate'];
};

export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  choice?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type OrderItemOptionInputType = {
  choice?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export enum OrderStatus {
  Cooked = 'Cooked',
  Cooking = 'Cooking',
  Delivered = 'Delivered',
  Pending = 'Pending',
  PickedUp = 'PickedUp'
}

export type OrderUpdatesInput = {
  id: Scalars['Float'];
};

export type PaginatedCategoryRestaurantOutput = {
  __typename?: 'PaginatedCategoryRestaurantOutput';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  hasPrevious?: Maybe<Scalars['Boolean']>;
  matchedCount?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
  pageCount?: Maybe<Scalars['Int']>;
  restaurants?: Maybe<Array<Restaurant>>;
};

export type PaginatedRestaurantsOutput = {
  __typename?: 'PaginatedRestaurantsOutput';
  error?: Maybe<Scalars['String']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  hasPrevious?: Maybe<Scalars['Boolean']>;
  matchedCount?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
  pageCount?: Maybe<Scalars['Int']>;
  restaurants?: Maybe<Array<Restaurant>>;
};

export type PaginatedUsersOutput = {
  __typename?: 'PaginatedUsersOutput';
  error?: Maybe<Scalars['String']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  hasPrevious?: Maybe<Scalars['Boolean']>;
  matchedCount?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
  pageCount?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<User>>;
};

export type Payment = {
  __typename?: 'Payment';
  createdAt: Scalars['EnhancedDate'];
  id: Scalars['Float'];
  restaurant: Restaurant;
  restaurantId: Scalars['Int'];
  transactionId: Scalars['String'];
  updatedAt: Scalars['EnhancedDate'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  adminGetRestaurants: PaginatedRestaurantsOutput;
  adminGetUsers: PaginatedUsersOutput;
  allCategories: AllCategoriesOutput;
  categoryRestaurantBySlug: PaginatedCategoryRestaurantOutput;
  getOrder: GetOrderOutput;
  getOrders: GetOrdersOutput;
  getPayments: GetPaymentsOutput;
  myRestaurantById: MyRestaurantOutput;
  myRestaurants: PaginatedRestaurantsOutput;
  pubicGetRestaurants: PaginatedRestaurantsOutput;
  publicGetRestaurantById: RestaurantOutput;
};


export type QueryAdminGetRestaurantsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryAdminGetUsersArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoryRestaurantBySlugArgs = {
  page?: InputMaybe<Scalars['Int']>;
  slug: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetOrderArgs = {
  input: GetOrderInput;
};


export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};


export type QueryMyRestaurantByIdArgs = {
  restaurantId: Scalars['Int'];
};


export type QueryMyRestaurantsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryPubicGetRestaurantsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryPublicGetRestaurantByIdArgs = {
  restaurantId: Scalars['Int'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Scalars['String'];
  categories?: Maybe<Array<Category>>;
  coverImageUrls?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['EnhancedDate'];
  id: Scalars['Float'];
  isPromoted: Scalars['Boolean'];
  logoImageUrl?: Maybe<Scalars['String']>;
  menu?: Maybe<Array<Dish>>;
  name: Scalars['String'];
  orders?: Maybe<Array<Order>>;
  promotedUntil?: Maybe<Scalars['EnhancedDate']>;
  updatedAt: Scalars['EnhancedDate'];
  vendors: Array<User>;
};

export type RestaurantOutput = {
  __typename?: 'RestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurant?: Maybe<Restaurant>;
};

export type SignUpAccountInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpAccountOutput = {
  __typename?: 'SignUpAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  signInToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  cookedOrders: Order;
  orderUpdates: Order;
  pendingOrders: Order;
};


export type SubscriptionOrderUpdatesArgs = {
  input: OrderUpdatesInput;
};

export type TakeOrderInput = {
  id: Scalars['Float'];
};

export type TakeOrderOutput = {
  __typename?: 'TakeOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateProfileInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UpdateProfileOutput = {
  __typename?: 'UpdateProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type UpdateRestaurantOutput = {
  __typename?: 'UpdateRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['EnhancedDate'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isVerified: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Order>>;
  payments?: Maybe<Array<Payment>>;
  photoURL?: Maybe<Scalars['String']>;
  restaurants?: Maybe<Array<Restaurant>>;
  rides?: Maybe<Array<Order>>;
  roles: Array<UserRole>;
  updatedAt: Scalars['EnhancedDate'];
};

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
  Driver = 'Driver',
  Vendor = 'Vendor'
}

export type VendorCreateRestaurantInput = {
  address: Scalars['String'];
  categories?: InputMaybe<Array<Scalars['String']>>;
  coverImageUrls?: InputMaybe<Array<Scalars['String']>>;
  logoImageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type VendorUpdateRestaurantInput = {
  address?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  coverImageUrls?: InputMaybe<Array<Scalars['String']>>;
  logoImageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  restaurantId: Scalars['Float'];
};

export type FullOrderPartsFragment = { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null };

export type RestaurantPartsFragment = { __typename?: 'Restaurant', id: number, name: string, coverImageUrls?: Array<string> | null, address: string, isPromoted: boolean, logoImageUrl?: string | null, categories?: Array<{ __typename?: 'Category', name: string, coverImageUrl?: string | null }> | null };

export type CategoryPartsFragment = { __typename?: 'Category', id: number, name: string, coverImageUrl?: string | null, slug: string, restaurantCount: number };

export type DishPartsFragment = { __typename?: 'Dish', id: number, name: string, price: number, photo?: string | null, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null }> | null }> | null };

export type OrderPartsFragment = { __typename?: 'Order', id: number, createdAt: any, total?: number | null };

export type UserPartsFragment = { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, isVerified: boolean, createdAt: any, photoURL?: string | null, roles: Array<UserRole> };

export type AdminCreateRestaurantMutationVariables = Exact<{
  input: AdminCreateRestaurantInput;
}>;


export type AdminCreateRestaurantMutation = { __typename?: 'Mutation', adminCreateRestaurant: { __typename?: 'CreateRestaurantOutput', error?: string | null, ok: boolean } };

export type AdminUpdateRestaurantMutationVariables = Exact<{
  input: AdminUpdateRestaurantInput;
}>;


export type AdminUpdateRestaurantMutation = { __typename?: 'Mutation', adminUpdateRestaurant: { __typename?: 'UpdateRestaurantOutput', error?: string | null, ok: boolean } };

export type CreateDishMutationVariables = Exact<{
  input: CreateDishInput;
}>;


export type CreateDishMutation = { __typename?: 'Mutation', createDish: { __typename?: 'CreateDishOutput', ok: boolean, error?: string | null } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderOutput', ok: boolean, error?: string | null, orderId?: number | null } };

export type DeleteRestaurantMutationVariables = Exact<{
  restaurantId: Scalars['Int'];
}>;


export type DeleteRestaurantMutation = { __typename?: 'Mutation', deleteRestaurant: { __typename?: 'DeleteRestaurantOutput', error?: string | null, ok: boolean } };

export type EditOrderMutationVariables = Exact<{
  input: EditOrderInput;
}>;


export type EditOrderMutation = { __typename?: 'Mutation', editOrder: { __typename?: 'EditOrderOutput', ok: boolean, error?: string | null } };

export type TakeOrderMutationVariables = Exact<{
  input: TakeOrderInput;
}>;


export type TakeOrderMutation = { __typename?: 'Mutation', takeOrder: { __typename?: 'TakeOrderOutput', ok: boolean, error?: string | null } };

export type AdminGetRestaurantsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type AdminGetRestaurantsQuery = { __typename?: 'Query', adminGetRestaurants: { __typename?: 'PaginatedRestaurantsOutput', error?: string | null, hasNext?: boolean | null, hasPrevious?: boolean | null, matchedCount?: number | null, ok: boolean, pageCount?: number | null, restaurants?: Array<{ __typename?: 'Restaurant', address: string, coverImageUrls?: Array<string> | null, createdAt: any, id: number, isPromoted: boolean, name: string, promotedUntil?: any | null, updatedAt: any, categories?: Array<{ __typename?: 'Category', restaurantCount: number, coverImageUrl?: string | null, createdAt: any, id: number, name: string, slug: string, updatedAt: any }> | null, vendors: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, isVerified: boolean, createdAt: any, photoURL?: string | null, roles: Array<UserRole> }> }> | null } };

export type AdminGetUsersQueryVariables = Exact<{
  role?: InputMaybe<UserRole>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type AdminGetUsersQuery = { __typename?: 'Query', adminGetUsers: { __typename?: 'PaginatedUsersOutput', error?: string | null, hasNext?: boolean | null, hasPrevious?: boolean | null, matchedCount?: number | null, ok: boolean, pageCount?: number | null, users?: Array<{ __typename?: 'User', createdAt: any, email: string, id: string, roles: Array<UserRole>, updatedAt: any, isVerified: boolean }> | null } };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', allCategories: { __typename?: 'AllCategoriesOutput', error?: string | null, ok: boolean, categories?: Array<{ __typename?: 'Category', coverImageUrl?: string | null, createdAt: any, id: number, name: string, restaurantCount: number, slug: string, updatedAt: any }> | null } };

export type GetOrderQueryVariables = Exact<{
  input: GetOrderInput;
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder: { __typename?: 'GetOrderOutput', ok: boolean, error?: string | null, order?: { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } | null } };

export type MyRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRestaurantsQuery = { __typename?: 'Query', myRestaurants: { __typename?: 'PaginatedRestaurantsOutput', ok: boolean, error?: string | null, restaurants?: Array<{ __typename?: 'Restaurant', id: number, name: string, coverImageUrls?: Array<string> | null, address: string, isPromoted: boolean, logoImageUrl?: string | null, categories?: Array<{ __typename?: 'Category', name: string, coverImageUrl?: string | null }> | null }> | null } };

export type CookedOrdersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CookedOrdersSubscription = { __typename?: 'Subscription', cookedOrders: { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } };

export type OrderUpdatesSubscriptionVariables = Exact<{
  input: OrderUpdatesInput;
}>;


export type OrderUpdatesSubscription = { __typename?: 'Subscription', orderUpdates: { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } };

export type PendingOrdersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PendingOrdersSubscription = { __typename?: 'Subscription', pendingOrders: { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } };

export const FullOrderPartsFragmentDoc = gql`
    fragment FullOrderParts on Order {
  id
  status
  total
  driver {
    email
  }
  customer {
    email
  }
  restaurant {
    name
  }
}
    `;
export const RestaurantPartsFragmentDoc = gql`
    fragment RestaurantParts on Restaurant {
  id
  name
  coverImageUrls
  address
  isPromoted
  logoImageUrl
  categories {
    name
    coverImageUrl
  }
}
    `;
export const CategoryPartsFragmentDoc = gql`
    fragment CategoryParts on Category {
  id
  name
  coverImageUrl
  slug
  restaurantCount
}
    `;
export const DishPartsFragmentDoc = gql`
    fragment DishParts on Dish {
  id
  name
  price
  photo
  description
  options {
    name
    extra
    choices {
      name
      extra
    }
  }
}
    `;
export const OrderPartsFragmentDoc = gql`
    fragment OrderParts on Order {
  id
  createdAt
  total
}
    `;
export const UserPartsFragmentDoc = gql`
    fragment UserParts on User {
  id
  firstName
  lastName
  email
  isVerified
  createdAt
  photoURL
  roles
}
    `;
export const AdminCreateRestaurantDocument = gql`
    mutation AdminCreateRestaurant($input: AdminCreateRestaurantInput!) {
  adminCreateRestaurant(input: $input) {
    error
    ok
  }
}
    `;
export type AdminCreateRestaurantMutationFn = Apollo.MutationFunction<AdminCreateRestaurantMutation, AdminCreateRestaurantMutationVariables>;

/**
 * __useAdminCreateRestaurantMutation__
 *
 * To run a mutation, you first call `useAdminCreateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateRestaurantMutation, { data, loading, error }] = useAdminCreateRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateRestaurantMutation, AdminCreateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateRestaurantMutation, AdminCreateRestaurantMutationVariables>(AdminCreateRestaurantDocument, options);
      }
export type AdminCreateRestaurantMutationHookResult = ReturnType<typeof useAdminCreateRestaurantMutation>;
export type AdminCreateRestaurantMutationResult = Apollo.MutationResult<AdminCreateRestaurantMutation>;
export type AdminCreateRestaurantMutationOptions = Apollo.BaseMutationOptions<AdminCreateRestaurantMutation, AdminCreateRestaurantMutationVariables>;
export const AdminUpdateRestaurantDocument = gql`
    mutation AdminUpdateRestaurant($input: AdminUpdateRestaurantInput!) {
  adminUpdateRestaurant(input: $input) {
    error
    ok
  }
}
    `;
export type AdminUpdateRestaurantMutationFn = Apollo.MutationFunction<AdminUpdateRestaurantMutation, AdminUpdateRestaurantMutationVariables>;

/**
 * __useAdminUpdateRestaurantMutation__
 *
 * To run a mutation, you first call `useAdminUpdateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateRestaurantMutation, { data, loading, error }] = useAdminUpdateRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateRestaurantMutation, AdminUpdateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateRestaurantMutation, AdminUpdateRestaurantMutationVariables>(AdminUpdateRestaurantDocument, options);
      }
export type AdminUpdateRestaurantMutationHookResult = ReturnType<typeof useAdminUpdateRestaurantMutation>;
export type AdminUpdateRestaurantMutationResult = Apollo.MutationResult<AdminUpdateRestaurantMutation>;
export type AdminUpdateRestaurantMutationOptions = Apollo.BaseMutationOptions<AdminUpdateRestaurantMutation, AdminUpdateRestaurantMutationVariables>;
export const CreateDishDocument = gql`
    mutation createDish($input: CreateDishInput!) {
  createDish(input: $input) {
    ok
    error
  }
}
    `;
export type CreateDishMutationFn = Apollo.MutationFunction<CreateDishMutation, CreateDishMutationVariables>;

/**
 * __useCreateDishMutation__
 *
 * To run a mutation, you first call `useCreateDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDishMutation, { data, loading, error }] = useCreateDishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDishMutation(baseOptions?: Apollo.MutationHookOptions<CreateDishMutation, CreateDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDishMutation, CreateDishMutationVariables>(CreateDishDocument, options);
      }
export type CreateDishMutationHookResult = ReturnType<typeof useCreateDishMutation>;
export type CreateDishMutationResult = Apollo.MutationResult<CreateDishMutation>;
export type CreateDishMutationOptions = Apollo.BaseMutationOptions<CreateDishMutation, CreateDishMutationVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    ok
    error
    orderId
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const DeleteRestaurantDocument = gql`
    mutation DeleteRestaurant($restaurantId: Int!) {
  deleteRestaurant(restaurantId: $restaurantId) {
    error
    ok
  }
}
    `;
export type DeleteRestaurantMutationFn = Apollo.MutationFunction<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;

/**
 * __useDeleteRestaurantMutation__
 *
 * To run a mutation, you first call `useDeleteRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRestaurantMutation, { data, loading, error }] = useDeleteRestaurantMutation({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *   },
 * });
 */
export function useDeleteRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>(DeleteRestaurantDocument, options);
      }
export type DeleteRestaurantMutationHookResult = ReturnType<typeof useDeleteRestaurantMutation>;
export type DeleteRestaurantMutationResult = Apollo.MutationResult<DeleteRestaurantMutation>;
export type DeleteRestaurantMutationOptions = Apollo.BaseMutationOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;
export const EditOrderDocument = gql`
    mutation editOrder($input: EditOrderInput!) {
  editOrder(input: $input) {
    ok
    error
  }
}
    `;
export type EditOrderMutationFn = Apollo.MutationFunction<EditOrderMutation, EditOrderMutationVariables>;

/**
 * __useEditOrderMutation__
 *
 * To run a mutation, you first call `useEditOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderMutation, { data, loading, error }] = useEditOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderMutation, EditOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderMutation, EditOrderMutationVariables>(EditOrderDocument, options);
      }
export type EditOrderMutationHookResult = ReturnType<typeof useEditOrderMutation>;
export type EditOrderMutationResult = Apollo.MutationResult<EditOrderMutation>;
export type EditOrderMutationOptions = Apollo.BaseMutationOptions<EditOrderMutation, EditOrderMutationVariables>;
export const TakeOrderDocument = gql`
    mutation takeOrder($input: TakeOrderInput!) {
  takeOrder(input: $input) {
    ok
    error
  }
}
    `;
export type TakeOrderMutationFn = Apollo.MutationFunction<TakeOrderMutation, TakeOrderMutationVariables>;

/**
 * __useTakeOrderMutation__
 *
 * To run a mutation, you first call `useTakeOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTakeOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [takeOrderMutation, { data, loading, error }] = useTakeOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTakeOrderMutation(baseOptions?: Apollo.MutationHookOptions<TakeOrderMutation, TakeOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TakeOrderMutation, TakeOrderMutationVariables>(TakeOrderDocument, options);
      }
export type TakeOrderMutationHookResult = ReturnType<typeof useTakeOrderMutation>;
export type TakeOrderMutationResult = Apollo.MutationResult<TakeOrderMutation>;
export type TakeOrderMutationOptions = Apollo.BaseMutationOptions<TakeOrderMutation, TakeOrderMutationVariables>;
export const AdminGetRestaurantsDocument = gql`
    query AdminGetRestaurants($page: Int, $q: String, $take: Int) {
  adminGetRestaurants(page: $page, q: $q, take: $take) {
    error
    hasNext
    hasPrevious
    matchedCount
    ok
    pageCount
    restaurants {
      address
      categories {
        restaurantCount
        coverImageUrl
        createdAt
        id
        name
        slug
        updatedAt
      }
      coverImageUrls
      createdAt
      id
      isPromoted
      name
      promotedUntil
      updatedAt
      vendors {
        ...UserParts
      }
    }
  }
}
    ${UserPartsFragmentDoc}`;

/**
 * __useAdminGetRestaurantsQuery__
 *
 * To run a query within a React component, call `useAdminGetRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetRestaurantsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      q: // value for 'q'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useAdminGetRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<AdminGetRestaurantsQuery, AdminGetRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetRestaurantsQuery, AdminGetRestaurantsQueryVariables>(AdminGetRestaurantsDocument, options);
      }
export function useAdminGetRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetRestaurantsQuery, AdminGetRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetRestaurantsQuery, AdminGetRestaurantsQueryVariables>(AdminGetRestaurantsDocument, options);
        }
export type AdminGetRestaurantsQueryHookResult = ReturnType<typeof useAdminGetRestaurantsQuery>;
export type AdminGetRestaurantsLazyQueryHookResult = ReturnType<typeof useAdminGetRestaurantsLazyQuery>;
export type AdminGetRestaurantsQueryResult = Apollo.QueryResult<AdminGetRestaurantsQuery, AdminGetRestaurantsQueryVariables>;
export const AdminGetUsersDocument = gql`
    query AdminGetUsers($role: UserRole, $q: String, $take: Int, $page: Int) {
  adminGetUsers(role: $role, q: $q, take: $take, page: $page) {
    error
    hasNext
    hasPrevious
    matchedCount
    ok
    pageCount
    users {
      createdAt
      email
      id
      roles
      updatedAt
      isVerified
    }
  }
}
    `;

/**
 * __useAdminGetUsersQuery__
 *
 * To run a query within a React component, call `useAdminGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetUsersQuery({
 *   variables: {
 *      role: // value for 'role'
 *      q: // value for 'q'
 *      take: // value for 'take'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAdminGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<AdminGetUsersQuery, AdminGetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetUsersQuery, AdminGetUsersQueryVariables>(AdminGetUsersDocument, options);
      }
export function useAdminGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetUsersQuery, AdminGetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetUsersQuery, AdminGetUsersQueryVariables>(AdminGetUsersDocument, options);
        }
export type AdminGetUsersQueryHookResult = ReturnType<typeof useAdminGetUsersQuery>;
export type AdminGetUsersLazyQueryHookResult = ReturnType<typeof useAdminGetUsersLazyQuery>;
export type AdminGetUsersQueryResult = Apollo.QueryResult<AdminGetUsersQuery, AdminGetUsersQueryVariables>;
export const AllCategoriesDocument = gql`
    query AllCategories {
  allCategories {
    categories {
      coverImageUrl
      createdAt
      id
      name
      restaurantCount
      slug
      updatedAt
    }
    error
    ok
  }
}
    `;

/**
 * __useAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
      }
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const GetOrderDocument = gql`
    query getOrder($input: GetOrderInput!) {
  getOrder(input: $input) {
    ok
    error
    order {
      ...FullOrderParts
    }
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const MyRestaurantsDocument = gql`
    query myRestaurants {
  myRestaurants {
    ok
    error
    restaurants {
      ...RestaurantParts
    }
  }
}
    ${RestaurantPartsFragmentDoc}`;

/**
 * __useMyRestaurantsQuery__
 *
 * To run a query within a React component, call `useMyRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<MyRestaurantsQuery, MyRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MyRestaurantsDocument, options);
      }
export function useMyRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyRestaurantsQuery, MyRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MyRestaurantsDocument, options);
        }
export type MyRestaurantsQueryHookResult = ReturnType<typeof useMyRestaurantsQuery>;
export type MyRestaurantsLazyQueryHookResult = ReturnType<typeof useMyRestaurantsLazyQuery>;
export type MyRestaurantsQueryResult = Apollo.QueryResult<MyRestaurantsQuery, MyRestaurantsQueryVariables>;
export const CookedOrdersDocument = gql`
    subscription cookedOrders {
  cookedOrders {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useCookedOrdersSubscription__
 *
 * To run a query within a React component, call `useCookedOrdersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCookedOrdersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCookedOrdersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCookedOrdersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CookedOrdersSubscription, CookedOrdersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CookedOrdersSubscription, CookedOrdersSubscriptionVariables>(CookedOrdersDocument, options);
      }
export type CookedOrdersSubscriptionHookResult = ReturnType<typeof useCookedOrdersSubscription>;
export type CookedOrdersSubscriptionResult = Apollo.SubscriptionResult<CookedOrdersSubscription>;
export const OrderUpdatesDocument = gql`
    subscription orderUpdates($input: OrderUpdatesInput!) {
  orderUpdates(input: $input) {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __useOrderUpdatesSubscription__
 *
 * To run a query within a React component, call `useOrderUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOrderUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderUpdatesSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables>(OrderUpdatesDocument, options);
      }
export type OrderUpdatesSubscriptionHookResult = ReturnType<typeof useOrderUpdatesSubscription>;
export type OrderUpdatesSubscriptionResult = Apollo.SubscriptionResult<OrderUpdatesSubscription>;
export const PendingOrdersDocument = gql`
    subscription pendingOrders {
  pendingOrders {
    ...FullOrderParts
  }
}
    ${FullOrderPartsFragmentDoc}`;

/**
 * __usePendingOrdersSubscription__
 *
 * To run a query within a React component, call `usePendingOrdersSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePendingOrdersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingOrdersSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePendingOrdersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PendingOrdersSubscription, PendingOrdersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PendingOrdersSubscription, PendingOrdersSubscriptionVariables>(PendingOrdersDocument, options);
      }
export type PendingOrdersSubscriptionHookResult = ReturnType<typeof usePendingOrdersSubscription>;
export type PendingOrdersSubscriptionResult = Apollo.SubscriptionResult<PendingOrdersSubscription>;