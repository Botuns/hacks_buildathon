import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { OpenAiSearchResults } from "@/lib/search";

interface SearchResultsProps {
  results: OpenAiSearchResults;
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            &quot;{results.overviewDescription}&quot;
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{results.overviewDescription}</p>
        </CardContent>
      </Card>
      {results.results.map((result, index) => (
        <Card key={index}>
          <CardContent className="flex items-start space-x-4 p-4">
            <div className="flex-shrink-0">
              <Image
                src={
                  "https://img.freepik.com/free-vector/search-concept-landing-page_23-2148211329.jpg"
                }
                alt="Result image"
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <p className="text-sm text-muted-foreground mb-2">
                {result.descriptionAnswer}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-green-200">
                  Confidence: {result.confidenceLevel}%
                </Badge>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={result.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
