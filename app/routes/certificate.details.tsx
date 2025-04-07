import React, { useEffect, useState } from "react";
import { connect, type ConnectedProps } from "react-redux";
import CertificateDetails from "~/components/CertificateDetails";
import PurchaseTokens from "~/components/PurchaseTokens";
import type { NFTCert } from "~/features/fetch_nfts/types";
import { generateActionResetFractionalizing, generateActionStartFractionizing } from "~/features/fractionize_cetificate/actions.generators";
import type { RootState } from "~/redux/store";
import type { Route } from "../+types/root";


const CertificateDetailsPage: React.FC<Props> = (props: Props) => {
    // Card details
    const [cardInfo, setCarInfo] = useState<NFTCert>();

    useEffect(() => {
        if (props.status == "error") {
            alert(props.error);
        }

        if (props.status == "finished_fractionizing") {
            alert(`Certificate with id ${props.id} has been fractionized!!`);
            props.dispatchResetFractionalizer();
        }
    }, [props.status, props.certs, props.error])

    useEffect(() => {
        setCarInfo(props.certs.get(Number(props.params.certificateId)));
    }, [props.certs])

    const handlePurchase = (tokenAmount: number, usdcAmount: number) => {
        alert(`Purchased ${tokenAmount} kWh tokens for ${usdcAmount} USDC`);
    };

    const handleFractionalize = () => {
        props.dispatchFractionalize(Number(props.params.certificateId));
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">


            {/* Right Section - Certificate Details */}
            <div className="flex flex-col h-full">
                <CertificateDetails
                    name={cardInfo?.code.toString() ?? ""}
                    id={cardInfo?.id ?? Number(0)}
                    dateCreated={cardInfo?.dateCreated.toString() ?? ""}
                    fraction_address={cardInfo?.fractionAddress.toString() ?? ''}
                    availableKilowatts={cardInfo?.availablekWts.valueOf() ?? 0}
                    my_balance={cardInfo?.myBalance.valueOf() ?? 0}
                    imageUrl={"https://via.placeholder.com/150"}
                    onFractionalize={handleFractionalize}
                />
            </div>

            {/* Left Section - Purchase Tokens */}
            <div className="flex flex-col h-full">
                <PurchaseTokens pricePerToken={cardInfo?.price.valueOf() ?? 0} onPurchase={handlePurchase} />
            </div>
        </div>
    );
};


const mapStateToProps = (state: RootState) => ({
    status: state.fractionanlize.status,
    id: state.fractionanlize.id,
    error: state.fractionanlize.error,
    certs: state.nft_cert_colletion.certs
});

const mapDispatchToProps = {
    dispatchFractionalize: generateActionStartFractionizing,
    dispatchResetFractionalizer: generateActionResetFractionalizing
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;


interface Props extends ReduxProps, Route.LoaderArgs { }


export default connect(mapStateToProps, mapDispatchToProps)(CertificateDetailsPage);