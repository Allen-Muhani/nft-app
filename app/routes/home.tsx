import InfoCard from "~/components/InfoCard";
import type { Route } from "./+types/home";

const cardData = [
  {
    name: "Alice Johnson",
    id: "001",
    dateCreated: "2025-04-06",
    imageUrl: "https://via.placeholder.com/100",
    fractionalized: true,
    remainingKilowatts: 150,
  },
  {
    name: "Bob Smith",
    id: "002",
    dateCreated: "2025-04-05",
    imageUrl: "https://via.placeholder.com/100",
    fractionalized: false,
    remainingKilowatts: 120,
  },
  {
    name: "Charlie Rose",
    id: "003",
    dateCreated: "2025-04-04",
    imageUrl: "https://via.placeholder.com/100",
    fractionalized: true,
    remainingKilowatts: 85,
  },
  // Add more cards as needed
];
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <InfoCard
              key={index}
              name={card.name}
              id={card.id}
              dateCreated={card.dateCreated}
              imageUrl={card.imageUrl}
              fractionalized={card.fractionalized}
              remainingKilowatts={card.remainingKilowatts} />
          ))}
        </div>
      </div>
    </main>
  );
}
