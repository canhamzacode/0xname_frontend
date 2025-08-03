import axios from 'axios';
import { currentNetwork } from '../wagmiHooks/contractsAddresses';

export async function FetchRecentCommunities(n?: string): Promise<string[] | null> {
    const callUrl = `${import.meta.env.VITE_APP_BACKEND_URL}/${currentNetwork}/communities?n=${n ? n : '10'}`;
    try {
        const response = await axios(callUrl);
        if (response.status === 200) {
            const communities = response.data;
            console.log(communities);
            return communities;
        } else {
            console.error('Failed to retrieve Membership cards.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching data: ', error);
        return null;
    }
}
