"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Filter, MapPin, PhoneCall, RotateCcw, Search, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type DirectoryListing = {
  name: string;
  type: string;
  serviceArea: string;
  species: string[];
  status: string;
  contact: string;
  url?: string;
  counties?: string[];
  kind?: "rehabber" | "resource";
  priority?: "normal" | "urgent";
};

type DirectoryBrowserProps = {
  listings: DirectoryListing[];
};

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function statusVariant(status: string): "default" | "blue" | "clay" | "secondary" | "outline" {
  const normalized = status.toLowerCase();
  if (normalized.includes("accepting") || normalized.includes("available")) {
    return "default";
  }
  if (normalized.includes("urgent") || normalized.includes("emergency")) {
    return "clay";
  }
  if (normalized.includes("limited") || normalized.includes("varies")) {
    return "blue";
  }
  if (normalized.includes("resource") || normalized.includes("guidance")) {
    return "secondary";
  }
  return "outline";
}

export function DirectoryBrowser({ listings }: DirectoryBrowserProps) {
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState("all");
  const [county, setCounty] = useState("all");
  const [status, setStatus] = useState("all");
  const [kind, setKind] = useState("all");

  const speciesOptions = useMemo(() => uniqueSorted(listings.flatMap((listing) => listing.species)), [listings]);
  const countyOptions = useMemo(() => uniqueSorted(listings.flatMap((listing) => listing.counties || [])), [listings]);
  const statusOptions = useMemo(() => uniqueSorted(listings.map((listing) => listing.status)), [listings]);

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return listings.filter((listing) => {
      const haystack = [
        listing.name,
        listing.type,
        listing.serviceArea,
        listing.status,
        listing.contact,
        ...(listing.species || []),
        ...(listing.counties || [])
      ].join(" ").toLowerCase();

      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesSpecies = species === "all" || listing.species.includes(species) || listing.species.includes("Unknown");
      const matchesCounty = county === "all" || listing.counties?.includes(county);
      const matchesStatus = status === "all" || listing.status === status;
      const matchesKind = kind === "all" || (listing.kind || "rehabber") === kind;

      return matchesQuery && matchesSpecies && matchesCounty && matchesStatus && matchesKind;
    });
  }, [county, kind, listings, query, species, status]);

  function resetFilters() {
    setQuery("");
    setSpecies("all");
    setCounty("all");
    setStatus("all");
    setKind("all");
  }

  return (
    <div className="mt-8 grid gap-6">
      <Card className="border-clay/25 bg-clay/8">
        <CardHeader className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
          <span className="flex size-11 items-center justify-center rounded-md bg-clay/12 text-clay-strong">
            <ShieldAlert size={22} aria-hidden="true" />
          </span>
          <div>
            <CardTitle>Not sure who to call?</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              If a person is in danger, call emergency services. If wildlife is near traffic, trapped in a structure, or visibly injured, use the found-animal form and also contact the appropriate licensed rehabber, animal control, conservation authority, or local public-safety resource.
            </p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Filter local wildlife help</CardTitle>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Try animal type, county, availability, or resource type. These sample records show how a fuller directory will behave.
              </p>
            </div>
            <Badge variant="blue" className="w-fit">
              {filteredListings.length} results
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_auto] lg:items-end">
            <div className="grid gap-2">
              <Label htmlFor="directory-search">Search</Label>
              <span className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="directory-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="pl-9"
                  placeholder="Name, species, county, notes"
                />
              </span>
            </div>

            <div className="grid gap-2">
              <Label>Animal type</Label>
              <Select value={species} onValueChange={setSpecies}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All animals</SelectItem>
                  {speciesOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>County</Label>
              <Select value={county} onValueChange={setCounty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All counties</SelectItem>
                  {countyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {statusOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Type</Label>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="rehabber">Rehabbers</SelectItem>
                  <SelectItem value="resource">Information</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="button" variant="secondary" onClick={resetFilters}>
              <RotateCcw size={16} aria-hidden="true" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredListings.map((listing) => (
          <Card key={listing.name} className={listing.priority === "urgent" ? "border-clay/35 bg-clay/8" : "bg-surface"}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">{listing.type}</p>
                  <CardTitle className="mt-2">{listing.name}</CardTitle>
                </div>
                <Badge variant={statusVariant(listing.status)}>{listing.status}</Badge>
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={17} aria-hidden="true" />
                {listing.serviceArea}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {listing.species.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
              {listing.counties?.length ? (
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {listing.counties.join(" / ")}
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{listing.contact}</p>
              {listing.url ? (
                <a
                  href={listing.url}
                  className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md text-sm font-bold text-primary"
                >
                  {listing.kind === "resource" ? "View guidance" : "Contact or learn more"}
                  {listing.url.startsWith("http") ? <ExternalLink size={15} aria-hidden="true" /> : <PhoneCall size={15} aria-hidden="true" />}
                </a>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {!filteredListings.length ? (
        <Card>
          <CardContent className="p-6 text-sm leading-6 text-muted-foreground">
            No listings match those filters yet. Try broadening the search, or use the found-animal form to share details so the situation can be reviewed.
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
