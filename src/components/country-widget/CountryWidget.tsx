import './CountryWidget.scss';
import { ICountry } from '../../country.interface';

export const CountryWidget = (props: {
  data: ICountry;
  getDetails: (data: ICountry) => void;
}) => {
  const { population, region, capital, name } = props.data;
  const altText = props?.data?.flag?.alt || '';
  const imageSource = props?.data?.flag?.png || '';
  return (
    <div className="widget">
      <div className="flag">
        <img src={imageSource} alt={altText} width="250" height="120" />
      </div>
      <div className="details">
        <div className="country-name">{name}</div>
        <div className="sub-details">
          <div className="right-section">
            <div className="country-population">
              <span className="label">Population:</span>
              <span className="value">
                {population.toLocaleString('en-US')}
              </span>
            </div>
            <div className="country-region">
              <span className="label">Region:</span>
              <span className="value">{region}</span>
            </div>
            <div className="country-capital">
              <span className="label">Capital:</span>
              <span className="value">{capital}</span>
            </div>
          </div>
          <div className="see-more">
            <button
              className="btn"
              onClick={() => props.getDetails(props.data)}
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
