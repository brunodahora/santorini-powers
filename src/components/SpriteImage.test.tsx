import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { SpriteImage } from "./SpriteImage";

// Mock Image to simulate load/error
class MockImage {
  onerror: (() => void) | null = null;
  onload: (() => void) | null = null;
  private _src = "";

  get src() {
    return this._src;
  }
  set src(value: string) {
    this._src = value;
    // Simulate error for any URL containing "broken"
    if (value.includes("broken")) {
      setTimeout(() => this.onerror?.(), 0);
    } else {
      setTimeout(() => this.onload?.(), 0);
    }
  }
}

describe("Given a SpriteImage with a valid image", () => {
  beforeEach(() => {
    vi.stubGlobal("Image", MockImage);
  });

  it("when rendered, then it shows a div with background-image style", () => {
    render(
      <SpriteImage expansion="base" row={0} col={1} alt="Apollo" size={120} />,
    );
    const el = screen.getByRole("img", { name: "Apollo" });
    expect(el).toBeInTheDocument();
    expect(el.style.backgroundImage).toContain("base_powers.webp");
  });
});

describe("Given a SpriteImage whose background image fails to load", () => {
  beforeEach(() => {
    // Override Image to always error
    class ErrorImage {
      onerror: (() => void) | null = null;
      set src(_: string) {
        setTimeout(() => this.onerror?.(), 0);
      }
    }
    vi.stubGlobal("Image", ErrorImage);
  });

  it("when the image errors, then the power name fallback text is shown", async () => {
    render(
      <SpriteImage expansion="base" row={0} col={1} alt="Apollo" size={120} />,
    );

    // Wait for the async error callback
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(screen.getByText("Apollo")).toBeInTheDocument();
  });
});
