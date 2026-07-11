import type { Metadata } from "next";
import { createMerchProduct } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { AdminNotice, AdminShell, StatCard } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Merch Admin",
  description: "Private merch management for 417 Wildlife Alliance.",
  path: "/admin/merch",
  noIndex: true
});

function currency(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

async function getMerchData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const { data } = await supabase.from("merch_products").select("*").order("created_at", { ascending: false }).limit(50);
  return data || [];
}

export default async function AdminMerchPage() {
  const session = await requireAdmin("/admin/merch");
  const products = await getMerchData();
  const merchProducts = products || [];

  return (
    <AdminShell
      email={session.email}
      title="Merch"
      description="Prepare mission gear that supports the rehabilitation fund and gives donors something shareable."
    >
      <AdminNotice message={!products ? "Supabase service-role access is not configured, so merch records cannot be loaded yet." : undefined} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Products" value={merchProducts.length} detail="Database-managed merch records" />
        <StatCard label="Published" value={merchProducts.filter((product) => product.published && product.status === "published").length} detail="Visible on the merch page" />
        <StatCard label="Coming soon" value={merchProducts.filter((product) => product.inventory_status === "coming_soon").length} detail="Launch queue" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <Card className="self-start">
          <CardHeader>
            <CardTitle>Add product</CardTitle>
            <CardDescription>Products can point to a future storefront or external checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createMerchProduct} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="number" min="0" step="0.01" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="inventory_status">Inventory</Label>
                  <select id="inventory_status" name="inventory_status" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm" defaultValue="coming_soon">
                    <option value="coming_soon">coming soon</option>
                    <option value="in_stock">in stock</option>
                    <option value="preorder">preorder</option>
                    <option value="sold_out">sold out</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image_path">Image path</Label>
                <Input id="image_path" name="image_path" placeholder="/assets/squirrel-3.jpg" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="external_url">External URL</Label>
                <Input id="external_url" name="external_url" type="url" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm" defaultValue="draft">
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" name="published" className="size-4 rounded border-input" />
                Publish product
              </label>
              <Button type="submit">Save product</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {merchProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{currency(product.price || 0)} · {product.inventory_status}</CardDescription>
                  </div>
                  <Badge variant={product.published && product.status === "published" ? "default" : "secondary"}>
                    {product.published && product.status === "published" ? "Published" : "Private"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                <p>{product.description}</p>
                {product.external_url ? <p className="mt-3 font-semibold text-foreground">{product.external_url}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
