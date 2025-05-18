import React from 'react';
import CommunityTable from '../components/communityBaseComponents/communityTable';
import { Link } from 'react-router-dom';
const CommunityBase: React.FunctionComponent = () => (
    <div className="page-content">
        <div>
            <h1>Welcome to the Community Base</h1>
            <p>
                How to add your community to the base:{' '}
                <Link to="https://github.com/beastdao/0xname_frontend/blob/main/src/community_base/add-community.md">
                    Add Community Guide
                </Link>
            </p>
        </div>
        <div className="pc">
            <CommunityTable />
        </div>
    </div>
);

export default CommunityBase;
