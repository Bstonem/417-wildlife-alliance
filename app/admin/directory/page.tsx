import { Card, CardContent } from "@/components/ui/card";

export default function AdminDirectoryPage() {
  return (
    <section className="section">
      <div className="container-shell">
        <p className="section-kicker">Admin</p>
        <h1 className="mt-3 text-4xl font-black">Directory management</h1>
        <Card className="mt-8">
          <CardContent className="p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            Review rehabber and organization listings, confirm public contact preferences, and keep private addresses, documents, and capacity notes protected.
          </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
