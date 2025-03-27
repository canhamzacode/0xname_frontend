import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileComponent from '../components/myMembershipsComponents/ProfileComponent';

const Profile: React.FC = () => {
    const { nameAtTLN } = useParams();
    const name = nameAtTLN ?? '';
    return (
        <div className="page-content">
            <h1>
                {' '}
                <b> {nameAtTLN} </b>{' '}
            </h1>
            <div className="pc">
                <ProfileComponent nameAtTLN={name} />
            </div>
        </div>
    );
};

export default Profile;
