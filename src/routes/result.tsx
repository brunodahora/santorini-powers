import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PowerCard } from "../components/PowerCard";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../components/ui/carousel";
import { MATCHUPS, POWERS } from "../data/powers";
import { useExpansions } from "../hooks/useExpansions";
import { pickMatchup, pickOne, pickTwo } from "../lib/randomizer";

export function ResultScreen() {
  const navigate = useNavigate();
  const { mode, ids } = useSearch({ from: "/result" });
  const [activeExpansions] = useExpansions();

  // Resolve power objects from URL ids
  const idList = ids
    ? ids
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const powers = idList.map((id) => POWERS.find((p) => p.id === id));
  const allFound = powers.length > 0 && powers.every(Boolean);

  // Redirect to home if params are invalid
  useEffect(() => {
    const validModes = ["one", "two", "matchup"];
    if (!validModes.includes(mode) || !allFound) {
      navigate({ to: "/" });
    }
  }, [mode, allFound, navigate]);

  // Carousel dot tracking
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  if (!allFound) return null;

  const resolvedPowers = powers as NonNullable<(typeof powers)[number]>[];
  const isTwoCards = resolvedPowers.length === 2;

  function reRandomize() {
    if (mode === "one") {
      const p = pickOne(POWERS, activeExpansions);
      navigate({ to: "/result", search: { mode: "one", ids: p.id } });
    } else if (mode === "two") {
      const [p1, p2] = pickTwo(POWERS, activeExpansions);
      navigate({
        to: "/result",
        search: { mode: "two", ids: `${p1.id},${p2.id}` },
      });
    } else {
      const result = pickMatchup(POWERS, MATCHUPS, activeExpansions);
      if (result) {
        const [p1, p2] = result;
        navigate({
          to: "/result",
          search: { mode: "matchup", ids: `${p1.id},${p2.id}` },
        });
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8">
      {/* Desktop: side-by-side; Mobile with 2 cards: carousel */}
      {isTwoCards ? (
        <>
          {/* Desktop layout */}
          <div className="hidden md:flex gap-8 justify-center">
            {resolvedPowers.map((p) => (
              <PowerCard key={p.id} power={p} />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden w-full max-w-xs">
            <Carousel setApi={setCarouselApi}>
              <CarouselContent>
                {resolvedPowers.map((p) => (
                  <CarouselItem key={p.id} className="flex justify-center">
                    <PowerCard power={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Dot indicators */}
            <div
              className="flex justify-center gap-2 mt-3"
              aria-label="Slide indicators"
            >
              {resolvedPowers.map((_, i) => (
                <button
                  key={i}
                  className="w-11 h-11 flex items-center justify-center rounded-full"
                  onClick={() => carouselApi?.scrollTo(i)}
                  aria-label={`Go to card ${i + 1}`}
                  aria-current={i === currentSlide ? "true" : undefined}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentSlide ? "bg-amber-400" : "bg-white/40"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <PowerCard power={resolvedPowers[0]} />
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        <Button size="lg" className="min-h-[44px]" onClick={reRandomize}>
          Re-randomize
        </Button>
        <Button asChild variant="ghost" size="lg" className="min-h-[44px]">
          <Link to="/">← Back</Link>
        </Button>
      </div>
    </div>
  );
}
