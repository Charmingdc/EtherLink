import useProvider from './hooks/ethers/useProvider';
import useBalance from './hooks/ethers/useBalance';
import './App.css';

const App = () => {
  const address = '0x9aC9Ce4d390bB09E554da0bF5aCDBA6398809fF8';
  const { provider } = useProvider();
  const { loading, error, balance } = useBalance({ provider, address });

  return (
    <div>
      <h1>Wallet provider</h1>
      <p>{error ? error : loading ? 'Loading...' : `${balance} Eth sapolia`}</p>
    </div>
  );
};

export default App;