"use client";

import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, ArrowUp, Plus } from "lucide-react";
import SearchResults from "./search-results";
import SuggestedTopics from "./suggested-topics";
import { AiSearchResults, tvly } from "@/lib/search";
import GradientTitle from "./gradient-title";
import Textarea from "react-textarea-autosize";

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<AiSearchResults | null>(
    null
  );
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await tvly.search(searchQuery, {
        includeAnswer: true,
        includeImages: true,
        maxResults: 5,
      });

      const results: AiSearchResults = {
        overviewDescription: response.answer || "No overview available.",
        results: response.results,
        images: response.images,
      };

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
      handleSearch(query);
    }
  };

  const handleClear = () => {
    setSearchResults(null);
    setQuery("");
  };

  return (
    <div className="min-h-screen text-foreground">
      <main className="container mx-auto p-4">
        <GradientTitle />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="flex items-center border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
              <Search className="absolute left-3 top-3 text-muted-foreground" />
              <Textarea
                ref={textareaRef}
                placeholder="Search anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow pl-10 pr-16 py-2 bg-transparent border-none focus:outline-none resize-none overflow-hidden min-h-[40px] max-h-[200px]"
                rows={1}
              />
              <Button
                onClick={() => handleSearch(query)}
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
                  <SuggestedTopics onTopicClick={handleSearch} />
                </CardContent>
              </Card>
            )}
          </ScrollArea>
        </div>
      </main>
      {searchResults && (
        <div className="fixed bottom-2 md:bottom-8 left-0 right-0 flex justify-center items-center mx-auto pointer-events-none">
          <Button
            type="button"
            variant="secondary"
            className="rounded-full bg-secondary/80 group transition-all hover:scale-105 pointer-events-auto"
            onClick={handleClear}
            disabled={isLoading}
          >
            <span className="text-sm mr-2 group-hover:block hidden animate-in fade-in duration-300">
              New
            </span>
            <Plus size={18} className="group-hover:rotate-90 transition-all" />
          </Button>
        </div>
      )}
    </div>
  );
}
