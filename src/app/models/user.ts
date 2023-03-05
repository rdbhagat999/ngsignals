import { ROLE } from "./role";

export interface IDummyAuthUser {
  email: string;
  firstName: string;
  id: number;
  token: string;
  username: string;
  role: ROLE;
}

export interface IDummyJsonUser {
  id: number;
  role: ROLE;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: CompanyAddress;
  department: string;
  name: string;
  title: string;
}

export interface CompanyAddress {
  address: string;
  city: string;
  coordinates: CompanyAddressCoordinates;
  postalCode: string;
  state: string;
}

export interface CompanyAddressCoordinates {
  lat: number;
  lng: number;
}
