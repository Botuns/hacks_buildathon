import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { OpenAiSearchResults } from "@/lib/search";
import { useEffect, useState } from "react";
import { fallbackImageUrl, isValidImageUrl } from ".";

interface SearchResultsProps {
  results: OpenAiSearchResults;
}

export default function SearchResults({ results }: SearchResultsProps) {
  const [validatedResults, setValidatedResults] = useState(results);
  useEffect(() => {
    const validateImages = async () => {
      const updatedResults = await Promise.all(
        results.results.map(async (result) => {
          const isValid = await isValidImageUrl(result.imageUrl);
          return {
            ...result,
            imageUrl: isValid ? result.imageUrl : fallbackImageUrl,
          };
        })
      );

      setValidatedResults({
        ...results,
        results: updatedResults,
      });
    };

    validateImages();
  }, [results]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Returned the following results based on your search query:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{validatedResults.overviewDescription}</p>
        </CardContent>
      </Card>
      {validatedResults.results.map((result, index) => (
        <Card key={index}>
          <CardContent className="flex items-start space-x-4 p-4 max-sm:flex-col">
            <div className="flex-shrink-0">
              <Image
                src={result.imageUrl}
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
                  Confidence: {result.confidenceLevel * 100}%
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
