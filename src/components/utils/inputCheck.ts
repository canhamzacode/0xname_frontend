//no function isCommunityAvailable that returns bool
export function checkCommunity(textData: string) {
    const feedback =
        textData === '0x0000000000000000000000000000000000000000'
            ? 'TLN is not registered. "Register a TLN" ->'
            : 'TLN exists';
    const validity =
        textData === '0x0000000000000000000000000000000000000000' ? 'isInvalid' : 'isValid';
    return [feedback, validity];
}

export function checkName(textData: boolean, membershipData: boolean) {
    console.log(membershipData);
    const feedback =
        textData === false
            ? 'Name is not available for registration in this TLN'
            : membershipData === true
              ? 'You already have a name in this TLN!'
              : 'Name is available for registration in this TLN (Top Level Name)';
    const validity = membershipData === true ? 'isInvalid' : textData ? 'isValid' : 'isInvalid';
    const buttonStatus = textData ? '' : 'disabled';
    console.log(feedback);
    return [feedback, validity, buttonStatus];
}
