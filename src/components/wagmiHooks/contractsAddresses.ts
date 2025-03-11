export const contractAddresses: {
    [network: string]: {
        namesRegistry: `0x${string}`;
        svgRenderer: `0x${string}`;
        pomToken: `0x${string}`;
        storage: `0x${string}`;
    };
} = {
    mainnet: {
        namesRegistry: '0x636518cb98F2F705082da540ba961E0A608C8220',
        svgRenderer: '0x09BF011Ed8a82a95b2721986082C07f4b074cba0',
        pomToken: '0x9348025499d96e533D367698E62ecCE168d48919',
        storage: '0xCD95e385C2f7Da32675dfD701a32BeB0F1442087',
    },
    sepolia: {
        namesRegistry: '0x443c7eCE694853c32EECeEabA947Cc92F5625CE0',
        svgRenderer: '0x21DA9d030582A8a59143A9568c24C1c8a7ef6c57',
        pomToken: '0x0B95ca1876E68DE9774b143020CFd55Dd29bde7A',
        storage: '0xd94C0C60A25044039472C6407Abb013A82bf85C6',
    },
};

export const currentNetwork =
    import.meta.env.VITE_APP_ENV === 'mainnet' || import.meta.env.VITE_APP_ENV === 'sepolia'
        ? import.meta.env.VITE_APP_ENV
        : 'sepolia';
export const currentContractAddresses =
    contractAddresses[currentNetwork as keyof typeof contractAddresses];
