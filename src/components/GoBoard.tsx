import { BoardHighlight, Stone, StoneColor } from "../types";

type GoBoardProps = {
  size: number;
  stones: Stone[];
  editable?: boolean;
  selectedColor?: StoneColor;
  onChange?: (stones: Stone[]) => void;
  highlights?: BoardHighlight[];
  title?: string;
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
}: GoBoardProps) {
  const stoneMap = new Map<string, Stone>();
  for (const stone of stones) {
    stoneMap.set(keyFromXY(stone.x, stone.y), stone);
  }

  const highlightMap = new Map<string, BoardHighlight>();
  for (const highlight of highlights) {
    highlightMap.set(keyFromXY(highlight.x, highlight.y), highlight);
  }

  function updateAt(x: number, y: number): void {
    if (!editable || !onChange) {
      return;
    }
    const idx = stones.findIndex((stone) => stone.x === x && stone.y === y);
    if (idx === -1) {
      onChange([...stones, { x, y, color: selectedColor }]);
      return;
    }
    const existing = stones[idx];
    if (existing.color === "black") {
      const next = [...stones];
      next[idx] = { ...existing, color: "white" };
      onChange(next);
      return;
    }
    onChange(stones.filter((_, index) => index !== idx));
  }

  const cells = [];
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
          onClick={() => updateAt(x, y)}
          disabled={!editable}
          aria-label={`Intersection ${String.fromCharCode(65 + x)}${size - y}`}
        >
          {stone ? <span className={stoneClass(stone.color)} /> : null}
          {highlight ? <span className="highlight-label">{highlight.label}</span> : null}
        </button>,
      );
    }
  }

  return (
    <section className="board-wrap">
      {title ? <h3>{title}</h3> : null}
      <div
        className="go-board"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        <svg
          className="board-grid"
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
      </div>
    </section>
  );
}
