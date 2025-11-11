import React from "react";

export function GradientLegend({ scale, colors }: any) {
  const domain = scale.domain();
  const min = domain[0];
  const max = domain[1];

  if (!isFinite(min) || !isFinite(max)) {
    return null;
  }

  const gradientStops = colors
    .map((color: string, index: number) => {
      const percent =
        colors.length === 1
          ? 100
          : Math.round((index / (colors.length - 1)) * 100);
      return `${color} ${percent}%`;
    })
    .join(", ");

  return (
    <div
      className="legend gradient-legend"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        fontSize: 12,
        direction: "ltr",
      }}
    >
      {min === 0 ? (
        <div>کمترین: ۰</div>
      ) : (
        <div>کمترین: {Intl.NumberFormat("fa-IR").format(Number(min))}</div>
      )}
      <div
        style={{
          width: 200,
          height: 13,
          borderRadius: 4,
          overflow: "hidden",
          backgroundImage: `linear-gradient(to right, ${gradientStops})`,
        }}
      />
      <div>بیشترین: {Intl.NumberFormat("fa-IR").format(Number(max))}</div>
    </div>
  );
}

export function QuantitativeLegend({ scale }: any) {
  const range = scale.range();

  const lastIndex = range.length - 1;
  const firstIndex = 0;

  const [minRaw] = scale.invertExtent(range[firstIndex]);
  const [, maxRaw] = scale.invertExtent(range[lastIndex]);

  const min = isFinite(minRaw) ? minRaw : null;
  const max = isFinite(maxRaw) ? maxRaw : null;

  if (min === null && max === null) {
    return null;
  }

  return (
    <div
      className="legend quantitative-legend"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        fontSize: 12,
        direction: "ltr",
      }}
    >
      {min !== null && (
        <div>
          کمترین:{" "}
          {min === 0 ? "۰" : Intl.NumberFormat("fa-IR").format(Number(min))}
        </div>
      )}
      {/* Discrete color blocks for quantize scale */}
      <div
        style={{ display: "flex", gap: 0, borderRadius: 4, overflow: "hidden" }}
      >
        {range.map((color: string, index: number) => (
          <div
            key={index}
            style={{
              width: 37,
              height: 13,
              backgroundColor: color,
              borderLeft:
                index > 0 ? "1px solid rgba(255,255,255,0.3)" : "none",
            }}
          />
        ))}
      </div>
      {max !== null && (
        <div>بیشترین: {Intl.NumberFormat("fa-IR").format(Number(max))}</div>
      )}
    </div>
  );
}

export function QualitativeLegend({ scale }: any) {
  const range = scale.range();
  const items = scale.domain();

  return (
    <div
      className="legend qualitative-legend"
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        fontSize: 12,
        fontWeight: 400,
        direction: "rtl",
      }}
    >
      {items.map((item: string, index: number) => (
        <div
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          key={index}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: range[index],
              borderRadius: "50%",
            }}
          ></div>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
