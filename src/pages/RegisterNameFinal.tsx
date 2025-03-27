import React from 'react';
import { useParams } from 'react-router-dom';
import NameRegister from '../components/registerNameComponents/NameRegister';

const RegisterNameFinal: React.FunctionComponent = () => {
    const { nameAtTLN } = useParams<{
        nameAtTLN: string | undefined;
    }>();
    return (
        <div className="home-content">
            <h1>Finalise your chosen name registration</h1>
            <div className="home-content-child">
                {nameAtTLN && <NameRegister nameAtTLN={nameAtTLN} />}
            </div>
        </div>
    );
};
export default RegisterNameFinal;
