// CertificateDetails.tsx
import React from "react";
import { EMPTY_ADDRESS } from "~/features/web3/web3";

type CertificateDetailsProps = {
    name: string;
    id: Number;
    dateCreated: string;
    fraction_address: string;
    availableKilowatts: number;
    my_balance: number;
    imageUrl: string;
    onFractionalize: () => void;
};

const CertificateDetails: React.FC<CertificateDetailsProps> = ({
    name,
    id,
    dateCreated,
    fraction_address,
    availableKilowatts,
    imageUrl,
    onFractionalize,
    my_balance
}) => {

    let fractionalized: Boolean = !EMPTY_ADDRESS.match(fraction_address);

    return (
        <div className="space-y-6">

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 pb-6">Certificate Details</h2>
                <div className="flex items-center space-x-6">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                        <p className="text-gray-600">ID: {id.toString()}</p>
                        <p className="text-gray-600">Created: {dateCreated}</p>
                        <p className="text-gray-600">
                            Fractionalized:{" "}
                            <span className={fractionalized ? "text-green-500" : "text-red-500"}>
                                {fractionalized ? "Yes" : "No"}
                            </span>
                        </p>
                        <p className="text-gray-600">Available Kilowatts: {availableKilowatts} kWh</p>
                        <p className="text-gray-600">My Kilowatts: {my_balance} kWh</p>
                    </div>
                </div>

                <button
                    onClick={onFractionalize}
                    className="w-full py-2 mt-6 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!!fractionalized}
                >
                    Fractionalize
                </button>
            </div>
        </div>
    );
};

export default CertificateDetails;
