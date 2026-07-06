export default function SectionHeader({ index, title, kicker }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b border-border pb-5">
      <div className="md:col-span-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        [{index}]
      </div>
      <div className="md:col-span-7">
        <h2 className="font-display font-bold uppercase text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight">
          {title}
        </h2>
      </div>
      {kicker && (
        <div className="md:col-span-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:text-right">
          {kicker}
        </div>
      )}
    </div>
  );
}
