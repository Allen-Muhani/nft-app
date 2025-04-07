import { useState, useEffect } from "react";

const ConnectMetamask: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window?.ethereum) {
      alert("No wallet found. Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        alert("No authorized account found");
      }

      setAddress(accounts[0]);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (
      typeof window.ethereum !== "undefined" &&
      typeof window.ethereum.selectedAddress == "string"
    ) {
      setAddress(window.ethereum.selectedAddress);
    }
  }, []);

  useEffect(() => {
    if (!window?.ethereum) {
      return;
    }

    const listener = ([selectedAddress]: string[]) => {
      setAddress(selectedAddress);
    };

    window.ethereum.on("accountsChanged", listener);

    return () => {
      window.ethereum.removeListener("accountsChanged", listener);
    };
  }, []);

  return (
    <button onClick={connectWallet}>
      {address ? address : `Connect Wallet`}
    </button>
  );
};

export default ConnectMetamask;