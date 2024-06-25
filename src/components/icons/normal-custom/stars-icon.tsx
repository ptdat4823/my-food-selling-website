export const StarsIcon = ({ rating }: { rating: number }) => {
  const starSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.9rem"
      height="0.9rem"
      viewBox="0 0 32 32"
    >
      <path
        fill="#fcd53f"
        d="m18.7 4.627l2.247 4.31a2.27 2.27 0 0 0 1.686 1.189l4.746.65c2.538.35 3.522 3.479 1.645 5.219l-3.25 2.999a2.225 2.225 0 0 0-.683 2.04l.793 4.398c.441 2.45-2.108 4.36-4.345 3.24l-4.536-2.25a2.282 2.282 0 0 0-2.006 0l-4.536 2.25c-2.238 1.11-4.786-.79-4.345-3.24l.793-4.399c.14-.75-.12-1.52-.682-2.04l-3.251-2.998c-1.877-1.73-.893-4.87 1.645-5.22l4.746-.65a2.23 2.23 0 0 0 1.686-1.189l2.248-4.309c1.144-2.17 4.264-2.17 5.398 0"
      />
    </svg>
  );

  const stars = [];
  for (let i = 0; i < rating; i++) stars.push(starSVG);
  return <div className="flex">{stars}</div>;
};
