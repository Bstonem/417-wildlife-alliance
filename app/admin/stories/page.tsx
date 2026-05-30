import type { Metadata } from "next";
import { createPost } from "@/app/admin/actions";
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
  title: "Stories Admin",
  description: "Private story and news publishing tools for 417 Wildlife Alliance.",
  path: "/admin/stories",
  noIndex: true
});

async function getStoryData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(50);
  return data || [];
}

export default async function AdminStoriesPage() {
  const session = await requireAdmin("/admin/stories");
  const posts = await getStoryData();
  const storyPosts = posts || [];

  return (
    <AdminShell
      email={session.email}
      title="Stories and news"
      description="Publish impact updates, rehabber stories, partner announcements, and education posts donors can share."
    >
      <AdminNotice message={!posts ? "Supabase service-role access is not configured, so story records cannot be loaded yet." : undefined} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Posts" value={storyPosts.length} detail="Database-managed news and stories" />
        <StatCard label="Published" value={storyPosts.filter((post) => post.status === "published").length} detail="Visible on the public stories page" />
        <StatCard label="Drafts" value={storyPosts.filter((post) => post.status !== "published").length} detail="Internal editorial queue" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="self-start">
          <CardHeader>
            <CardTitle>Create story</CardTitle>
            <CardDescription>Published posts appear on the public stories page.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createPost} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea id="summary" name="summary" required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" placeholder="Impact, News, Rehabber story" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="Springfield, MO" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cover_image_path">Cover image path</Label>
                <Input id="cover_image_path" name="cover_image_path" placeholder="/assets/squirrel-4.jpg" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="body">Body</Label>
                <Textarea id="body" name="body" className="min-h-48" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm" defaultValue="draft">
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </div>
              <Button type="submit">Save story</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {storyPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.category}{post.location ? ` · ${post.location}` : ""}</CardDescription>
                  </div>
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                <p>{post.summary}</p>
                <p className="mt-3 font-semibold text-foreground">/{post.slug}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
