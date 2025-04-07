import InfoCard from "~/components/InfoCard";
import type { Route } from "./+types/home";
import { connect, type ConnectedProps } from "react-redux";
import { generateActionStartFetchingNFT } from "~/features/fetch_nfts/actions.generators";
import type { RootState } from "~/redux/store";
import { useEffect, useState } from "react";
import { generateActionFetchNFT } from '../features/fetch_nfts/actions.generators';
import type { NFTCert } from "~/features/fetch_nfts/types";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Home: React.FC<Props> = (props: Props) => {

  const [cardData, setCardData] = useState<NFTCert[]>([]);

  useEffect(() => {

    const nftCertArray: NFTCert[] = Array.from(props.certs.values());

    let x = nftCertArray.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    });

    setCardData(x);
  }, [props.new_nft, props.certs]);


  const refresh = () => {
    props.startFetchingNFT();
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <button onClick={refresh}>Query Data</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <InfoCard
              key={index}
              name={card.code.toString()}
              id={card.id.toString()}
              dateCreated={card.dateCreated.toString()}
              imageUrl={"https://via.placeholder.com/100"}
              remainingKilowatts={card.availablekWts.valueOf()}
              fraction_address={card.fractionAddress.toString()}
              my_balance={card.myBalance.toString()} />
          ))}
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state: RootState) => ({
  status: state.nft_cert_colletion.status,
  certs: state.nft_cert_colletion.certs,
  error: state.nft_cert_colletion.error,
  new_nft: state.minting.id
});

const mapDispatchToProps = {
  fetchNFt: generateActionFetchNFT,
  startFetchingNFT: generateActionStartFetchingNFT,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps { }


export default connect(mapStateToProps, mapDispatchToProps)(Home);
