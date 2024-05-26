import { useCallback, useEffect, useState } from 'react';
import { ICountry } from '../../country.interface';
import { DB_NAME, getStoreRecord } from '../../db';
import './CountryDetails.scss';

type CountryDetailsProps = {
  countryData: ICountry;
};

const CountryDetails = (props: CountryDetailsProps) => {
  const [borders, setBorders] = useState<string[]>([]);
  const {
    name,
    flag: { alt, png },
    population,
    region,
    capital,
    nativeName,
    currencies,
    borderCountries,
    languages,
  } = props.countryData;

  const fetchBorders = useCallback(async (borderCountries: string[]) => {
    const borderArr = borderCountries.map(async (country) => {
      const border = (await getStoreRecord(DB_NAME, country)) || country;
      return border;
    });
    const countryList: any = await Promise.all(borderArr);
    const borderNames = countryList.map((country: ICountry) =>
      country.name ? country.name : country,
    );
    setBorders(borderNames);
  }, []);

  useEffect(() => {
    if (borderCountries) {
      fetchBorders(borderCountries);
    }
  }, [borderCountries, fetchBorders]);

  if (!props.countryData) return null;

  return (
    <div className="country-details">
      <div className="top-section">
        <img src={png} alt={alt} width="320" height="160" />
        {currencies && (
          <div className="country-currencies">
            <div className="label">Currencies:</div>
            <div className="pill-list">
              {currencies.map((currency) => (
                <span key={currency} className="pill value">
                  {currency}
                </span>
              ))}
            </div>
          </div>
        )}
        {languages && (
          <div className="country-languages">
            <div className="label"> Languages:</div>
            <div className="pill-list">
              {languages.map((language) => (
                <span key={language} className="pill value">
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}
        {borderCountries && (
          <div className="country-borders">
            <div className="label">Borders:</div>
            <div className="pill-list">
              {borders.map((border) => (
                <span key={border} className="pill value">
                  {border}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="details">
        <div className="country-name">
          <span className="label">Country Name:</span>
          <span className="value">{name}</span>
        </div>
        <div className="country-population">
          <span className="label">Population:</span>
          <span className="value">{population.toLocaleString('en-US')}</span>
        </div>
        <div className="country-region">
          <span className="label">Region:</span>
          <span className="value">{region}</span>
        </div>
        <div className="country-capital">
          <span className="label">Capital:</span>
          <span className="value">{capital}</span>
        </div>
        <div className="country-native">
          <span className="label">Native Name:</span>
          <span className="value">{nativeName}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
