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

export type TIngrData = {
  dragId: string,
  item: TIngredients
}

export type TOrderData = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: string;
  number: number
};

export type TOrderFeed = {
  success: boolean;
  orders: TOrderData[];
  total: number;
  totalToday: number
}

export enum WebSocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  ERROR = 'ERROR'
}