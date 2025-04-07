import { useState, useEffect } from 'react';

const useMetaMask = () => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
    const [currentAccount, setCurrentAccount] = useState<string | null>(null);

    useEffect(() => {
        if (window.ethereum) {
            setIsMetaMaskInstalled(true);
            // Check if the user has already connected their wallet
            window.ethereum.request({ method: 'eth_accounts' })
                .then((accounts: string[]) => {
                    if (accounts.length > 0) {
                        setCurrentAccount(accounts[0]);
                    }
                })
                .catch((err: any) => console.error('Error fetching accounts:', err));
        } else {
            setIsMetaMaskInstalled(false);
        }
    }, []);

    return { isMetaMaskInstalled, currentAccount };
}

export default useMetaMask;
