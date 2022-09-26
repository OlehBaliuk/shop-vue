interface ICountries {
  cities: Array<string>;
  country: string;
  iso2: string;
  iso3: string;
}

interface IShowProps {
  title: string;
}

interface IAdmin {
  email: string;
  password: string;
  first: string;
  last: string;
  age: number;
  birthDay: number;
  phone: string;
  country: string;
  city: string;
  gender: string;
  avatar: string;
  contactType: string;
  id: number;
}

interface IDataProduct {
  name: string;
  description: string;
  price: string;
  image?: string;
  id?: string | number;
  quantity?: string | number;
  rating?: string | number;
}

interface IUser {
  email: string;
  password: string;
  first: string;
  last: string;
  age: number;
  birthDay: number;
  phone: string;
  country: string;
  city: string;
  gender: string;
  avatar: string;
  contactType: string;
  id: number;
}

interface IProduct {
  image: string;
  name: string;
  description: string;
  price: string;
  id?: number;
  quantity: number;
  rating: number;
  count?: number;
}

interface IResponseProduct {
  data: {
    data: any;
  };
}

interface IfilterData {
  page: {
    key: string;
    value: number;
  };
  from: {
    key: string;
    value: undefined | string;
  };
  to: {
    key: string;
    value: undefined | string;
  };

  [key: string]: any;
}

export {
  ICountries,
  IShowProps,
  IAdmin,
  IDataProduct,
  IProduct,
  IUser,
  IResponseProduct,
  IfilterData,
};
