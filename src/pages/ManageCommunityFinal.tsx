import { useParams } from 'react-router-dom';
import ManageCommunity from '../components/manageCommunityComponents/ManageCommunity';

const ManageCommunityFinal: React.FunctionComponent = () => {
    const { searchValueTLN } = useParams();
    const communityValue = searchValueTLN ?? '';
    return (
        <div className="cm-content">
            <h1>Here you can manage your TLN (Top Level Name)</h1>
            <div className="cm-content-child">
                <ManageCommunity searchValue={communityValue} />
            </div>
        </div>
    );
};
export default ManageCommunityFinal;
