import { OUTPUT_FORMATS } from "@contentmonster/core/platform";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-10 px-8 py-24 font-sans">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">ContentMonster</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          AI content engine — ad-creative and book pipelines, one house.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Platform output formats
        </h2>
        <ul className="flex flex-col text-sm">
          {OUTPUT_FORMATS.map((format) => (
            <li
              key={format.id}
              className="flex justify-between border-b border-zinc-200 py-2 dark:border-zinc-800"
            >
              <span className="font-medium">{format.id}</span>
              <span className="tabular-nums text-zinc-500">
                {format.width}×{format.height} · {format.ratio}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
