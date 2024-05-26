import './App.scss';
import { CountryList } from './components/country-list/CountryList';
import ErrorBoundary from './components/Error/Error';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <CountryList />
      </ErrorBoundary>
    </div>
  );
}

export default App;
