import { ethers } from 'ethers';
import { useState, useEffect } from 'react'


type ErcTokeProps = {
 address: string;
 tokenAddress: string;
 provider: ethers.Provider;
}

const useErcTokenDetails = ({address, tokenAddress, provider}) => {
 const ERC_2O_ABI: string[] = [
  'function name() returns view (string)',
  'function symbol() returns view (string)',
  'function totalSupply() returns view (uint256)',
  'function balanceOf(address) returns view (uint)'
 ];
 
 
 useEffect(() => {
  const fetchTokenDetails = async () => {
   if (!address || !tokenAddress || !provider) {
     throw new Error('Required info not completed');
   }
   
   try {
    const contract = new ethers.Contract(address, ERC_2O_ABI, provider);
    
    const tokenName = contract.name();
    const tokenSymbol = contract.symbol();
    const tokenTotalSupply = contract.totalSupply();
    const tokenBalance = contract.balanceOf(address);
   } catch {
    
   }
  }
 }, [address, tokenAddress, provider]);
 
 
 return { tokenName, tokenSymbol, tokenTotalSupply, tokenBalance }
}


export default useErcTokenDetails;