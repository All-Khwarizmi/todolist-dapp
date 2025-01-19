export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`;
};

export async function chainIDtoName(chainID: string): Promise<string> {
  const res = await (
    await fetch("https://chainid.network/chains_mini.json")
  ).json();
  const chainData = res.find(
    (chain: any) => chain.chainId === parseInt(chainID, 16)
  );
  return chainData?.name || "Unknown";
}
