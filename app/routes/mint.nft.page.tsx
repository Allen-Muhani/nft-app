import React, { useEffect, useState } from "react";
import type { RootState } from "~/redux/store";
import { generateActionStartMinting } from '../features/buy_and_sell_tokens/actions.generators';
import { connect, type ConnectedProps } from "react-redux";
import { generateActionResetMinting } from "~/features/minting_certificate/actions.generators";

const MintNFTPage: React.FC<Props> = (props: Props) => {
    const [certificateName, setCertificateName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.dispatchMint(certificateName);
    };

    useEffect(() => {
        if (props.status == "error") {
            alert(props.error);
        }

        if (props.status == "finished_minitng") {
            alert(`Certificate with id ${props.id} is already mitned. Go to home page to view listing`);
            props.dispatchResetMinter();
            setCertificateName("");
        }

    }, [props.status]);

    return (
        <div className="max-w-xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Mint New NFT</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg space-y-6"
            >
                <div>
                    <label
                        htmlFor="certificateName"
                        className="block text-lg font-medium text-gray-700"
                    >
                        Certificate Name
                    </label>
                    <input
                        type="text"
                        id="certificateName"
                        value={certificateName}
                        onChange={(e) => setCertificateName(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="e.g. Solar Energy Certificate"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Mint NFT
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    status: state.minting.status,
    id: state.minting.id,
    error: state.fractionanlize.error,
});

const mapDispatchToProps = {
    dispatchResetMinter: generateActionResetMinting,
    dispatchMint: generateActionStartMinting,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps { }


export default connect(mapStateToProps, mapDispatchToProps)(MintNFTPage);

