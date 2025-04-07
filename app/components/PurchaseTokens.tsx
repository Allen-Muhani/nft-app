import React, { useEffect, useState } from "react";
import { connect, type ConnectedProps } from "react-redux";
import { generateActionStartBuy, generateActionStartSell } from "~/features/buy_and_sell_tokens/actions.generators";
import type { RootState } from "~/redux/store";
import { generateActionResetBuySell } from '../features/buy_and_sell_tokens/actions.generators';

type PurchaseTokensProps = {
    pricePerToken: number;
    fractiona_address: String;
    fractionalized: boolean
};

const PurchaseTokens: React.FC<Props> = (props: Props) => {
    const [buy, setBuy] = useState(true)
    const [tokenAmountStr, setTokenAmountStr] = useState("");
    const [tokenAmount, setTokenAmount] = useState(0);
    const [usdcAmount, setUsdcAmount] = useState(0);

    const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value === "" ? "0" : e.target.value;
        const amount = parseFloat(v);
      
        if (amount >= 0 && amount < 1000) {
            setTokenAmount(amount);
            setTokenAmountStr(v);
            setUsdcAmount(amount * props.pricePerToken);
        }
    };

    const handleTransaction = (tokenAmount: number, usdcAmount: number) => {
        const token_watts = tokenAmount * 1000;
        const usdc_wei = usdcAmount * 10 ** 6;
        if (token_watts > 0 && usdc_wei > 0) {
            if (buy) {
                props.dispatchBuy(props.fractiona_address, token_watts, usdc_wei);
            } else {
                props.dispatchSell(props.fractiona_address, token_watts, usdc_wei);
            }
        }
    };

    useEffect(()=> {
        if (props.status == "error") {
            alert(props.error);
            props.dispatchReset();
            setTokenAmount(0);
            setTokenAmountStr("");
            setUsdcAmount(0);
        }

        if (props.status == "finished_buy") {
            alert(`Successfully purchased ${tokenAmount} watts at ${usdcAmount} USDC`);
            props.dispatchReset();
        }

        if (props.status == "finished_sell") {
            alert(`Successfully sold ${tokenAmount} watts at ${usdcAmount} USDC`);
            props.dispatchReset();
        }
    }, [props.error, props.status])

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <button
                    type="button"
                    onClick={() => setBuy(!buy)}
                    className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8 "
                >
                    {buy ? 'I want to Sell' : 'I want to Buy'}
                </button>
                <h2 className="text-3xl font-bold text-gray-800 pb-6">{buy ? 'Purchase Tokens' : 'Sell Tokens'}</h2>
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
                        <div className="text-lg font-semibold text-gray-700">${props.pricePerToken.toFixed(2)} USDC</div>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-gray-800">Total in USDC</label>
                        <div className="text-lg font-semibold text-gray-700">{usdcAmount.toFixed(2)} USDC</div>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleTransaction(tokenAmount, usdcAmount)}
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700  disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!props.fractionalized}
                        disabled:opacity-50 disabled:cursor-not-allowed
                    >
                        {buy ? 'Buy Tokens' : 'Sell Tokens'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    status: state.buy_sell.status,
    error: state.buy_sell.error,
    certs: state.nft_cert_colletion.certs
});

const mapDispatchToProps = {
    dispatchBuy: generateActionStartBuy,
    dispatchSell: generateActionStartSell,
    dispatchReset: generateActionResetBuySell,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;


interface Props extends ReduxProps, PurchaseTokensProps { }


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTokens);


