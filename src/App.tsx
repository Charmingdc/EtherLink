import useProvider from './hooks/ethers/useProvider';
import useBalance from './hooks/ethers/useBalance';
import useErcTokenDetails from './hooks/ethers/useErcTokenDetails';
import './App.css';

const App = () => {
  const address = '0x9aC9Ce4d390bB09E554da0bF5aCDBA6398809fF8';
  const { provider } = useProvider();
  const { loading, error, balance } = useBalance();
  const { tokenName, tokenSymbol, tokenBalance, tokenTotalSuply } = useErcTokenDetails(address, tokenAddress, provider);

  return (
    <div>
      <h1> Wallet provider Info  </h1>
      
      <p>
       {error ? error : loading ? 'Loading...' : `Wallet main balance: ${balance} Eth sapolia`}
      </p>
      
      
      <p>
       {`Wallet Dai stablecoin details: 
       Symbol: ${tokenSymbol}
       Name: ${tokenName}
       Balance: ${tokenBalance}
       Total Supply: ${tokenTotalSuply}`}
      </p>
    </div>
  );
};

export default App;