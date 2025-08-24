import React from 'react';
import { Link } from 'react-router-dom';

const AddSnapButton = ({ label = 'Use 0xNAME in MetaMask' }: { label?: string }) => {
    return (
        <Link
            to="https://snaps.metamask.io/snap/npm/0xname-resolver-snap/"
            target="_blank"
            className="snapBtn"
        >
            <p>{label}</p>
            <img src="/fox.svg" alt="metamask svg" width={24} height={24} />
        </Link>
    );
};

export default AddSnapButton;
