import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ButtonLinkProps = {
  href: Route;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "clay";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const buttonVariant = variant === "primary" ? "default" : variant === "ghost" ? "quiet" : variant;

  return (
    <Button asChild variant={buttonVariant} size="lg" className={className}>
      <Link href={href}>
        {children}
        <ArrowRight aria-hidden="true" />
      </Link>
    </Button>
  );
}
