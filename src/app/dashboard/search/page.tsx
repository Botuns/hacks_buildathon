"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, Paperclip } from "lucide-react";
import SearchResults from "./search-results";
import SuggestedTopics from "./suggested-topics";
import { generateSearchResults } from "@/app/helpers";
import { OpenAiSearchResults } from "@/lib/search";

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] =
    useState<OpenAiSearchResults | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const results = await generateSearchResults(query);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching search results.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-foreground">
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Where knowledge begins
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Ask anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-20"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Explore"
                )}
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-200px)] mt-4">
            {searchResults ? (
              <SearchResults results={searchResults} />
            ) : (
              <Card>
                <CardContent>
                  <SuggestedTopics />
                </CardContent>
              </Card>
            )}
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
