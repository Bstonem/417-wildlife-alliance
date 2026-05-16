"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { operatingLanes } from "@/lib/demo-data";

export function OperatingLanes() {
  return (
    <Tabs defaultValue="public" className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-1 md:grid-cols-4">
        {operatingLanes.map((lane) => (
          <TabsTrigger key={lane.value} value={lane.value} className="min-h-11">
            {lane.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {operatingLanes.map((lane) => {
        const Icon = lane.icon;

        return (
          <TabsContent key={lane.value} value={lane.value}>
            <div className="grid gap-6 rounded-md border border-border bg-surface p-5 shadow-sm md:grid-cols-[0.8fr_1.2fr] md:p-6">
              <div>
                <span className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <Badge variant="blue" className="mt-5">{lane.label}</Badge>
              </div>
              <div>
                <h3 className="text-3xl font-black leading-tight">{lane.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{lane.text}</p>
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
