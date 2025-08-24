import React from 'react';
import TxStatusModalBasic, { ModalContentProps } from './TxStatusModalBasic';
import AddTokenToWallet from '../connectKit/AddTokenToWallet';
import { TransactionReceipt } from 'viem';
import AddSnapButton from '../addSnapButton/addSnapButton';

interface TxStatusModalWithTokenIdProps extends ModalContentProps {
    isSuccess: boolean;
    receipt: TransactionReceipt | undefined;
    tokenId: string | undefined;
}

const TxStatusModalWithTokenId: React.FC<TxStatusModalWithTokenIdProps> = ({
    isSuccess,
    receipt,
    tokenId,
    ...props
}) => {
    const network = import.meta.env.VITE_APP_ENV;
    const etherscanBaseUrl =
        network === 'mainnet'
            ? 'https://etherscan.io'
            : network === 'sepolia'
              ? `https://sepolia.etherscan.io`
              : `https://sepolia.etherscan.io`;
    return (
        <TxStatusModalBasic {...props}>
            {isSuccess && receipt && tokenId ? (
                <div className="mt">
                    <p> Success! </p>
                    <p>
                        {' '}
                        <b>Token ID:</b> {tokenId}{' '}
                    </p>
                    <a
                        href={`${etherscanBaseUrl}/tx/${receipt.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View transaction on <b>Etherscan</b>
                    </a>
                    <div className="modalActionBtn">
                        <AddTokenToWallet tokenIdValue={tokenId} />
                        <AddSnapButton />
                    </div>
                </div>
            ) : null}
        </TxStatusModalBasic>
    );
};

export default TxStatusModalWithTokenId;
