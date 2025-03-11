import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

type ErcTokenProps = {
  address: string;
  tokenAddress: string;
  provider: ethers.providers.Provider;
};

const useErcTokenDetails = ({ address, tokenAddress, provider }: ErcTokenProps) => {
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [tokenTotalSupply, setTokenTotalSupply] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  const ERC_20_ABI: string[] = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
  ];

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!address || !tokenAddress || !provider) {
        console.error('Required info not completed');
        return;
      }

      try {
        const contract = new ethers.Contract(tokenAddress, ERC_20_ABI, provider);
        
        const name = await contract.name();
        const tSymbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();
        const balance = await contract.balanceOf(address);

        setTokenName(name);
        setTokenSymbol(tSymbol);
        setTokenTotalSupply(totalSupply);
        setTokenBalance(ethers.formatUnits(balance, 6));
      } catch (error) {
        console.error('Error fetching token details:', error);
      }
    };

    fetchTokenDetails();
  }, [address, tokenAddress]);

  return { tokenName, tokenSymbol, tokenTotalSupply, tokenBalance };
};

export default useErcTokenDetails;