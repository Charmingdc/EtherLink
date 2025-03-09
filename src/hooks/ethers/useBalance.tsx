import { useState, useEffect } from "react"
import { ethers } from "ethers";


type UseBalanceProps = {
  provider: ethers.Provider;
  address: string;
};

const useBalance = ({ provider, address }: UseBalanceProps) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provider || !address) {
      setError("Either provider or address is missing");
      return;
    }

    const fetchBalance = async () => {
      setLoading(true);
      
      try {
        const rawBalance = await provider.getBalance(address);
        
        setBalance(ethers.formatEther(rawBalance));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [provider, address]);

  return { loading, error, balance };
};

export default useBalance;