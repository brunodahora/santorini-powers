import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { CARD_WIDTH, CARD_HEIGHT, PowerCard } from "../components/PowerCard";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../components/ui/carousel";
import { MATCHUPS, POWERS, type Power } from "../data/powers";
import { useBackButton } from "../hooks/useBackButton";
import { useDice } from "../hooks/useDice";
import { useExpansions } from "../hooks/useExpansions";
import { useSpecialConditions } from "../hooks/useSpecialConditions";
import { pickMatchup, pickOne, pickTwo } from "../lib/randomizer";

/** Renders a PowerCard at 2x scale, centered. */
function ScaledCard({ power }: { power: Power }) {
  const scale = 2;
  const scaledW = CARD_WIDTH * scale;
  const scaledH = CARD_HEIGHT * scale;
  return (
    <div style={{ width: scaledW, height: scaledH }}>
      <div
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <PowerCard power={power} />
      </div>
    </div>
  );
}

export function ResultScreen() {
  const navigate = useNavigate();
  const { mode, ids } = useSearch({ from: "/result" });
  const [activeExpansions] = useExpansions();
  const [includeSpecialConditions] = useSpecialConditions();
  const [includeDice] = useDice();
  const [copied, setCopied] = useState(false);

  const idList = ids
    ? ids
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const powers = idList.map((id) => POWERS.find((p) => p.id === id));
  const allFound = powers.length > 0 && powers.every(Boolean);

  useBackButton(() => navigate({ to: "/" }));

  useEffect(() => {
    const validModes = ["one", "two", "matchup"];
    if (!validModes.includes(mode) || !allFound) {
      navigate({ to: "/" });
    }
  }, [mode, allFound, navigate]);

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

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ url });
    } else {
      await navigator.clipboard.writeText(url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function reRandomize() {
    if (mode === "one") {
      const p = pickOne(
        POWERS,
        activeExpansions,
        includeSpecialConditions,
        includeDice,
      );
      navigate({ to: "/result", search: { mode: "one", ids: p.id } });
    } else if (mode === "two") {
      const [p1, p2] = pickTwo(
        POWERS,
        activeExpansions,
        includeSpecialConditions,
        includeDice,
      );
      navigate({
        to: "/result",
        search: { mode: "two", ids: `${p1.id},${p2.id}` },
      });
    } else {
      const result = pickMatchup(
        POWERS,
        MATCHUPS,
        activeExpansions,
        includeSpecialConditions,
        includeDice,
      );
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
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto flex-1 px-4 pb-8">
      {/* Card area — grows to fill available space */}
      <div className="flex-1 flex items-center justify-center w-full">
        {isTwoCards ? (
          <>
            {/* Desktop: side-by-side */}
            <div className="hidden md:flex gap-8 justify-center">
              {resolvedPowers.map((p) => (
                <ScaledCard key={p.id} power={p} />
              ))}
            </div>

            {/* Mobile: carousel */}
            <div className="md:hidden w-full flex flex-col items-center">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {resolvedPowers.map((p) => (
                    <CarouselItem key={p.id} className="flex justify-center">
                      <ScaledCard power={p} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
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
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentSlide ? "bg-white" : "bg-white/40"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <ScaledCard power={resolvedPowers[0]} />
        )}
      </div>

      {/* Buttons pinned to bottom */}
      <div className="flex gap-3 flex-wrap justify-center py-4">
        <Button
          variant="back"
          size="lg"
          className="md:hidden min-h-[44px] hidden"
          onClick={() => navigate({ to: "/" })}
        >
          ← Back
        </Button>
        <Button
          size="lg"
          className="min-h-[44px] bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2]"
          onClick={reRandomize}
        >
          Re-randomize
        </Button>
        <Button
          size="lg"
          className="min-h-[44px] bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2]"
          onClick={share}
        >
          {copied ? "Link copied!" : "Share"}
        </Button>
      </div>
    </div>
  );
}
