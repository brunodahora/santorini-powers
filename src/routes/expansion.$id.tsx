import { Link, useParams } from "@tanstack/react-router";

import { POWERS } from "../data/powers";
import type { ExpansionId } from "../data/powers";

export function ExpansionGodListScreen() {
  const { id } = useParams({ from: "/expansion/$id" });
  const gods = POWERS.filter((p) => p.expansion === (id as ExpansionId));

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto w-full flex-1">
      <h1 className="text-2xl font-semibold text-white capitalize">
        {id} Gods
      </h1>

      <ul className="w-full flex flex-col gap-2">
        {gods.map((god) => (
          <li key={god.id}>
            <Link
              to="/result"
              search={{ mode: "one", ids: god.id }}
              className="flex items-center w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 min-h-[44px]"
            >
              {god.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to="/settings"
        className="min-h-[44px] px-4 inline-flex items-center justify-center text-sm font-medium text-white/70 hover:text-white underline-offset-4 hover:underline"
      >
        ← Back
      </Link>
    </div>
  );
}
