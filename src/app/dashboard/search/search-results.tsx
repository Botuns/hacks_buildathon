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
        <Card className=" ">
          <CardHeader>
            <CardTitle className="text-lg font-medium ">Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p className="  text-gray-700">{results.overviewDescription}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results.images.length > 0 && (
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-blue-50">
              Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative w-full pt-[56.25%]">
                  <Image
                    src={image.url}
                    alt={image.description || "Search result image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg absolute inset-0"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="">
        <CardHeader>
          <CardTitle className="text-lg font-medium ">Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.results.map((result, index) => (
              <div
                key={index}
                className="flex items-start space-x-4  shadow  p-2 rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full  flex items-center justify-center">
                  <Globe className="w-4 h-4 text-gray-700" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-gray-600">
                    {result.title}
                  </h3>
                  <Link href={result.url} className="text-sm text-gray-400">
                    <ExternalLink className="w-4 h-4 inline-block" />
                    <p className="text-xs text-gray-400 hover:undeline">
                      {result.url}
                    </p>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">{result.content}</p>
                </div>
                <Badge variant="secondary" className="bg-primary text-white">
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
