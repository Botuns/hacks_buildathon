import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe } from "lucide-react";
import { AiSearchResults } from "@/lib/search";
import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
  results: AiSearchResults;
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="space-y-6">
      {results.overviewDescription && (
        <Card className="bg-primary ">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-blue-50">
              Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p className="text-blue-100">{results.overviewDescription}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results.images.length > 0 && (
        <Card className="bg-primary ">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-blue-50">
              Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {results.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={image.url}
                    alt={image.description || "Search result image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-primary ">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-blue-50">
            Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.results.map((result, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Globe className="w-4 h-4 text-blue-50" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-blue-50">
                    {result.title}
                  </h3>
                  <Link href={result.url} className="text-sm text-blue-100">
                    <ExternalLink className="w-4 h-4 inline-block" />
                    <p className="text-xs text-blue-200 hover:undeline">
                      {result.url}
                    </p>
                  </Link>
                  <p className="text-sm text-blue-100 mt-1">{result.content}</p>
                </div>
                <Badge variant="secondary" className="bg-primary text-blue-100">
                  {Math.round(result.score * 100)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {results.results.length > 5 && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" className="">
            View {results.results.length - 5} more
          </Button>
        </div>
      )}
    </div>
  );
}
