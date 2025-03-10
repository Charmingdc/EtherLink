import { ethers } from "ethers";
import { useState, useEffect } from "react";

type ErcTokenProps = {
  address: string;
  tokenAddress: string;
  provider: ethers.Provider;
};

const useErcTokenDetails = ({ address, tokenAddress, provider }: ErcTokenProps) => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenTotalSupply, setTokenTotalSupply] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  const ERC_20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
  ];

  useEffect(() => {
    if (!address || !tokenAddress || !provider) return;

    const fetchTokenDetails = async () => {
      try {
        const contract = new ethers.Contract(tokenAddress, ERC_20_ABI, provider);
        const [name, symbol, totalSupply, balance] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.totalSupply(),
          contract.balanceOf(address),
        ]);

        setTokenName(name);
        setTokenSymbol(symbol);
        setTokenTotalSupply(Number(ethers.formatUnits(totalSupply, 18)));
        setTokenBalance(Number(ethers.formatUnits(balance, 18)));
      } catch (err) {
        console.error("Error fetching token details:", err);
      }
    };

    fetchTokenDetails();
  }, [address, tokenAddress, provider]);

  return { tokenName, tokenSymbol, tokenTotalSupply, tokenBalance };
};

export default useErcTokenDetails;