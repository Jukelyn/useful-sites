"use client";

import { useState, useMemo } from "react";
import { SiteCard } from "@/components/site-card";
import { SearchFilters } from "@/components/search-filters";
import sitesData from "@/data/sites.json";
import { Site } from "@/types/site";
import { TextReveal } from "@/components/ui/text-reveal";
import { GradientBackground } from "@/components/ui/gradient-background";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");

  const sites: Site[] = sitesData;

  // Get all unique categories
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    sites.forEach((site) => {
      site.categories.forEach((category) => categories.add(category));
    });
    return Array.from(categories).sort();
  }, [sites]);

  const filteredAndSortedSites = useMemo(() => {
    const filtered = sites.filter((site) => {
      const matchesSearch =
        searchQuery === "" ||
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          site.categories.includes(category)
        );

      return matchesSearch && matchesCategories;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "updated":
          return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
          );
        case "updated-desc":
          return (
            new Date(a.lastUpdated).getTime() -
            new Date(b.lastUpdated).getTime()
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [sites, searchQuery, selectedCategories, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <GradientBackground
          className="from-slate-900 via-gray-900 to-slate-950 -z-10"
          transition={{ duration: 35, ease: "easeInOut", repeat: Infinity }}
        />
        {/* Header */}
        <div className="text-center mb-8">
          <TextReveal
            variant="stagger"
            className="text-4xl font-bold mt-4"
            startOnView={false} // some browsers have issues with this
          >
            useful sites that you should know.
          </TextReveal>
        </div>

        <div className="mb-8 max-w-4xl mx-auto">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            availableCategories={availableCategories}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedSites.length} of {sites.length} sites
          </p>
        </div>

        {filteredAndSortedSites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedSites.map((site, index) => (
              <SiteCard key={`${site.name}-${index}`} site={site} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-lg font-medium mb-2">No sites found</h3>
              <p>
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
            </div>
          </div>
        )}
        <p className="mt-4 text-lg text-muted-foreground mx-auto text-center">
          Credits to{" "}
          {
            <a
              className="underline"
              rel="_blank"
              href="https://instagram.com/setupsai/"
            >
              @setupsai
            </a>
          }{" "}
          on Instagram as a lot of these are sites that I collected from his
          videos.
        </p>
      </div>
    </div>
  );
}
