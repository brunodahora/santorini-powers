import { Link, useParams } from "@tanstack/react-router";

import { Button } from "../components/ui/button";
import { POWERS } from "../data/powers";
import type { ExpansionId } from "../data/powers";

export function ExpansionGodListScreen() {
  const { id } = useParams({ from: "/expansion/$id" });
  const gods = POWERS.filter((p) => p.expansion === (id as ExpansionId));

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto w-full">
      <h1 className="text-2xl font-semibold text-[#c8a96e] capitalize">
        {id} Gods
      </h1>

      <ul className="w-full flex flex-col gap-2">
        {gods.map((god) => (
          <li key={god.id}>
            <Link
              to="/result"
              search={{ mode: "one", ids: god.id }}
              className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 min-h-[44px] flex items-center"
            >
              {god.name}
            </Link>
          </li>
        ))}
      </ul>

      <Button asChild size="lg" variant="ghost" className="min-h-[44px] mt-2">
        <Link to="/settings">← Back</Link>
      </Button>
    </div>
  );
}
