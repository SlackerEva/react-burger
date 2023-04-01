export type TLoginData = {
  email: string;
  password: string;
}

export type TUserData = TLoginData & {
  name: string;
}

export type TResetData = {
  password: string;
  token: string;
}

export type TIngredients = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}