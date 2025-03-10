import useProvider from "./hooks/ethers/useProvider";
import useBalance from "./hooks/ethers/useBalance";
import useErcTokenDetails from "./hooks/ethers/useErcTokenDetails";
import "./App.css";

const App = () => {
  const address = "0x9aC9Ce4d390bB09E554da0bF5aCDBA6398809fF8";
  const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const { provider } = useProvider();
  const { loading, error, balance } = useBalance({provider, address});
  const { tokenName, tokenSymbol, tokenBalance, tokenTotalSupply } = useErcTokenDetails({ address, tokenAddress, provider });

  return (
    <div>
      <h1> Wallet Provider Info </h1>

      <p>{error ? error : loading ? "Loading..." : `Wallet main balance: ${balance} ETH`}</p>

      <p>
       ERC-20 token Details:
        Symbol
      </p>
      <p> 
       {`Symbol: ${tokenSymbol}`} <br/>
       {`Name: ${tokenName}`} <br/>
       {`Balance: ${tokenBalance}`} <br/>
       {`Total Supply: ${tokenTotalSupply}`}
      </p> 
    </div>
  );
};

export default App;