import React, { useState } from "react";

type PurchaseTokensProps = {
    pricePerToken: number;
    onPurchase: (tokenAmount: number, usdcAmount: number) => void;
};

const PurchaseTokens: React.FC<PurchaseTokensProps> = ({ pricePerToken, onPurchase }) => {
    const [tokenAmountStr, setTokenAmountStr] = useState("");
    const [tokenAmount, setTokenAmount] = useState(0);
    const [usdcAmount, setUsdcAmount] = useState(0);

    const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value === "" ? "0" : e.target.value;
        const amount = parseFloat(v);
        setTokenAmount(amount);
        setTokenAmountStr(v);
        setUsdcAmount(amount * pricePerToken);
    };

    return (
        <div className="space-y-6">

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 pb-6">Purchase Tokens</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-lg font-semibold text-gray-800" htmlFor="tokenAmount">
                            Amount of Tokens (in kWh)
                        </label>
                        <input
                            type="number"
                            id="tokenAmount"
                            value={tokenAmountStr}
                            onChange={handleTokenAmountChange}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-gray-800">Price Per kWh</label>
                        <div className="text-lg font-semibold text-gray-700">${pricePerToken.toFixed(2) } USDC</div>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-gray-800">Total in USDC</label>
                        <div className="text-lg font-semibold text-gray-700">{usdcAmount.toFixed(2)} USDC</div>
                    </div>

                    <button
                        type="button"
                        onClick={() => onPurchase(tokenAmount, usdcAmount)}
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Purchase Tokens
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PurchaseTokens;
