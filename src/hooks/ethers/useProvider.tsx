import { ethers } from 'ethers';

const useProvider = () => {
  const infuraId = import.meta.env.VITE_INFURA_ID;
  const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraId}`);

  return { provider };
}

export default useProvider;