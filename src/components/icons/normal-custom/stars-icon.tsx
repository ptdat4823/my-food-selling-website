import { nanoid } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export const StarsIcon = ({ rating }: { rating: number }) => {
  const fullStar = Math.floor(rating);
  const halfStar = rating - fullStar;
  const emptyStar = 5 - fullStar - Math.ceil(halfStar);

  const starsIcon: ReactNode[] = [];
  [...Array(fullStar).keys()].map((i) => {
    const id = nanoid();
    starsIcon.push(<FullStarIcon key={id} />);
  });
  const id = nanoid();
  if (halfStar >= 0.75) {
    starsIcon.push(<ThreeQuarterStarIcon key={id} />);
  } else if (halfStar >= 0.5) {
    starsIcon.push(<HalfStarIcon key={id} />);
  } else if (halfStar >= 0.25) {
    starsIcon.push(<OneQuarterStarIcon key={id} />);
  }
  if (emptyStar > 0) {
    [...Array(emptyStar).keys()].map((i) => {
      const id = nanoid();
      starsIcon.push(<OutlineStarIcon key={id} />);
    });
  }
  return starsIcon;
};

export const FullStarIcon = () => {
  return (
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
};

export const HalfStarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.9rem"
      height="0.9rem"
      viewBox="0 0 24 24"
    >
      <path
        fill="#fcd53f"
        d="m3.1 11.3l3.6 3.3l-1 4.6c-.1.6.1 1.2.6 1.5c.2.2.5.3.8.3c.2 0 .4 0 .6-.1c0 0 .1 0 .1-.1l4.1-2.3l4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1c.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7l.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5l-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1c-.5 0-1 .3-1.3.8c0 0 0 .1-.1.1L8.7 8.2L4 8.7h-.1c-.5.1-1 .5-1.2 1c-.1.6 0 1.2.4 1.6m8.9 5V5.8l1.7 3.8c.1.3.5.5.8.6l4.2.5l-3.1 2.8c-.3.2-.4.6-.3 1c0 .2.5 2.2.8 4.1l-3.6-2.1c-.2-.2-.3-.2-.5-.2"
      />
    </svg>
  );
};

export const OneQuarterStarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.9rem"
      height="0.9rem"
      viewBox="0 0 24 24"
    >
      <path
        fill="#fcd53f"
        d="M13.209 3.102c-.495-1.003-1.926-1.003-2.421 0L8.43 7.88l-5.273.766c-1.107.16-1.55 1.522-.748 2.303l3.815 3.719l-.9 5.25c-.15.871.54 1.579 1.325 1.582c.21.001.426-.048.635-.158L9 20.44l2.998-1.577l4.716 2.479c.99.52 2.148-.32 1.96-1.423l-.902-5.251l3.816-3.72c.8-.78.359-2.141-.748-2.302l-5.273-.766zM9 18.744V9.282a1.35 1.35 0 0 0 .74-.668l2.258-4.575l2.259 4.575a1.35 1.35 0 0 0 1.016.739l5.05.734l-3.654 3.562a1.35 1.35 0 0 0-.388 1.195l.862 5.029l-4.516-2.375a1.35 1.35 0 0 0-1.257 0z"
      />
    </svg>
  );
};

export const ThreeQuarterStarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.9rem"
      height="0.9rem"
      viewBox="0 0 12 12"
    >
      <path
        fill="#fcd53f"
        d="M6.718 1.546L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36l1.111-2.253a.8.8 0 0 1 1.435 0M7 8.823l1.331.7l-.374-2.18a.8.8 0 0 1 .23-.708L9.771 5.09l-2.189-.318a.8.8 0 0 1-.582-.4z"
      />
    </svg>
  );
};

export const OutlineStarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.9rem"
      height="0.9rem"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="#fcd53f"
        strokeWidth="2"
        d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597z"
      />
    </svg>
  );
};
