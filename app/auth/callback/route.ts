import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-session";

const SAFE_NEXT_PREFIXES = ["/admin", "/rehabbers"];

function getSafeNext(value: string | null) {
  if (value && SAFE_NEXT_PREFIXES.some((prefix) => value === prefix || value.startsWith(`${prefix}/`))) {
    return value;
  }

  return "/admin";
}

function getLoginPathFor(next: string) {
  return next.startsWith("/rehabbers") ? "/rehabbers/login" : "/admin/login";
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeNext(requestUrl.searchParams.get("next"));
  const loginPath = getLoginPathFor(next);

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL(`${loginPath}?error=invalid&next=${encodeURIComponent(next)}`, request.url));
}
