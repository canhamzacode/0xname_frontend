import React from 'react';
import CommunitySearch from '../components/createCommunityComponents/CommunitySearch';
import './../App.css';

const CreateCommunity: React.FunctionComponent = () => (
    <div className="cc-content">
        <h1>Enter the TLN (Top Level Name) you want to register</h1>
        <div className="cc-content-child">
            <CommunitySearch />
        </div>
    </div>
);

export default CreateCommunity;
