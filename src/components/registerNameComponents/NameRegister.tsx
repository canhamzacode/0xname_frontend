import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RenderSVG, ColorScheme, defaultColorScheme } from '../wagmiHooks/RenderSVG';
import { NamesRegistryReadHook } from '../wagmiHooks/NamesRegistryReadHook';
import { NamesRegistryWriteHook } from '../wagmiHooks/NamesRegistryWriteHook';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useAccount } from 'wagmi';
import Alert from 'react-bootstrap/Alert';
import { calculateTokenId } from '../utils/calculateTokenId';
import TxStatusModalWithTokenId from '../txStatusModalComponents/TxStatusModalWithTokenId';
import { ConnectButton } from '../connectKit/ConnectButton';
import { checkName } from '../utils/inputCheck';
import { useEstimateGasFnCall } from '../wagmiHooks/estimateGasFnCall';
import { fetchGasPrice, GasData } from '../utils/fetchGasPrice';
function getCurrentMonthAndYear() {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    return `${currentMonth} ${currentYear}`;
}

function checkIfAdmin(isAdminData: string | undefined, userAddress: string | undefined) {
    return isAdminData === userAddress ? 'Admin' : 'Basic Member';
}

function NameRegister({ nameAtTLN }: { nameAtTLN: string }) {
    const navigate = useNavigate();
    const [feedBackText, setFeedBackText] = useState<string>('');
    const [inputValidity, setInputValidity] = useState<string | null>(null);
    const [buttonStatus, setButtonStatus] = useState<string>('disabled');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
    const [adminAddress, setAdminAddress] = useState<string>('');
    const [imgData, setImgData] = useState<string>();
    const { address } = useAccount();
    const [errorCount, setErrorCount] = useState<number>(0);
    const [alreadyHasName, setAlreadyHasName] = useState<boolean>(false);
    const [CS, setCS] = useState<ColorScheme>(defaultColorScheme);

    const [nameValue, communityValue] = nameAtTLN.split('@');

    const [estimateGasUSD, setEstimateGasUSD] = useState<GasData | undefined>(undefined);
    const [gasFetchStatus, setGasFetchStatus] = useState<string>('loading...');
    const tokenId: string | undefined = calculateTokenId(nameValue, communityValue);

    const formattedDate = getCurrentMonthAndYear();

    const { data, refetch } = NamesRegistryReadHook({
        functionName: 'availableName',
        functionArgs: [nameValue, communityValue],
    });

    const gasEstimate = useEstimateGasFnCall('registerName', [nameValue, communityValue], address);

    const {
        data: dataNameInCommunityByAddress,
        /* probably use in a future
        Unused properties for now:
        isError: isErrorNameInCommunityByAddress,
        isLoading: isLoadingNameInCommunityByAddress,
        */
    } = NamesRegistryReadHook(
        address
            ? {
                  functionName: 'getNameInCommunityByAddress',
                  functionArgs: [address, communityValue],
              }
            : {
                  functionName: 'getNameInCommunityByAddress',
                  functionArgs: undefined,
              }
    );
    const {
        data: dataIsAdmin,
        //refetch: refetchIsAdmin,  // probably use in a future
        isError: isErrorIsAdmin,
        isLoading: isLoadingIsAdmin,
    } = NamesRegistryReadHook({
        functionName: 'getCommunityAdmin',
        functionArgs: [communityValue],
    });
    const { data: fetchedDataCS } = NamesRegistryReadHook({
        functionName: 'getCommunityColorScheme',
        functionArgs: [communityValue],
    }) as { data: ColorScheme | undefined };

    useEffect(() => {
        if (fetchedDataCS) {
            setCS(fetchedDataCS as ColorScheme);
        }
    }, [fetchedDataCS]);

    const MAX_RETRIES = 5;
    const RETRY_DELAY = 2000;

    useEffect(() => {
        const fetchGasPriceData = async (retryCount = 0) => {
            if (gasEstimate !== undefined) {
                const result = await fetchGasPrice(gasEstimate.toString());

                if (result.success) {
                    setEstimateGasUSD(result.data);
                } else {
                    if (retryCount < MAX_RETRIES) {
                        console.log(
                            `Attempt ${retryCount + 1} failed. Retrying in ${RETRY_DELAY / 1000} seconds...`
                        );
                        setTimeout(() => fetchGasPriceData(retryCount + 1), RETRY_DELAY);
                    } else {
                        setGasFetchStatus('failed to fetch network fees');
                        console.error('Max retries reached. Could not fetch gas estimate.');
                    }
                }
            }
        };

        fetchGasPriceData();
    }, [gasEstimate]);

    const memberRole = checkIfAdmin(adminAddress, address?.toString());
    const {
        data: dataSVG,
        //refetch: refetchSVG,  // probably use in a future
        isError: isErrorSVG,
        isLoading: isLoadingSVG,
    } = RenderSVG([nameAtTLN, formattedDate, memberRole, communityValue, CS]);

    const {
        write: writeRegName,
        receipt: receiptRegName,
        isPending: isPendingRegName,
        isSuccess: isSuccessRegName,
        isWriteError: isErrorRegNameWrite,
        isTxError: isErrorRegNameTx,
        writeError: errorRegNameWrite,
        txError: errorRegNameTx,
        isLoading: isLoadingRegName,
        txRefetch: txRefetchRegName,
    } = NamesRegistryWriteHook({
        functionName: 'registerName',
        functionArgs: [nameValue, communityValue],
        txValue: BigInt(0),
    });

    useEffect(() => {
        if (address && dataNameInCommunityByAddress !== undefined) {
            if (address === undefined || dataNameInCommunityByAddress.toString() === '0') {
                setAlreadyHasName(false);
            } else {
                setAlreadyHasName(true);
            }
        }
    }, [dataNameInCommunityByAddress, address]);

    useEffect(() => {
        if (dataIsAdmin !== undefined && dataIsAdmin.toString() !== adminAddress) {
            setAdminAddress(dataIsAdmin.toString());
        }
    }, [dataIsAdmin, adminAddress]);

    useEffect(() => {
        if (dataSVG !== undefined && dataSVG !== null && dataSVG.toString() !== imgData) {
            setImgData(dataSVG.toString());
        }
    }, [dataSVG, imgData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 15000); // 15000 milliseconds = 15 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, [refetch]);

    useEffect(() => {
        const [status, validity] = checkName(Boolean(data), Boolean(alreadyHasName));
        setFeedBackText(status);
        setInputValidity(validity);
    }, [data, alreadyHasName]);

    useEffect(() => {
        if (
            feedBackText === 'Name is available for registration in this TLN (Top Level Name)' &&
            isCheckboxValid() &&
            !isLoadingIsAdmin &&
            address !== undefined &&
            alreadyHasName !== true
        ) {
            setButtonStatus('');
        } else {
            setButtonStatus('disabled');
        }
    }, [feedBackText, isChecked, address, alreadyHasName, isLoadingIsAdmin]);

    useEffect(() => {
        if (isErrorRegNameTx && errorCount <= 5) {
            const timer = setTimeout(() => {
                txRefetchRegName();
                setErrorCount(errorCount + 1);
            }, 2000);
            return () => clearTimeout(timer);
        }
        if (isPendingRegName || isSuccessRegName) {
            setErrorCount(0);
        }
    }, [isErrorRegNameTx, errorCount, txRefetchRegName, isPendingRegName, isSuccessRegName]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const isCheckboxValid = () => {
        return isChecked;
    };

    const handleRegisterClick = () => {
        writeRegName?.();
        setIsButtonClicked(true);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setIsButtonClicked(false);
        navigate('/');
    };

    const tos_url = 'https://drive.google.com/file/d/1nQ0Zrc218dltS4_VLLozjO6Scq_EofOB/view';

    function handleConnectClick(event: React.MouseEvent) {
        event.preventDefault();
    }

    return (
        <div className="hcc2">
            <Form className="nameregister">
                <Form.Group className="mb-3" controlId="formNameAtCommunity">
                    <Form.Control
                        type="text"
                        value={nameAtTLN}
                        disabled
                        isInvalid={inputValidity === 'isInvalid'}
                        isValid={inputValidity === 'isValid'}
                    />
                    <Form.Control.Feedback type="invalid">{feedBackText}</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">{feedBackText}</Form.Control.Feedback>
                </Form.Group>
                <>
                    {['light'].map((variant) => (
                        <Alert key={variant} variant={variant}>
                            <div className="">
                                <p>
                                    {' '}
                                    <b>Name price:</b> $0 (FREE){' '}
                                </p>
                                <p>
                                    <b>⛽️ Gas:</b>{' '}
                                    {estimateGasUSD
                                        ? `${estimateGasUSD.max_fee_per_gas.toFixed(2)} Gwei`
                                        : gasFetchStatus}
                                </p>
                                <p>
                                    <b>Est. network fee:</b>{' '}
                                    {estimateGasUSD ? (
                                        <>
                                            min ${estimateGasUSD.min.toFixed(2)} max $
                                            {estimateGasUSD.max.toFixed(2)}
                                        </>
                                    ) : (
                                        gasFetchStatus
                                    )}
                                </p>
                                <p>
                                    {' '}
                                    <b>Ownership period:</b> LIFELONG{' '}
                                </p>
                                <p>
                                    {' '}
                                    <b>TLN Admin:</b>{' '}
                                    {isLoadingIsAdmin || isErrorIsAdmin
                                        ? 'loading...'
                                        : adminAddress}{' '}
                                </p>
                            </div>
                        </Alert>
                    ))}
                </>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label={
                            <span>
                                I accept the <a href={tos_url}>Terms and Conditions</a>
                            </span>
                        }
                        isInvalid={!isCheckboxValid()}
                        onChange={handleCheckboxChange}
                    />
                </Form.Group>
                <Card style={{ objectFit: 'none', maxWidth: '20rem' }} bg="light">
                    {isLoadingSVG || isErrorSVG || !dataSVG ? (
                        'loading...'
                    ) : (
                        <object data={imgData} type="image/svg+xml">
                            {' '}
                            Card image{' '}
                        </object>
                    )}
                    <Card.Body>
                        {address ? (
                            <Button
                                variant="dark"
                                type="button"
                                disabled={buttonStatus === 'disabled'}
                                onClick={handleRegisterClick} // Call the function when the "Register" button is clicked
                            >
                                Get now
                            </Button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleConnectClick}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                }}
                            >
                                <ConnectButton />
                            </button>
                        )}
                    </Card.Body>
                </Card>

                {isButtonClicked && (
                    <TxStatusModalWithTokenId
                        show={showModal}
                        onClose={closeModal}
                        isPending={isPendingRegName}
                        isTxError={isErrorRegNameTx}
                        errorCount={errorCount}
                        txError={errorRegNameTx ? errorRegNameTx : undefined}
                        isWriteError={isErrorRegNameWrite}
                        writeError={errorRegNameWrite ? errorRegNameWrite : undefined}
                        isLoading={isLoadingRegName}
                        isSuccess={isSuccessRegName}
                        receipt={receiptRegName ? receiptRegName : undefined}
                        tokenId={tokenId ? tokenId : undefined}
                    />
                )}
            </Form>
        </div>
    );
}

export default NameRegister;
