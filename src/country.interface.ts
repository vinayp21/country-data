export interface ICountry {
  name: string;
  flag: {
    alt: string;
    png: string;
    svg: string;
  };
  population: number;
  region: string;
  capital: string;
  nativeName: string;
  currencies: Array<string>;
  borderCountries: Array<string>;
  languages: Array<string>;
  code: string;
}
