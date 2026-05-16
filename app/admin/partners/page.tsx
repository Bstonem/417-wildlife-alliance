import { Card, CardContent } from "@/components/ui/card";

export default function AdminPartnersPage() {
  return (
    <section className="section">
      <div className="container-shell">
        <p className="section-kicker">Admin</p>
        <h1 className="mt-3 text-4xl font-black">Partners and certifications</h1>
        <Card className="mt-8">
          <CardContent className="p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            Review sponsor inquiries, business partnerships, and Wildlife Compassionate Company applications before approving any public recognition.
          </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
