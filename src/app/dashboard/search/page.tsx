"use client";

import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, ArrowUp } from "lucide-react";
import SearchResults from "./search-results";
import SuggestedTopics from "./suggested-topics";
import { generateSearchResults } from "@/app/helpers";
import { OpenAiSearchResults } from "@/lib/search";
import GradientTitle from "./gradient-title";

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] =
    useState<OpenAiSearchResults | null>(null);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen text-foreground">
      <main className="container mx-auto p-4">
        <GradientTitle />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="flex items-center border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
              <Search className="absolute left-3 top-3 text-muted-foreground" />
              <textarea
                ref={textareaRef}
                placeholder="Search anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow pl-10 pr-16 py-2 bg-transparent border-none focus:outline-none resize-none overflow-hidden min-h-[40px] max-h-[200px]"
                rows={1}
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-200px)] mt-4">
            {searchResults ? (
              <SearchResults results={searchResults} />
            ) : (
              <Card>
                <CardContent className="text-center items-center p-2">
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
