import { Button } from "@/components/ui/button";
import { CakeIcon, CarIcon, BuildingIcon, PlaneIcon } from "lucide-react";

const topics = [
  { icon: CakeIcon, text: "Healthiest cooking oils" },
  { icon: CarIcon, text: "Table of car brands by cost to maintain" },
  { icon: BuildingIcon, text: "Country with highest tax rate" },
  { icon: PlaneIcon, text: "Most popular travel destinations 2024" },
];

interface SuggestedTopicsProps {
  onTopicClick: (query: string) => void;
}

export default function SuggestedTopics({
  onTopicClick,
}: SuggestedTopicsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {topics.map((topic, index) => (
        <Button
          key={index}
          variant="outline"
          className="justify-start text-primary"
          onClick={() => onTopicClick(topic.text)}
        >
          <topic.icon className="mr-2 bg-yellow-500 p-1 rounded-full text-white" />
          {topic.text}
        </Button>
      ))}
    </div>
  );
}
