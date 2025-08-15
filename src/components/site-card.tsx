"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";
import { Site } from "@/types/site";

interface SiteCardProps {
  site: Site;
  onCategoryToggle: (category: string) => void;
}

export function SiteCard({ site, onCategoryToggle }: SiteCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-transparent backdrop-blur-3xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold wrap-break-word">
              {site.name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {getDomainFromUrl(site.link)}
            </CardDescription>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={site.logoPath || "/missing.png"}
              placeholder={"empty"}
              width={58}
              height={58}
              alt={`${site.name} preview`}
              className="w-12 h-12 rounded-lg object-cover border"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {site.description.match(/[.!?]$/)
            ? site.description
            : site.description + "."}
        </p>

        <div className="flex flex-wrap gap-1">
          {site.categories.map((category) => (
            <Badge
              key={category}
              variant={"outline"}
              className="text-xs cursor-pointer"
              onClick={() => onCategoryToggle(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>Updated {formatDate(site.lastUpdated)}</span>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(site.link, "_blank")}
            className="gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Visit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
