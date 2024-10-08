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
    <div className="space-y-4 sm:space-y-6">
      {results.overviewDescription && (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm sm:prose-base prose-invert max-w-none">
              <p className="text-gray-700">{results.overviewDescription}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results.images.length > 0 && (
        <Card className="bg-secondary overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-blue-50">
              Images
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {results.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square sm:aspect-video"
                >
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

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Sources</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="space-y-2 sm:space-y-4">
            {results.results.map((result, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 shadow p-2 rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-gray-700" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-gray-600">
                    {result.title}
                  </h3>
                  <Link
                    href={result.url}
                    className="text-sm text-gray-400 break-all"
                  >
                    <ExternalLink className="w-4 h-4 inline-block mr-1" />
                    <span className="text-xs hover:underline">
                      {result.url}
                    </span>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">{result.content}</p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary text-white self-start sm:self-center mt-2 sm:mt-0"
                >
                  {Math.round(result.score * 100)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {results.results.length > 5 && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" size="sm">
            View {results.results.length - 5} more
          </Button>
        </div>
      )}
    </div>
  );
}
