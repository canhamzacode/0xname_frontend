import { useEffect, useState } from 'react';
import sdk, { type FrameContext } from '@farcaster/frame-sdk';

const useLoadFrames = () => {
    const [context, setContext] = useState<FrameContext>();
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            setContext(await sdk.context);
            sdk.actions.ready();
        };

        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true);
            load();
        }
    }, [isSDKLoaded]);

    return { context, isSDKLoaded };
};

export default useLoadFrames;
