import React from "react";
import CertificateDetails from "~/components/CertificateDetails";
import PurchaseTokens from "~/components/PurchaseTokens";


const CertificateDetailsPage: React.FC = () => {
    // Card details
    const card = {
        name: "Bob Smith",
        id: "002",
        dateCreated: "2025-04-05",
        fractionalized: false,
        availableKilowatts: 120, // kWh
        imageUrl: "https://via.placeholder.com/150", // Image URL (you can replace this with the actual image URL)
        pricePerToken: 5, // Price per token in USD
    };

    const handlePurchase = (tokenAmount: number, usdcAmount: number) => {
        alert(`Purchased ${tokenAmount} kWh tokens for ${usdcAmount} USDC`);
    };

    const handleFractionalize = () => {
        alert("Card fractionalized!");
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">


            {/* Right Section - Certificate Details */}
            <div className="flex flex-col h-full">
                <CertificateDetails
                    name={card.name}
                    id={card.id}
                    dateCreated={card.dateCreated}
                    fractionalized={card.fractionalized}
                    availableKilowatts={card.availableKilowatts}
                    imageUrl={card.imageUrl}
                    onFractionalize={handleFractionalize}
                />
            </div>

            {/* Left Section - Purchase Tokens */}
            <div className="flex flex-col h-full">
                <PurchaseTokens pricePerToken={card.pricePerToken} onPurchase={handlePurchase} />
            </div>
        </div>
    );
};

export default CertificateDetailsPage;
