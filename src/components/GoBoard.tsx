import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";
import { BoardHighlight, Stone, StoneColor } from "../types";
import { playStoneClick } from "../logic/sound";

type GoBoardProps = {
  size: number;
  stones: Stone[];
  editable?: boolean;
  selectedColor?: StoneColor;
  onChange?: (stones: Stone[]) => void;
  highlights?: BoardHighlight[];
  title?: string;
  showCoordinates?: boolean;
};

function keyFromXY(x: number, y: number): string {
  return `${x},${y}`;
}

function stoneClass(color: StoneColor): string {
  return color === "black" ? "stone black" : "stone white";
}

function getHoshiPoints(size: number): Array<{ x: number; y: number }> {
  if (size === 9) {
    return [
      { x: 2, y: 2 },
      { x: 2, y: 6 },
      { x: 4, y: 4 },
      { x: 6, y: 2 },
      { x: 6, y: 6 },
    ];
  }
  if (size === 13) {
    return [
      { x: 3, y: 3 },
      { x: 3, y: 9 },
      { x: 6, y: 6 },
      { x: 9, y: 3 },
      { x: 9, y: 9 },
    ];
  }
  if (size === 19) {
    return [
      { x: 3, y: 3 },
      { x: 3, y: 9 },
      { x: 3, y: 15 },
      { x: 9, y: 3 },
      { x: 9, y: 9 },
      { x: 9, y: 15 },
      { x: 15, y: 3 },
      { x: 15, y: 9 },
      { x: 15, y: 15 },
    ];
  }
  return [];
}

export function GoBoard({
  size,
  stones,
  editable = false,
  selectedColor = "black",
  onChange,
  highlights = [],
  title,
  showCoordinates = false,
}: GoBoardProps) {
  const flipStateRef = useRef<Map<string, boolean>>(new Map());
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const stoneMap = new Map<string, Stone>();
  for (const stone of stones) {
    stoneMap.set(keyFromXY(stone.x, stone.y), stone);
  }

  useEffect(() => {
    const existing = new Set(stones.map((stone) => keyFromXY(stone.x, stone.y)));
    for (const key of Array.from(flipStateRef.current.keys())) {
      if (!existing.has(key)) {
        flipStateRef.current.delete(key);
      }
    }
    for (const key of existing) {
      if (!flipStateRef.current.has(key)) {
        flipStateRef.current.set(key, false);
      }
    }
  }, [stones]);

  const highlightMap = new Map<string, BoardHighlight>();
  for (const highlight of highlights) {
    highlightMap.set(keyFromXY(highlight.x, highlight.y), highlight);
  }

  function updateAt(x: number, y: number): void {
    if (!editable || !onChange) {
      return;
    }
    const idx = stones.findIndex((stone) => stone.x === x && stone.y === y);
    const coordKey = keyFromXY(x, y);
    if (idx === -1) {
      flipStateRef.current.set(coordKey, false);
      onChange([...stones, { x, y, color: selectedColor }]);
      playStoneClick();
      return;
    }

    const existing = stones[idx];
    const wasFlipped = flipStateRef.current.get(coordKey) ?? false;
    if (!wasFlipped) {
      const next = [...stones];
      next[idx] = {
        ...existing,
        color: existing.color === "black" ? "white" : "black",
      };
      flipStateRef.current.set(coordKey, true);
      onChange(next);
      playStoneClick();
      return;
    }
    flipStateRef.current.delete(coordKey);
    onChange(stones.filter((_, index) => index !== idx));
    playStoneClick();
  }

  const cells: ReactElement[] = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const key = keyFromXY(x, y);
      const stone = stoneMap.get(key);
      const highlight = highlightMap.get(key);
      const className = [
        "board-cell",
        editable ? "editable" : "",
        highlight ? `highlight-${highlight.kind}` : "",
      ]
        .filter(Boolean)
        .join(" ");

      cells.push(
        <button
          key={key}
          type="button"
          className={className}
          style={
            showCoordinates
              ? {
                  gridColumn: x + 2,
                  gridRow: y + 2,
                }
              : undefined
          }
          onClick={() => updateAt(x, y)}
          onMouseEnter={() => {
            if (editable) {
              setHoveredKey(key);
            }
          }}
          onMouseLeave={() => {
            if (editable) {
              setHoveredKey((current) => (current === key ? null : current));
            }
          }}
          disabled={!editable}
          aria-label={`Intersection ${String.fromCharCode(65 + x)}${size - y}`}
        >
          {stone ? <span className={stoneClass(stone.color)} /> : null}
          {!stone && editable && hoveredKey === key ? (
            <span className={`${stoneClass(selectedColor)} ghost`} />
          ) : null}
          {highlight ? <span className="highlight-label">{highlight.label}</span> : null}
        </button>,
      );
    }
  }

  return (
    <section className="board-wrap">
      {title ? <h3>{title}</h3> : null}
      <div
        className={showCoordinates ? "go-board with-coordinates" : "go-board"}
        style={{
          gridTemplateColumns: showCoordinates
            ? `22px repeat(${size}, 1fr) 22px`
            : `repeat(${size}, 1fr)`,
          gridTemplateRows: showCoordinates
            ? `22px repeat(${size}, 1fr) 22px`
            : `repeat(${size}, 1fr)`,
        }}
      >
        <svg
          className={showCoordinates ? "board-grid coordinate-grid" : "board-grid"}
          viewBox={`0 0 ${size} ${size}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {Array.from({ length: size }, (_, i) => {
            const p = i + 0.5;
            return (
              <g key={i}>
                <line x1={0.5} y1={p} x2={size - 0.5} y2={p} />
                <line x1={p} y1={0.5} x2={p} y2={size - 0.5} />
              </g>
            );
          })}
          {getHoshiPoints(size).map((point) => (
            <circle
              key={`hoshi-${point.x}-${point.y}`}
              className="hoshi"
              cx={point.x + 0.5}
              cy={point.y + 0.5}
              r={0.09}
            />
          ))}
        </svg>
        {cells}
        {showCoordinates
          ? Array.from({ length: size }, (_, x) => (
              <span
                key={`top-${x}`}
                className="coord-label coord-label-top"
                style={{ gridColumn: x + 2, gridRow: 1 }}
              >
                {String.fromCharCode(65 + x)}
              </span>
            ))
          : null}
        {showCoordinates
          ? Array.from({ length: size }, (_, y) => (
              <span
                key={`left-${y}`}
                className="coord-label coord-label-left"
                style={{ gridColumn: 1, gridRow: y + 2 }}
              >
                {size - y}
              </span>
            ))
          : null}
        {showCoordinates
          ? Array.from({ length: size }, (_, y) => (
              <span
                key={`right-${y}`}
                className="coord-label coord-label-right"
                style={{ gridColumn: size + 2, gridRow: y + 2 }}
              >
                {size - y}
              </span>
            ))
          : null}
        {showCoordinates
          ? Array.from({ length: size }, (_, x) => (
              <span
                key={`bottom-${x}`}
                className="coord-label coord-label-bottom"
                style={{ gridColumn: x + 2, gridRow: size + 2 }}
              >
                {String.fromCharCode(65 + x)}
              </span>
            ))
          : null}
      </div>
    </section>
  );
}
