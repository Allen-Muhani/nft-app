// components/InfoCard.tsx
import React from "react";
import { useNavigate } from "react-router";

interface InfoCardProps {
    name: string;
    id: string;
    dateCreated: string;
    imageUrl: string;
    fractionalized: boolean;
    remainingKilowatts: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
    name,
    id,
    dateCreated,
    imageUrl,
    fractionalized,
    remainingKilowatts
}) => {

    let navigator = useNavigate();
    const navigate = () => {
        navigator(`certificate-details/${id}`)
    }
    return (
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4">
            <img
                src={imageUrl}
                alt={name}
                className="w-24 h-24 rounded-full object-cover shadow"
            />
            <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-500">ID: {id}</p>
                <p className="text-sm text-gray-400">Created: {dateCreated}</p>
                <p className="text-sm text-gray-500">
                    Fractionalized: {fractionalized ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-500">Remaining Kilowatts: {remainingKilowatts} kWh</p>
            </div>
            <button
                onClick={navigate}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
            >
                View Details
            </button>
        </div>
    );
};

export default InfoCard;
