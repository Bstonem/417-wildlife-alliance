"use client";

import { useState } from "react";
import { AlertTriangle, BookOpen, Camera, Info, Send } from "lucide-react";
import { animalTypes } from "@/lib/demo-data";
import { FormStatus } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type SubmitState = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};

const animalGuidance: Record<string, { title: string; text: string; href?: string }> = {
  Unknown: {
    title: "Not sure what animal it is?",
    text: "That is okay. Clear photos, size, location, and what happened are often more useful than a guess."
  },
  Squirrel: {
    title: "Squirrel situations often depend on age and injuries.",
    text: "If this is a baby squirrel, do not feed it. Photos, warmth concerns, nest damage, and pet contact matter.",
    href: "/found-animal/baby-squirrel"
  },
  Rabbit: {
    title: "Baby rabbits are often mistakenly removed.",
    text: "If the nest is intact and there are no injuries or pet contact, the mother may still be returning quietly.",
    href: "/found-animal/baby-rabbit"
  },
  Opossum: {
    title: "Check for vehicle or pet contact.",
    text: "If an adult opossum is injured or babies are visible, keep your distance and share photos before handling.",
    href: "/found-animal/opossum"
  },
  Raccoon: {
    title: "Do not handle raccoons.",
    text: "Keep people and pets away and contact an appropriate authority or licensed wildlife professional for guidance.",
    href: "/found-animal/raccoon"
  },
  Fox: {
    title: "Keep distance from adult wildlife.",
    text: "Do not chase, corner, feed, or attempt to contain a fox. Share location and behavior details from a safe distance.",
    href: "/found-animal/fox"
  },
  Skunk: {
    title: "Give skunks plenty of space.",
    text: "Daytime activity, disorientation, or pet contact are signs to get guidance. Otherwise, distance is usually all that is needed.",
    href: "/found-animal/skunk"
  },
  Deer: {
    title: "Most fawns found alone are fine.",
    text: "A quiet, still fawn is often waiting for its mother to return. Injured or trapped adults need qualified help.",
    href: "/found-animal/deer"
  },
  Songbird: {
    title: "Some young birds belong on the ground.",
    text: "Feathering, parent activity, cat contact, and injuries determine whether help is needed.",
    href: "/found-animal/baby-bird"
  },
  Raptor: {
    title: "Raptors need trained handling.",
    text: "Owls, hawks, and other raptors can injure people even when hurt. Keep distance and contact qualified help."
  },
  Waterfowl: {
    title: "Waterfowl need location details.",
    text: "Share whether the bird is tangled, injured, unable to walk, near traffic, or separated from a group."
  },
  "Reptile/amphibian": {
    title: "Many reptiles and amphibians can be left in place.",
    text: "Only intervene if the animal is injured, trapped, in traffic, or in immediate danger."
  },
  Other: {
    title: "Share what you can observe safely.",
    text: "Photos, size, location, behavior, visible injuries, and recent events help qualified contacts decide next steps."
  }
};

export function FoundAnimalForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [animalType, setAnimalType] = useState("Unknown");
  const [condition, setCondition] = useState("unknown");
  const [riskFlags, setRiskFlags] = useState({
    currently_contained: false,
    immediate_danger: false,
    visible_injury: false
  });

  const selectedGuidance = animalGuidance[animalType] || animalGuidance.Unknown;
  const urgent = riskFlags.immediate_danger || riskFlags.visible_injury || condition === "injured" || condition === "trapped";
  const displaced = condition === "orphaned" || condition === "displaced";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading", message: "Sending details..." });

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/animal-cases", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      setState({
        status: "error",
        message: result.message || "Please check the form and try again."
      });
      return;
    }

    event.currentTarget.reset();
    setAnimalType("Unknown");
    setCondition("unknown");
    setRiskFlags({
      currently_contained: false,
      immediate_danger: false,
      visible_injury: false
    });
    setState({
      status: "success",
      message: `${result.message} Reference number: ${result.caseNumber}.`
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-md border border-border bg-surface p-4 shadow-sm sm:p-5 md:p-6">
      <FormStatus status={state.status} message={state.message} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="finder_name">Your name</Label>
          <Input id="finder_name" name="finder_name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="preferred_contact_method">Preferred contact</Label>
          <Select name="preferred_contact_method" defaultValue="any">
            <SelectTrigger id="preferred_contact_method">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="finder_phone">Phone</Label>
          <Input id="finder_phone" name="finder_phone" type="tel" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="finder_email">Email</Label>
          <Input id="finder_email" name="finder_email" type="email" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="animal_type">Animal type</Label>
          <Select name="animal_type" value={animalType} onValueChange={setAnimalType} required>
            <SelectTrigger id="animal_type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {animalTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="approximate_age">Approximate age</Label>
          <Select name="approximate_age" defaultValue="unknown">
            <SelectTrigger id="approximate_age">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unknown">Not sure</SelectItem>
              <SelectItem value="baby">Baby</SelectItem>
              <SelectItem value="juvenile">Juvenile</SelectItem>
              <SelectItem value="adult">Adult</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="condition">Condition</Label>
          <Select name="condition" value={condition} onValueChange={setCondition} required>
            <SelectTrigger id="condition">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="injured">Visible injury</SelectItem>
              <SelectItem value="orphaned">Possibly orphaned</SelectItem>
              <SelectItem value="displaced">Displaced</SelectItem>
              <SelectItem value="trapped">Trapped or stuck</SelectItem>
              <SelectItem value="unknown">Not sure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={urgent ? "rounded-md border border-clay/30 bg-clay/10 p-4" : "rounded-md border border-blue/25 bg-blue/10 p-4"}>
        <div className="flex items-start gap-3">
          <span className={urgent ? "mt-0.5 text-clay-strong" : "mt-0.5 text-blue-strong"}>
            {urgent ? <AlertTriangle size={20} aria-hidden="true" /> : <Info size={20} aria-hidden="true" />}
          </span>
          <div>
            <p className="text-sm font-bold">{urgent ? "This may need immediate help." : selectedGuidance.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {urgent
                ? "If a person is in danger, call emergency services. If the animal is injured, trapped, or in immediate danger, also contact a licensed rehabber, animal control, conservation authority, or local public-safety resource directly."
                : selectedGuidance.text}
            </p>
            {!urgent && displaced ? (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Displaced or possibly orphaned animals often need careful guidance before anyone feeds, moves, or keeps them.
              </p>
            ) : null}
            {selectedGuidance.href ? (
              <a href={selectedGuidance.href} className="focus-ring mt-3 inline-flex items-center gap-2 rounded-md text-sm font-bold text-primary">
                <BookOpen size={16} aria-hidden="true" />
                Read the related guide
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="location_text">Location or nearest cross streets</Label>
          <Input id="location_text" name="location_text" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="county">County</Label>
          <Input id="county" name="county" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">What happened?</Label>
        <Textarea id="description" name="description" required rows={5} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="displacement_context">What may have displaced the animal?</Label>
        <Input
          id="displacement_context"
          name="displacement_context"
          placeholder="Tree work, nest down, pet interaction, storm, vehicle, unknown"
        />
      </div>

      <div className="grid gap-3 rounded-md border border-border bg-muted/45 p-4 text-sm">
        <label className="flex items-start gap-3">
          <input
            name="currently_contained"
            type="checkbox"
            className="mt-1"
            checked={riskFlags.currently_contained}
            onChange={(event) => setRiskFlags((current) => ({ ...current, currently_contained: event.target.checked }))}
          />
          <span>The animal is currently contained.</span>
        </label>
        <label className="flex items-start gap-3">
          <input
            name="immediate_danger"
            type="checkbox"
            className="mt-1"
            checked={riskFlags.immediate_danger}
            onChange={(event) => setRiskFlags((current) => ({ ...current, immediate_danger: event.target.checked }))}
          />
          <span>The animal is in immediate danger.</span>
        </label>
        <label className="flex items-start gap-3">
          <input
            name="visible_injury"
            type="checkbox"
            className="mt-1"
            checked={riskFlags.visible_injury}
            onChange={(event) => setRiskFlags((current) => ({ ...current, visible_injury: event.target.checked }))}
          />
          <span>There is a visible injury.</span>
        </label>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="photos">Photos</Label>
        <span className="flex flex-col items-start gap-2 rounded-md border border-dashed border-input bg-white px-3 py-4 font-normal text-muted-foreground sm:flex-row sm:items-center">
          <Camera className="shrink-0" size={18} aria-hidden="true" />
          <input id="photos" name="photos" type="file" accept="image/*" multiple className="w-full text-sm" />
        </span>
      </div>

      <label className="flex items-start gap-3 text-sm leading-6">
        <input name="consent_to_share" type="checkbox" required className="mt-1" />
        <span>I consent to 417 Wildlife Alliance sharing this information with appropriate licensed or permitted wildlife care contacts.</span>
      </label>

      <Button
        type="submit"
        disabled={state.status === "loading"}
        size="lg"
        className="w-full sm:w-fit"
      >
        <Send size={18} aria-hidden="true" />
        Send animal details
      </Button>
    </form>
  );
}
