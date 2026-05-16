import { Card, CardContent } from "@/components/ui/card";

export default function AdminCasesPage() {
  return (
    <section className="section">
      <div className="container-shell">
        <p className="section-kicker">Admin</p>
        <h1 className="mt-3 text-4xl font-black">Animal help requests</h1>
        <Card className="mt-8">
          <CardContent className="p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            Review found-animal details, prioritize urgent situations, assign follow-up, track status, and keep internal notes away from public-facing pages.
          </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
