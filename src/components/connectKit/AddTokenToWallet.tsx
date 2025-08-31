import React, { useCallback } from 'react';

import { currentContractAddresses } from '../wagmiHooks/contractsAddresses';

declare global {
    interface Window {
        ethereum?: any;
    }
}

const AddTokenToWallet = ({ tokenIdValue }: { tokenIdValue: string }) => {
    const handleAddToken = useCallback(async () => {
        window.ethereum = window.ethereum || {};

        await window.ethereum?.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC721',
                options: {
                    address: currentContractAddresses.pomToken,
                    tokenId: tokenIdValue,
                },
            },
        });
    }, [tokenIdValue]);

    return (
        <button className="btn btn-light" onClick={handleAddToken}>
            + Add Token
        </button>
    );
};

export default AddTokenToWallet;
