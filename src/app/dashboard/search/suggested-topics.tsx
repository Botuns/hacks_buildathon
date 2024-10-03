import { Button } from "@/components/ui/button";
import { BuildingIcon, CakeIcon, CarIcon, PlaneIcon } from "lucide-react";
// import { Cake, Car, Building, Plane } from "lucide-react";

const topics = [
  { icon: CakeIcon, text: "Healthiest cooking oils" },
  { icon: CarIcon, text: "Table of car brands by cost to maintain" },
  { icon: BuildingIcon, text: "Country with highest tax rate" },
  { icon: PlaneIcon, text: "Most popular travel destinations 2024" },
];

export default function SuggestedTopics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {topics.map((topic, index) => (
        <Button
          key={index}
          variant="outline"
          className="justify-start text-primary"
        >
          <topic.icon className="mr-2  bg-yellow-500 p-1 rounded-full text-white" />
          {/* 🍰 */}
          {topic.text}
        </Button>
      ))}
    </div>
  );
}
