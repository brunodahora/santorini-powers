import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import type { Power } from "../data/powers";

import { PowerCard } from "./PowerCard";

// Stub Image to avoid errors in jsdom
class StubImage {
  onload: (() => void) | null = null;
  set src(_: string) {
    setTimeout(() => this.onload?.(), 0);
  }
}

const mockPower: Power = {
  id: "apollo",
  name: "Apollo",
  expansion: "base",
  row: 0,
  col: 2,
  description: "Your Worker may move into an opponent Worker's space.",
  bgaSlug: "Apollo",
  specialConditions: false,
  dice: false,
};

const mockPowerNoSlug: Power = {
  ...mockPower,
  id: "aurae",
  name: "Aurae",
  bgaSlug: null,
};

beforeEach(() => {
  vi.stubGlobal("Image", StubImage);
});

describe("Given a PowerCard in its default (front) state", () => {
  it("when rendered, then the front face sprite is visible and back face is hidden", () => {
    render(<PowerCard power={mockPower} />);
    // The card button should be present
    expect(
      screen.getByRole("button", { name: /apollo.*click to see details/i }),
    ).toBeInTheDocument();
    // BGA link should not be visible (back face is hidden)
    expect(screen.queryByRole("link", { name: /full strategy/i })).toBeNull();
  });

  it("when the user clicks the card, then the back face with name and BGA link is shown", async () => {
    const user = userEvent.setup();
    render(<PowerCard power={mockPower} />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("Apollo")).toBeInTheDocument();
    expect(
      screen.getByText("Your Worker may move into an opponent Worker's space."),
    ).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /full strategy/i });
    expect(link).toHaveAttribute(
      "href",
      "https://en.doc.boardgamearena.com/SantoriniPowerApollo",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("when the user clicks the card twice, then it flips back to the front", async () => {
    const user = userEvent.setup();
    render(<PowerCard power={mockPower} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));

    expect(
      screen.getByRole("button", { name: /apollo.*click to see details/i }),
    ).toBeInTheDocument();
  });
});

describe("Given a PowerCard with initiallyFlipped=true", () => {
  it("when rendered, then the back face is shown immediately", () => {
    render(<PowerCard power={mockPower} initiallyFlipped />);
    expect(screen.getByText("Apollo")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /full strategy/i }),
    ).toBeInTheDocument();
  });
});

describe("Given a PowerCard for a power with no BGA slug", () => {
  it("when flipped, then no Full Strategy link is rendered", async () => {
    const user = userEvent.setup();
    render(<PowerCard power={mockPowerNoSlug} />);

    await user.click(screen.getByRole("button"));

    expect(screen.queryByRole("link", { name: /full strategy/i })).toBeNull();
  });
});

describe("Given a PowerCard on its back face", () => {
  it("when the Full Strategy link is clicked, then the card does not flip back", async () => {
    const user = userEvent.setup();
    render(<PowerCard power={mockPower} initiallyFlipped />);

    const link = screen.getByRole("link", { name: /full strategy/i });
    await user.click(link);

    // Card should still show back face (link is still present)
    expect(
      screen.getByRole("link", { name: /full strategy/i }),
    ).toBeInTheDocument();
  });
});
