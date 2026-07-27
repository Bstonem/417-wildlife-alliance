import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>Certified company</Badge>);
    expect(screen.getByText("Certified company")).toBeInTheDocument();
  });

  it("applies the variant class", () => {
    render(<Badge variant="blue">Blue</Badge>);
    expect(screen.getByText("Blue")).toHaveClass("bg-blue/12");
  });
});
