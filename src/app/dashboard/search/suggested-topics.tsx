import { Button } from "@/components/ui/button";
import { Cake, Car, Building, Plane } from "lucide-react";

const topics = [
  { icon: Cake, text: "Healthiest cooking oils" },
  { icon: Car, text: "Table of car brands by cost to maintain" },
  { icon: Building, text: "Country with highest tax rate" },
  { icon: Plane, text: "Most popular travel destinations 2024" },
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
          <topic.icon className="mr-2 h-4 w-4" />
          {topic.text}
        </Button>
      ))}
    </div>
  );
}
