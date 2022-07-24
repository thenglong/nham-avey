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

export type AdminCreateCategoryInput = {
  coverImageUrl?: InputMaybe<Scalars['String']>;
  iconUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type AdminCreateCategoryOutput = {
  __typename?: 'AdminCreateCategoryOutput';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AdminCreateCityInput = {
  name: Scalars['String'];
  nameInKhmer?: InputMaybe<Scalars['String']>;
};

export type AdminCreateCityOutput = {
  __typename?: 'AdminCreateCityOutput';
  city?: Maybe<City>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AdminCreateRestaurantInput = {
  address?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  coverImageUrls?: InputMaybe<Array<Scalars['String']>>;
  logoImageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  vendorIds: Array<Scalars['String']>;
};

export type AdminUpdateCategoryInput = {
  categoryId: Scalars['Int'];
  coverImageUrl?: InputMaybe<Scalars['String']>;
  iconUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type AdminUpdateCategoryOutput = {
  __typename?: 'AdminUpdateCategoryOutput';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AdminUpdateCityInput = {
  cityId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  nameInKhmer?: InputMaybe<Scalars['String']>;
};

export type AdminUpdateCityOutput = {
  __typename?: 'AdminUpdateCityOutput';
  city?: Maybe<City>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
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

export type AdminUpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  photoURL?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<UserRole>>;
  userId: Scalars['String'];
};

export type AdminUpdateUserOutput = {
  __typename?: 'AdminUpdateUserOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AllCategoriesOutput = {
  __typename?: 'AllCategoriesOutput';
  categories?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AllCitiesOutput = {
  __typename?: 'AllCitiesOutput';
  cities?: Maybe<Array<City>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AllRestaurantsSlugOutput = {
  __typename?: 'AllRestaurantsSlugOutput';
  allCount?: Maybe<Scalars['Int']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  slugs?: Maybe<Array<Scalars['String']>>;
};

export type Category = {
  __typename?: 'Category';
  coverImageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['EnhancedDate'];
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  restaurantCount: Scalars['Int'];
  slug: Scalars['String'];
  updatedAt: Scalars['EnhancedDate'];
};

export type City = {
  __typename?: 'City';
  createdAt: Scalars['EnhancedDate'];
  id: Scalars['Float'];
  location?: Maybe<Location>;
  name: Scalars['String'];
  nameInKhmer?: Maybe<Scalars['String']>;
  restaurantCount: Scalars['Int'];
  slug: Scalars['String'];
  updatedAt: Scalars['EnhancedDate'];
};

export type CoreOutput = {
  __typename?: 'CoreOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateAccountInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  photoURL?: InputMaybe<Scalars['String']>;
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

export type DeleteAccountOutput = {
  __typename?: 'DeleteAccountOutput';
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

export type DishOutput = {
  __typename?: 'DishOutput';
  dish?: Maybe<Dish>;
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

export type Location = {
  __typename?: 'Location';
  createdAt: Scalars['EnhancedDate'];
  id: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  updatedAt: Scalars['EnhancedDate'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminCreateAdmin: CreateAccountOutput;
  adminCreateCategory: AdminCreateCategoryOutput;
  adminCreateCity: AdminCreateCityOutput;
  adminCreateDish: DishOutput;
  adminCreateRestaurant: RestaurantOutput;
  adminDeleteCategory: CoreOutput;
  adminDeleteCity: CoreOutput;
  adminDeleteDish: CoreOutput;
  adminDeleteUser: DeleteAccountOutput;
  adminUpdateCategory: AdminUpdateCategoryOutput;
  adminUpdateCity: AdminUpdateCityOutput;
  adminUpdateDish: DishOutput;
  adminUpdateRestaurant: RestaurantOutput;
  adminUpdateUser: AdminUpdateUserOutput;
  createOrder: CreateOrderOutput;
  createPayment: CreatePaymentOutput;
  deleteRestaurant: CoreOutput;
  driverSignUp: SignUpAccountOutput;
  takeOrder: TakeOrderOutput;
  updateMe: UpdateProfileOutput;
  updateOrder: EditOrderOutput;
  vendorCreateDish: DishOutput;
  vendorCreateRestaurant: RestaurantOutput;
  vendorDeleteDish: CoreOutput;
  vendorSignUp: SignUpAccountOutput;
  vendorUpdateDish: DishOutput;
  vendorUpdateRestaurant: RestaurantOutput;
};


export type MutationAdminCreateAdminArgs = {
  input: CreateAccountInput;
};


export type MutationAdminCreateCategoryArgs = {
  input: AdminCreateCategoryInput;
};


export type MutationAdminCreateCityArgs = {
  input: AdminCreateCityInput;
};


export type MutationAdminCreateDishArgs = {
  input: CreateDishInput;
};


export type MutationAdminCreateRestaurantArgs = {
  input: AdminCreateRestaurantInput;
};


export type MutationAdminDeleteCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationAdminDeleteCityArgs = {
  id: Scalars['Int'];
};


export type MutationAdminDeleteDishArgs = {
  id: Scalars['Int'];
};


export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationAdminUpdateCategoryArgs = {
  input: AdminUpdateCategoryInput;
};


export type MutationAdminUpdateCityArgs = {
  input: AdminUpdateCityInput;
};


export type MutationAdminUpdateDishArgs = {
  input: UpdateDishInput;
};


export type MutationAdminUpdateRestaurantArgs = {
  input: AdminUpdateRestaurantInput;
};


export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['Int'];
};


export type MutationDriverSignUpArgs = {
  input: SignUpAccountInput;
};


export type MutationTakeOrderArgs = {
  input: TakeOrderInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateOrderArgs = {
  input: EditOrderInput;
};


export type MutationVendorCreateDishArgs = {
  input: CreateDishInput;
};


export type MutationVendorCreateRestaurantArgs = {
  input: VendorCreateRestaurantInput;
};


export type MutationVendorDeleteDishArgs = {
  id: Scalars['Int'];
};


export type MutationVendorSignUpArgs = {
  input: SignUpAccountInput;
};


export type MutationVendorUpdateDishArgs = {
  input: UpdateDishInput;
};


export type MutationVendorUpdateRestaurantArgs = {
  input: VendorUpdateRestaurantInput;
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  createdAt: Scalars['EnhancedDate'];
  fridayHours?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  mondayHours?: Maybe<Scalars['String']>;
  saturdayHours?: Maybe<Scalars['String']>;
  sundayHours?: Maybe<Scalars['String']>;
  thursdayHours?: Maybe<Scalars['String']>;
  tuesdayHours?: Maybe<Scalars['String']>;
  updatedAt: Scalars['EnhancedDate'];
  wednesdayHours?: Maybe<Scalars['String']>;
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

export type PaginatedCategoryRestaurantsOutput = {
  __typename?: 'PaginatedCategoryRestaurantsOutput';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  hasPrevious?: Maybe<Scalars['Boolean']>;
  matchedCount?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
  pageCount?: Maybe<Scalars['Int']>;
  restaurants?: Maybe<Array<Restaurant>>;
};

export type PaginatedCityRestaurantsOutput = {
  __typename?: 'PaginatedCityRestaurantsOutput';
  city?: Maybe<City>;
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

export type PaginationCategoriesOutput = {
  __typename?: 'PaginationCategoriesOutput';
  categories?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  hasPrevious?: Maybe<Scalars['Boolean']>;
  matchedCount?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
  pageCount?: Maybe<Scalars['Int']>;
};

export type PaginationCitiesOutput = {
  __typename?: 'PaginationCitiesOutput';
  cities?: Maybe<Array<City>>;
  error?: Maybe<Scalars['String']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  hasPrevious?: Maybe<Scalars['Boolean']>;
  matchedCount?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
  pageCount?: Maybe<Scalars['Int']>;
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
  allCities: AllCitiesOutput;
  allRestaurantsSlug: AllRestaurantsSlugOutput;
  categories: PaginationCategoriesOutput;
  cities: PaginationCitiesOutput;
  getOrder: GetOrderOutput;
  getOrders: GetOrdersOutput;
  getPayments: GetPaymentsOutput;
  me: User;
  myRestaurant: RestaurantOutput;
  myRestaurants: PaginatedRestaurantsOutput;
  restaurant: RestaurantOutput;
  restaurantBySlug: RestaurantOutput;
  restaurants: PaginatedRestaurantsOutput;
  restaurantsByCategorySlug: PaginatedCategoryRestaurantsOutput;
  restaurantsByCitySlug: PaginatedCityRestaurantsOutput;
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


export type QueryAllRestaurantsSlugArgs = {
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoriesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryCitiesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetOrderArgs = {
  input: GetOrderInput;
};


export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};


export type QueryMyRestaurantArgs = {
  id: Scalars['Int'];
};


export type QueryMyRestaurantsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryRestaurantArgs = {
  id: Scalars['Int'];
};


export type QueryRestaurantBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryRestaurantsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryRestaurantsByCategorySlugArgs = {
  page?: InputMaybe<Scalars['Int']>;
  slug: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryRestaurantsByCitySlugArgs = {
  page?: InputMaybe<Scalars['Int']>;
  slug: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Category>>;
  city?: Maybe<City>;
  coverImageUrls?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['EnhancedDate'];
  id: Scalars['Float'];
  isPromoted: Scalars['Boolean'];
  location?: Maybe<Location>;
  logoImageUrl?: Maybe<Scalars['String']>;
  menu?: Maybe<Array<Dish>>;
  name: Scalars['String'];
  neighborhood?: Maybe<Scalars['String']>;
  openingHours?: Maybe<OpeningHours>;
  orders?: Maybe<Array<Order>>;
  promotedUntil?: Maybe<Scalars['EnhancedDate']>;
  reviews?: Maybe<Review>;
  slug: Scalars['String'];
  street?: Maybe<Scalars['String']>;
  updatedAt: Scalars['EnhancedDate'];
  vendors: Array<User>;
  website?: Maybe<Scalars['String']>;
};

export type RestaurantOutput = {
  __typename?: 'RestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurant?: Maybe<Restaurant>;
};

export type Review = {
  __typename?: 'Review';
  createdAt: Scalars['EnhancedDate'];
  customer: User;
  id: Scalars['Float'];
  name: Scalars['String'];
  restaurant: Restaurant;
  stars: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['EnhancedDate'];
};

export type SignUpAccountInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  photoURL?: InputMaybe<Scalars['String']>;
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

export type UpdateDishInput = {
  description?: InputMaybe<Scalars['String']>;
  dishId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<DishOptionInputType>>;
  price?: InputMaybe<Scalars['Int']>;
};

export type UpdateProfileInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  photoURL?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileOutput = {
  __typename?: 'UpdateProfileOutput';
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
  address?: InputMaybe<Scalars['String']>;
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

export type RestaurantPartsFragment = { __typename?: 'Restaurant', id: number, name: string, coverImageUrls?: Array<string> | null, address?: string | null, isPromoted: boolean, logoImageUrl?: string | null, categories?: Array<{ __typename?: 'Category', name: string, coverImageUrl?: string | null }> | null };

export type CategoryPartsFragment = { __typename?: 'Category', id: number, name: string, coverImageUrl?: string | null, slug: string, restaurantCount: number };

export type DishPartsFragment = { __typename?: 'Dish', id: number, name: string, price: number, photo?: string | null, description: string, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null, choices?: Array<{ __typename?: 'DishChoice', name: string, extra?: number | null }> | null }> | null };

export type OrderPartsFragment = { __typename?: 'Order', id: number, createdAt: any, total?: number | null };

export type UserPartsFragment = { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, isVerified: boolean, createdAt: any, photoURL?: string | null, roles: Array<UserRole> };

export type AdminCreateCategoryMutationVariables = Exact<{
  input: AdminCreateCategoryInput;
}>;


export type AdminCreateCategoryMutation = { __typename?: 'Mutation', adminCreateCategory: { __typename?: 'AdminCreateCategoryOutput', error?: string | null, ok: boolean, category?: { __typename?: 'Category', coverImageUrl?: string | null, createdAt: any, id: number, name: string, restaurantCount: number, slug: string, updatedAt: any } | null } };

export type AdminCreateRestaurantMutationVariables = Exact<{
  input: AdminCreateRestaurantInput;
}>;


export type AdminCreateRestaurantMutation = { __typename?: 'Mutation', adminCreateRestaurant: { __typename?: 'RestaurantOutput', error?: string | null, ok: boolean } };

export type AdminDeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AdminDeleteCategoryMutation = { __typename?: 'Mutation', adminDeleteCategory: { __typename?: 'CoreOutput', error?: string | null, ok: boolean } };

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type AdminDeleteUserMutation = { __typename?: 'Mutation', adminDeleteUser: { __typename?: 'DeleteAccountOutput', error?: string | null, ok: boolean } };

export type AdminUpdateCategoryMutationVariables = Exact<{
  input: AdminUpdateCategoryInput;
}>;


export type AdminUpdateCategoryMutation = { __typename?: 'Mutation', adminUpdateCategory: { __typename?: 'AdminUpdateCategoryOutput', error?: string | null, ok: boolean } };

export type AdminUpdateRestaurantMutationVariables = Exact<{
  input: AdminUpdateRestaurantInput;
}>;


export type AdminUpdateRestaurantMutation = { __typename?: 'Mutation', adminUpdateRestaurant: { __typename?: 'RestaurantOutput', error?: string | null, ok: boolean } };

export type AdminUpdateUserMutationVariables = Exact<{
  input: AdminUpdateUserInput;
}>;


export type AdminUpdateUserMutation = { __typename?: 'Mutation', adminUpdateUser: { __typename?: 'AdminUpdateUserOutput', error?: string | null, ok: boolean } };

export type AdminCreateAdminMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type AdminCreateAdminMutation = { __typename?: 'Mutation', adminCreateAdmin: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, isVerified: boolean, createdAt: any, photoURL?: string | null, roles: Array<UserRole> } | null } };

export type CreateDishMutationVariables = Exact<{
  input: CreateDishInput;
}>;


export type CreateDishMutation = { __typename?: 'Mutation', vendorCreateDish: { __typename?: 'DishOutput', ok: boolean, error?: string | null } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderOutput', ok: boolean, error?: string | null, orderId?: number | null } };

export type DeleteRestaurantMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRestaurantMutation = { __typename?: 'Mutation', deleteRestaurant: { __typename?: 'CoreOutput', error?: string | null, ok: boolean } };

export type EditOrderMutationVariables = Exact<{
  input: EditOrderInput;
}>;


export type EditOrderMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'EditOrderOutput', ok: boolean, error?: string | null } };

export type TakeOrderMutationVariables = Exact<{
  input: TakeOrderInput;
}>;


export type TakeOrderMutation = { __typename?: 'Mutation', takeOrder: { __typename?: 'TakeOrderOutput', ok: boolean, error?: string | null } };

export type UpdateMeMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'UpdateProfileOutput', error?: string | null, ok: boolean } };

export type AdminGetRestaurantsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type AdminGetRestaurantsQuery = { __typename?: 'Query', adminGetRestaurants: { __typename?: 'PaginatedRestaurantsOutput', error?: string | null, hasNext?: boolean | null, hasPrevious?: boolean | null, matchedCount?: number | null, ok: boolean, pageCount?: number | null, restaurants?: Array<{ __typename?: 'Restaurant', address?: string | null, coverImageUrls?: Array<string> | null, createdAt: any, id: number, isPromoted: boolean, name: string, promotedUntil?: any | null, updatedAt: any, categories?: Array<{ __typename?: 'Category', restaurantCount: number, coverImageUrl?: string | null, createdAt: any, id: number, name: string, slug: string, updatedAt: any }> | null, vendors: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, isVerified: boolean, createdAt: any, photoURL?: string | null, roles: Array<UserRole> }> }> | null } };

export type AdminGetUsersQueryVariables = Exact<{
  role?: InputMaybe<UserRole>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type AdminGetUsersQuery = { __typename?: 'Query', adminGetUsers: { __typename?: 'PaginatedUsersOutput', error?: string | null, hasNext?: boolean | null, hasPrevious?: boolean | null, matchedCount?: number | null, ok: boolean, pageCount?: number | null, users?: Array<{ __typename?: 'User', createdAt: any, firstName?: string | null, lastName?: string | null, email: string, id: string, roles: Array<UserRole>, updatedAt: any, isVerified: boolean, photoURL?: string | null }> | null } };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', allCategories: { __typename?: 'AllCategoriesOutput', error?: string | null, ok: boolean, categories?: Array<{ __typename?: 'Category', coverImageUrl?: string | null, createdAt: any, id: number, name: string, restaurantCount: number, slug: string, updatedAt: any }> | null } };

export type AllCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCitiesQuery = { __typename?: 'Query', allCities: { __typename?: 'AllCitiesOutput', ok: boolean, error?: string | null, cities?: Array<{ __typename?: 'City', createdAt: any, id: number, name: string, nameInKhmer?: string | null, restaurantCount: number, slug: string, updatedAt: any, location?: { __typename?: 'Location', createdAt: any, id: number, latitude: number, longitude: number, updatedAt: any } | null }> | null } };

export type AllRestaurantsSlugQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
}>;


export type AllRestaurantsSlugQuery = { __typename?: 'Query', allRestaurantsSlug: { __typename?: 'AllRestaurantsSlugOutput', allCount?: number | null, error?: string | null, ok: boolean, slugs?: Array<string> | null } };

export type CategoriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'PaginationCategoriesOutput', error?: string | null, hasNext?: boolean | null, hasPrevious?: boolean | null, matchedCount?: number | null, ok: boolean, pageCount?: number | null, categories?: Array<{ __typename?: 'Category', coverImageUrl?: string | null, createdAt: any, id: number, name: string, restaurantCount: number, slug: string, updatedAt: any }> | null } };

export type CitiesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type CitiesQuery = { __typename?: 'Query', cities: { __typename?: 'PaginationCitiesOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, hasPrevious?: boolean | null, matchedCount?: number | null, pageCount?: number | null, cities?: Array<{ __typename?: 'City', createdAt: any, id: number, name: string, nameInKhmer?: string | null, restaurantCount: number, slug: string, updatedAt: any, location?: { __typename?: 'Location', createdAt: any, id: number, latitude: number, longitude: number, updatedAt: any } | null }> | null } };

export type GetOrderQueryVariables = Exact<{
  input: GetOrderInput;
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder: { __typename?: 'GetOrderOutput', ok: boolean, error?: string | null, order?: { __typename?: 'Order', id: number, status: OrderStatus, total?: number | null, driver?: { __typename?: 'User', email: string } | null, customer?: { __typename?: 'User', email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', createdAt: any, email: string, firstName?: string | null, id: string, isVerified: boolean, lastName?: string | null, photoURL?: string | null, roles: Array<UserRole> } };

export type MyRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRestaurantsQuery = { __typename?: 'Query', myRestaurants: { __typename?: 'PaginatedRestaurantsOutput', ok: boolean, error?: string | null, restaurants?: Array<{ __typename?: 'Restaurant', id: number, name: string, coverImageUrls?: Array<string> | null, address?: string | null, isPromoted: boolean, logoImageUrl?: string | null, categories?: Array<{ __typename?: 'Category', name: string, coverImageUrl?: string | null }> | null }> | null } };

export type RestaurantBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RestaurantBySlugQuery = { __typename?: 'Query', restaurantBySlug: { __typename?: 'RestaurantOutput', error?: string | null, ok: boolean, restaurant?: { __typename?: 'Restaurant', address?: string | null, coverImageUrls?: Array<string> | null, createdAt: any, id: number, isPromoted: boolean, logoImageUrl?: string | null, name: string, neighborhood?: string | null, promotedUntil?: any | null, slug: string, street?: string | null, updatedAt: any, website?: string | null, categories?: Array<{ __typename?: 'Category', coverImageUrl?: string | null, createdAt: any, iconUrl?: string | null, id: number, name: string, restaurantCount: number, slug: string, updatedAt: any }> | null, city?: { __typename?: 'City', createdAt: any, id: number, name: string, nameInKhmer?: string | null, restaurantCount: number, slug: string, updatedAt: any } | null, location?: { __typename?: 'Location', createdAt: any, id: number, latitude: number, longitude: number, updatedAt: any } | null, menu?: Array<{ __typename?: 'Dish', createdAt: any, description: string, id: number, name: string, photo?: string | null, price: number, updatedAt: any, options?: Array<{ __typename?: 'DishOption', extra?: number | null, name: string, choices?: Array<{ __typename?: 'DishChoice', extra?: number | null, name: string }> | null }> | null }> | null, openingHours?: { __typename?: 'OpeningHours', createdAt: any, fridayHours?: string | null, id: number, mondayHours?: string | null, saturdayHours?: string | null, sundayHours?: string | null, thursdayHours?: string | null, tuesdayHours?: string | null, updatedAt: any, wednesdayHours?: string | null } | null, reviews?: { __typename?: 'Review', createdAt: any, id: number, name: string, stars: number, text?: string | null, updatedAt: any } | null } | null } };

export type RestaurantByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RestaurantByIdQuery = { __typename?: 'Query', restaurant: { __typename?: 'RestaurantOutput', error?: string | null, ok: boolean, restaurant?: { __typename?: 'Restaurant', address?: string | null, coverImageUrls?: Array<string> | null, createdAt: any, id: number, isPromoted: boolean, logoImageUrl?: string | null, name: string, promotedUntil?: any | null, updatedAt: any, categories?: Array<{ __typename?: 'Category', coverImageUrl?: string | null, createdAt: any, id: number, name: string, restaurantCount: number, slug: string, updatedAt: any }> | null, menu?: Array<{ __typename?: 'Dish', createdAt: any, description: string, id: number, name: string, photo?: string | null, price: number, updatedAt: any, options?: Array<{ __typename?: 'DishOption', extra?: number | null, name: string, choices?: Array<{ __typename?: 'DishChoice', extra?: number | null, name: string }> | null }> | null }> | null } | null } };

export type RestaurantsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type RestaurantsQuery = { __typename?: 'Query', restaurants: { __typename?: 'PaginatedRestaurantsOutput', error?: string | null, hasNext?: boolean | null, hasPrevious?: boolean | null, matchedCount?: number | null, ok: boolean, pageCount?: number | null, restaurants?: Array<{ __typename?: 'Restaurant', address?: string | null, slug: string, coverImageUrls?: Array<string> | null, createdAt: any, id: number, isPromoted: boolean, logoImageUrl?: string | null, name: string, promotedUntil?: any | null, updatedAt: any, categories?: Array<{ __typename?: 'Category', id: number, name: string, coverImageUrl?: string | null, slug: string, restaurantCount: number }> | null, menu?: Array<{ __typename?: 'Dish', createdAt: any, description: string, id: number, name: string, photo?: string | null, price: number, updatedAt: any, options?: Array<{ __typename?: 'DishOption', extra?: number | null, name: string, choices?: Array<{ __typename?: 'DishChoice', extra?: number | null, name: string }> | null }> | null }> | null }> | null } };

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
export const AdminCreateCategoryDocument = gql`
    mutation AdminCreateCategory($input: AdminCreateCategoryInput!) {
  adminCreateCategory(input: $input) {
    category {
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
export type AdminCreateCategoryMutationFn = Apollo.MutationFunction<AdminCreateCategoryMutation, AdminCreateCategoryMutationVariables>;

/**
 * __useAdminCreateCategoryMutation__
 *
 * To run a mutation, you first call `useAdminCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateCategoryMutation, { data, loading, error }] = useAdminCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateCategoryMutation, AdminCreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateCategoryMutation, AdminCreateCategoryMutationVariables>(AdminCreateCategoryDocument, options);
      }
export type AdminCreateCategoryMutationHookResult = ReturnType<typeof useAdminCreateCategoryMutation>;
export type AdminCreateCategoryMutationResult = Apollo.MutationResult<AdminCreateCategoryMutation>;
export type AdminCreateCategoryMutationOptions = Apollo.BaseMutationOptions<AdminCreateCategoryMutation, AdminCreateCategoryMutationVariables>;
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
export const AdminDeleteCategoryDocument = gql`
    mutation AdminDeleteCategory($id: Int!) {
  adminDeleteCategory(id: $id) {
    error
    ok
  }
}
    `;
export type AdminDeleteCategoryMutationFn = Apollo.MutationFunction<AdminDeleteCategoryMutation, AdminDeleteCategoryMutationVariables>;

/**
 * __useAdminDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useAdminDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteCategoryMutation, { data, loading, error }] = useAdminDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteCategoryMutation, AdminDeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteCategoryMutation, AdminDeleteCategoryMutationVariables>(AdminDeleteCategoryDocument, options);
      }
export type AdminDeleteCategoryMutationHookResult = ReturnType<typeof useAdminDeleteCategoryMutation>;
export type AdminDeleteCategoryMutationResult = Apollo.MutationResult<AdminDeleteCategoryMutation>;
export type AdminDeleteCategoryMutationOptions = Apollo.BaseMutationOptions<AdminDeleteCategoryMutation, AdminDeleteCategoryMutationVariables>;
export const AdminDeleteUserDocument = gql`
    mutation AdminDeleteUser($userId: String!) {
  adminDeleteUser(userId: $userId) {
    error
    ok
  }
}
    `;
export type AdminDeleteUserMutationFn = Apollo.MutationFunction<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>;

/**
 * __useAdminDeleteUserMutation__
 *
 * To run a mutation, you first call `useAdminDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteUserMutation, { data, loading, error }] = useAdminDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAdminDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>(AdminDeleteUserDocument, options);
      }
export type AdminDeleteUserMutationHookResult = ReturnType<typeof useAdminDeleteUserMutation>;
export type AdminDeleteUserMutationResult = Apollo.MutationResult<AdminDeleteUserMutation>;
export type AdminDeleteUserMutationOptions = Apollo.BaseMutationOptions<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>;
export const AdminUpdateCategoryDocument = gql`
    mutation AdminUpdateCategory($input: AdminUpdateCategoryInput!) {
  adminUpdateCategory(input: $input) {
    error
    ok
  }
}
    `;
export type AdminUpdateCategoryMutationFn = Apollo.MutationFunction<AdminUpdateCategoryMutation, AdminUpdateCategoryMutationVariables>;

/**
 * __useAdminUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useAdminUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateCategoryMutation, { data, loading, error }] = useAdminUpdateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateCategoryMutation, AdminUpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateCategoryMutation, AdminUpdateCategoryMutationVariables>(AdminUpdateCategoryDocument, options);
      }
export type AdminUpdateCategoryMutationHookResult = ReturnType<typeof useAdminUpdateCategoryMutation>;
export type AdminUpdateCategoryMutationResult = Apollo.MutationResult<AdminUpdateCategoryMutation>;
export type AdminUpdateCategoryMutationOptions = Apollo.BaseMutationOptions<AdminUpdateCategoryMutation, AdminUpdateCategoryMutationVariables>;
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
export const AdminUpdateUserDocument = gql`
    mutation AdminUpdateUser($input: AdminUpdateUserInput!) {
  adminUpdateUser(input: $input) {
    error
    ok
  }
}
    `;
export type AdminUpdateUserMutationFn = Apollo.MutationFunction<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;

/**
 * __useAdminUpdateUserMutation__
 *
 * To run a mutation, you first call `useAdminUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateUserMutation, { data, loading, error }] = useAdminUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>(AdminUpdateUserDocument, options);
      }
export type AdminUpdateUserMutationHookResult = ReturnType<typeof useAdminUpdateUserMutation>;
export type AdminUpdateUserMutationResult = Apollo.MutationResult<AdminUpdateUserMutation>;
export type AdminUpdateUserMutationOptions = Apollo.BaseMutationOptions<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;
export const AdminCreateAdminDocument = gql`
    mutation AdminCreateAdmin($input: CreateAccountInput!) {
  adminCreateAdmin(input: $input) {
    ok
    error
    user {
      ...UserParts
    }
  }
}
    ${UserPartsFragmentDoc}`;
export type AdminCreateAdminMutationFn = Apollo.MutationFunction<AdminCreateAdminMutation, AdminCreateAdminMutationVariables>;

/**
 * __useAdminCreateAdminMutation__
 *
 * To run a mutation, you first call `useAdminCreateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateAdminMutation, { data, loading, error }] = useAdminCreateAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateAdminMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateAdminMutation, AdminCreateAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateAdminMutation, AdminCreateAdminMutationVariables>(AdminCreateAdminDocument, options);
      }
export type AdminCreateAdminMutationHookResult = ReturnType<typeof useAdminCreateAdminMutation>;
export type AdminCreateAdminMutationResult = Apollo.MutationResult<AdminCreateAdminMutation>;
export type AdminCreateAdminMutationOptions = Apollo.BaseMutationOptions<AdminCreateAdminMutation, AdminCreateAdminMutationVariables>;
export const CreateDishDocument = gql`
    mutation createDish($input: CreateDishInput!) {
  vendorCreateDish(input: $input) {
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
    mutation DeleteRestaurant($id: Int!) {
  deleteRestaurant(id: $id) {
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
 *      id: // value for 'id'
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
  updateOrder(input: $input) {
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
export const UpdateMeDocument = gql`
    mutation UpdateMe($input: UpdateProfileInput!) {
  updateMe(input: $input) {
    error
    ok
  }
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
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
      firstName
      lastName
      email
      id
      roles
      updatedAt
      isVerified
      photoURL
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
export const AllCitiesDocument = gql`
    query AllCities {
  allCities {
    ok
    error
    cities {
      createdAt
      id
      location {
        createdAt
        id
        latitude
        longitude
        updatedAt
      }
      name
      nameInKhmer
      restaurantCount
      slug
      updatedAt
    }
  }
}
    `;

/**
 * __useAllCitiesQuery__
 *
 * To run a query within a React component, call `useAllCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCitiesQuery(baseOptions?: Apollo.QueryHookOptions<AllCitiesQuery, AllCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCitiesQuery, AllCitiesQueryVariables>(AllCitiesDocument, options);
      }
export function useAllCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCitiesQuery, AllCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCitiesQuery, AllCitiesQueryVariables>(AllCitiesDocument, options);
        }
export type AllCitiesQueryHookResult = ReturnType<typeof useAllCitiesQuery>;
export type AllCitiesLazyQueryHookResult = ReturnType<typeof useAllCitiesLazyQuery>;
export type AllCitiesQueryResult = Apollo.QueryResult<AllCitiesQuery, AllCitiesQueryVariables>;
export const AllRestaurantsSlugDocument = gql`
    query AllRestaurantsSlug($take: Int) {
  allRestaurantsSlug(take: $take) {
    allCount
    error
    ok
    slugs
  }
}
    `;

/**
 * __useAllRestaurantsSlugQuery__
 *
 * To run a query within a React component, call `useAllRestaurantsSlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllRestaurantsSlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllRestaurantsSlugQuery({
 *   variables: {
 *      take: // value for 'take'
 *   },
 * });
 */
export function useAllRestaurantsSlugQuery(baseOptions?: Apollo.QueryHookOptions<AllRestaurantsSlugQuery, AllRestaurantsSlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllRestaurantsSlugQuery, AllRestaurantsSlugQueryVariables>(AllRestaurantsSlugDocument, options);
      }
export function useAllRestaurantsSlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllRestaurantsSlugQuery, AllRestaurantsSlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllRestaurantsSlugQuery, AllRestaurantsSlugQueryVariables>(AllRestaurantsSlugDocument, options);
        }
export type AllRestaurantsSlugQueryHookResult = ReturnType<typeof useAllRestaurantsSlugQuery>;
export type AllRestaurantsSlugLazyQueryHookResult = ReturnType<typeof useAllRestaurantsSlugLazyQuery>;
export type AllRestaurantsSlugQueryResult = Apollo.QueryResult<AllRestaurantsSlugQuery, AllRestaurantsSlugQueryVariables>;
export const CategoriesDocument = gql`
    query Categories($page: Int, $q: String, $take: Int) {
  categories(page: $page, q: $q, take: $take) {
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
    hasNext
    hasPrevious
    matchedCount
    ok
    pageCount
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      q: // value for 'q'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CitiesDocument = gql`
    query Cities($page: Int, $q: String, $take: Int) {
  cities(page: $page, q: $q, take: $take) {
    ok
    error
    hasNext
    hasPrevious
    matchedCount
    pageCount
    cities {
      createdAt
      id
      name
      nameInKhmer
      restaurantCount
      slug
      updatedAt
      location {
        createdAt
        id
        latitude
        longitude
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      q: // value for 'q'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useCitiesQuery(baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
      }
export function useCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($input: GetOrderInput!) {
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
export const MeDocument = gql`
    query Me {
  me {
    createdAt
    email
    firstName
    id
    isVerified
    lastName
    photoURL
    roles
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyRestaurantsDocument = gql`
    query MyRestaurants {
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
export const RestaurantBySlugDocument = gql`
    query RestaurantBySlug($slug: String!) {
  restaurantBySlug(slug: $slug) {
    error
    ok
    restaurant {
      address
      categories {
        coverImageUrl
        createdAt
        iconUrl
        id
        name
        restaurantCount
        slug
        updatedAt
      }
      city {
        createdAt
        id
        name
        nameInKhmer
        restaurantCount
        slug
        updatedAt
      }
      coverImageUrls
      createdAt
      id
      isPromoted
      location {
        createdAt
        id
        latitude
        longitude
        updatedAt
      }
      logoImageUrl
      menu {
        createdAt
        description
        id
        name
        options {
          choices {
            extra
            name
          }
          extra
          name
        }
        photo
        price
        updatedAt
      }
      name
      neighborhood
      openingHours {
        createdAt
        fridayHours
        id
        mondayHours
        saturdayHours
        sundayHours
        thursdayHours
        tuesdayHours
        updatedAt
        wednesdayHours
      }
      promotedUntil
      reviews {
        createdAt
        id
        name
        stars
        text
        updatedAt
      }
      slug
      street
      updatedAt
      website
    }
  }
}
    `;

/**
 * __useRestaurantBySlugQuery__
 *
 * To run a query within a React component, call `useRestaurantBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRestaurantBySlugQuery(baseOptions: Apollo.QueryHookOptions<RestaurantBySlugQuery, RestaurantBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantBySlugQuery, RestaurantBySlugQueryVariables>(RestaurantBySlugDocument, options);
      }
export function useRestaurantBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantBySlugQuery, RestaurantBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantBySlugQuery, RestaurantBySlugQueryVariables>(RestaurantBySlugDocument, options);
        }
export type RestaurantBySlugQueryHookResult = ReturnType<typeof useRestaurantBySlugQuery>;
export type RestaurantBySlugLazyQueryHookResult = ReturnType<typeof useRestaurantBySlugLazyQuery>;
export type RestaurantBySlugQueryResult = Apollo.QueryResult<RestaurantBySlugQuery, RestaurantBySlugQueryVariables>;
export const RestaurantByIdDocument = gql`
    query RestaurantById($id: Int!) {
  restaurant(id: $id) {
    error
    ok
    restaurant {
      address
      categories {
        coverImageUrl
        createdAt
        id
        name
        restaurantCount
        slug
        updatedAt
      }
      coverImageUrls
      createdAt
      id
      isPromoted
      logoImageUrl
      menu {
        createdAt
        description
        id
        name
        options {
          choices {
            extra
            name
          }
          extra
          name
        }
        photo
        price
        updatedAt
      }
      name
      promotedUntil
      updatedAt
    }
  }
}
    `;

/**
 * __useRestaurantByIdQuery__
 *
 * To run a query within a React component, call `useRestaurantByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestaurantByIdQuery(baseOptions: Apollo.QueryHookOptions<RestaurantByIdQuery, RestaurantByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantByIdQuery, RestaurantByIdQueryVariables>(RestaurantByIdDocument, options);
      }
export function useRestaurantByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantByIdQuery, RestaurantByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantByIdQuery, RestaurantByIdQueryVariables>(RestaurantByIdDocument, options);
        }
export type RestaurantByIdQueryHookResult = ReturnType<typeof useRestaurantByIdQuery>;
export type RestaurantByIdLazyQueryHookResult = ReturnType<typeof useRestaurantByIdLazyQuery>;
export type RestaurantByIdQueryResult = Apollo.QueryResult<RestaurantByIdQuery, RestaurantByIdQueryVariables>;
export const RestaurantsDocument = gql`
    query Restaurants($page: Int, $q: String, $take: Int) {
  restaurants(page: $page, q: $q, take: $take) {
    error
    hasNext
    hasPrevious
    matchedCount
    ok
    pageCount
    restaurants {
      address
      slug
      coverImageUrls
      createdAt
      id
      isPromoted
      logoImageUrl
      categories {
        ...CategoryParts
      }
      menu {
        createdAt
        description
        id
        name
        options {
          choices {
            extra
            name
          }
          extra
          name
        }
        photo
        price
        updatedAt
      }
      name
      promotedUntil
      updatedAt
    }
  }
}
    ${CategoryPartsFragmentDoc}`;

/**
 * __useRestaurantsQuery__
 *
 * To run a query within a React component, call `useRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      q: // value for 'q'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
      }
export function useRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
        }
export type RestaurantsQueryHookResult = ReturnType<typeof useRestaurantsQuery>;
export type RestaurantsLazyQueryHookResult = ReturnType<typeof useRestaurantsLazyQuery>;
export type RestaurantsQueryResult = Apollo.QueryResult<RestaurantsQuery, RestaurantsQueryVariables>;
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