import { Card, CardContent } from "@/components/ui/card";

export default function AdminDonationsPage() {
  return (
    <section className="section">
      <div className="container-shell">
        <p className="section-kicker">Admin</p>
        <h1 className="mt-3 text-4xl font-black">Donations</h1>
        <Card className="mt-8">
          <CardContent className="p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            Track gifts, fund preferences, donor follow-up, receipts, and rehabber support decisions from one protected operations view.
          </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
