import React from 'react';
import CommunitiesSearchBasic from '../basicCommunitySearchComponent/CommunitiesSearchBasic';

const CommunitySearch: React.FC = () => {
    return (
        <CommunitiesSearchBasic
            comparisonData="0x0000000000000000000000000000000000000000"
            feedBackTextValid="TLN (Top Level Name) is available!"
            feedbackTextInvalid="TLN (Top Level Name) is already Registred!"
            routePath="RegisterTLNFinal"
        />
    );
};

export default CommunitySearch;
