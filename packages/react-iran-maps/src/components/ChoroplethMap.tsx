import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  scaleOrdinal,
  scaleLinear,
  scaleSequential,
  scaleQuantize,
} from "d3-scale";
import { interpolateRgbBasis } from "d3-interpolate";

import {
  useCurrentGeographies,
  useGetProvinceMap,
  useOptimalScale,
} from "../hooks";
import { ChoroplethMapProps, ProvinceMapItem } from "../types";
import { getProvinceName } from "../lib";
import { Tooltip } from "./Tooltip";
import {
  QualitativeLegend,
  QuantitativeLegend,
  GradientLegend,
} from "./Legend";
import { animate } from "motion";
import { Breadcrumbs } from "./Breadcrumbs";

const DEFAULT_COLOR_RANGE = [
  "#AADBDD",
  "#75C4C8",
  "#37AAAF",
  "#199DA3",
  "#16898E",
];

export function ChoroplethMap({
  drilldown = false,
  data,
  renderTooltipContent,
  width = 800,
  height = 600,
  aspectRatio = "1.23",
  disableTooltip = false,
  scale: scaleProps,
  legend,
}: ChoroplethMapProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [displayedProvince, setDisplayedProvince] = useState<string | null>(
    null
  );

  const colorScale = legend?.colors || DEFAULT_COLOR_RANGE;
  const defaultScale = scaleProps || Math.min(width, height) * 3.4;

  const [zoom, setZoom] = useState(1);
  const [scale, setScale] = useState(defaultScale);
  const defaultCenter = [53.5, 32.5] as [number, number];
  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [minRange, setMinRange] = useState<number>(0);
  const [maxRange, setMaxRange] = useState<number>(0);

  const provinceMap = useGetProvinceMap(data);
  const [tooltipContent, setTooltipContent] = useState<string | undefined>(
    undefined
  );

  const scaleType =
    legend?.mode === "quantitative"
      ? legend.scaleType || "quantize"
      : undefined;

  let legendScale: any;

  if (legend?.mode === "qualitative") {
    legendScale = scaleOrdinal()
      .domain((legend.items || []).map((item) => item.value))
      .range((legend.items || []).map((item) => item.color));
  } else if (scaleType === "quantize") {
    legendScale = scaleQuantize<string>()
      .domain([minRange, maxRange])
      .range(colorScale);
  } else if (scaleType === "sequential") {
    legendScale = scaleSequential(
      interpolateRgbBasis(colorScale as string[])
    ).domain([minRange, maxRange]);
  } else if (scaleType === "linear") {
    legendScale = scaleLinear<string>()
      .domain([minRange, maxRange])
      .range([
        colorScale[0] ?? "#fff",
        colorScale[colorScale.length - 1] ?? "#16898E",
      ]);
  } else {
    legendScale = scaleQuantize<string>()
      .domain([minRange, maxRange])
      .range(colorScale);
  }

  const getColor = useCallback(
    (value?: number | string) => {
      if (!value || value === 0) {
        return "#fff";
      }

      if (legend?.mode === "qualitative") {
        return scaleOrdinal()
          .domain((legend.items || []).map((item) => item.value))
          .range((legend.items || []).map((item) => item.color))(
          value as string
        );
      }

      if (typeof value === "number") {
        const currentScaleType =
          legend?.mode === "quantitative"
            ? legend.scaleType || "quantize"
            : "quantize";

        if (currentScaleType === "linear") {
          return scaleLinear<string>()
            .domain([minRange, maxRange])
            .range([
              colorScale[0] ?? "#fff",
              colorScale[colorScale.length - 1] ?? "#16898E",
            ])(value);
        } else if (currentScaleType === "sequential") {
          return scaleSequential(
            interpolateRgbBasis(colorScale as string[])
          ).domain([minRange, maxRange])(value);
        } else {
          // quantize (default)
          return scaleQuantize<string>()
            .domain([minRange, maxRange])
            .range(colorScale)(value);
        }
      }
    },
    [
      minRange,
      maxRange,
      colorScale,
      legend?.mode,
      legend?.items,
      legend?.scaleType,
    ]
  );

  const currentGeographies = useCurrentGeographies(displayedProvince);

  useEffect(() => {
    if (legend?.mode === "quantitative") {
      const dataMap:
        | Record<string, ProvinceMapItem>
        | ProvinceMapItem
        | undefined = displayedProvince
        ? provinceMap[displayedProvince]?.counties
        : provinceMap;

      const values: number[] = Object.values(dataMap || {}).map(
        (province) => +(province.value ?? 0)
      );

      // Get total number of provinces/counties in the geography
      const totalGeographies = currentGeographies.length;

      // Check if some provinces/counties are missing data
      const hasIncompleteCoverage = (data?.length || 0) < totalGeographies;

      const min = hasIncompleteCoverage ? 0 : Math.min(...values);
      const max = Math.max(...values);
      setMinRange(min);
      setMaxRange(max);
    }
  }, [displayedProvince, provinceMap, legend?.mode, data, currentGeographies]);

  const { optimalCenter, optimalScale } = useOptimalScale(
    selectedProvince,
    defaultCenter,
    defaultScale
  );

  // Handle province selection changes with delayed geography update when going back
  useEffect(() => {
    setZoom(1); // Reset user zoom when view changes

    if (selectedProvince !== null) {
      // Drilling down: immediately update displayed province and start animation
      setDisplayedProvince(selectedProvince);
    } else {
      // Going back: keep showing counties, animate zoom out, then switch to provinces
      // After 600ms (animation duration), switch to showing provinces
      const timer = setTimeout(() => {
        setDisplayedProvince(null);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [selectedProvince]);

  // Animate scale and center to optimal values
  const scaleRef = useRef(scale);
  const centerRef = useRef(center);

  useEffect(() => {
    // Animate Scale
    animate(scaleRef.current, optimalScale, {
      duration: 0.6,
      onUpdate: (latest) => {
        scaleRef.current = latest;
        setScale(latest);
      },
    });

    // Animate Longitude
    animate(centerRef.current[0], optimalCenter[0], {
      duration: 0.6,
      onUpdate: (latest) => {
        centerRef.current = [latest, centerRef.current[1]];
        setCenter([latest, centerRef.current[1]]);
      },
    });

    // Animate Latitude
    animate(centerRef.current[1], optimalCenter[1], {
      duration: 0.6,
      onUpdate: (latest) => {
        centerRef.current = [centerRef.current[0], latest];
        setCenter([centerRef.current[0], latest]);
      },
    });
  }, [optimalScale, optimalCenter]);

  // Calculate final scale based on animated scale and user zoom
  const finalScale = useMemo(() => {
    return scale * zoom;
  }, [scale, zoom]);

  const handleChangeProvince = (geo: any) => {
    setSelectedProvince(geo.properties.provincName || geo.properties.NAME_1);
  };

  // Handle back button
  const handleBack = () => {
    setSelectedProvince(null);
  };

  return (
    <>
      {!disableTooltip && <Tooltip />}

      <div
        data-tooltip-id="tooltip"
        data-tooltip-html={tooltipContent ?? ""}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          aspectRatio: aspectRatio,
        }}
      >
        {displayedProvince && (
          <Breadcrumbs
            selectedProvince={displayedProvince}
            handleBack={handleBack}
          />
        )}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center,
            scale: finalScale,
          }}
          width={width}
          height={height}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Geographies
            geography={{
              type: "FeatureCollection",
              features: currentGeographies,
            }}
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                const provinceName = getProvinceName(
                  geo,
                  data?.[0]?.name.match(/\w+/g) ? "en" : "fa"
                );
                let currentItem: ProvinceMapItem | undefined;
                if (provinceName) {
                  currentItem =
                    displayedProvince && geo.properties.cityName
                      ? provinceMap[displayedProvince]?.counties?.[
                          geo.properties.cityName
                        ]
                      : provinceMap[provinceName];
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (disableTooltip) return;

                      if (!data || data?.length === 0) {
                        setTooltipContent(
                          renderTooltipContent
                            ? renderTooltipContent(currentItem, geo)
                            : `<div style="min-width: 60px; text-align: center;">${displayedProvince ? geo.properties.cityName : geo.properties.provincName}</div>`
                        );
                        return;
                      }
                      setTooltipContent(
                        renderTooltipContent
                          ? renderTooltipContent(currentItem, geo)
                          : `<div>
                              <div>${displayedProvince ? geo.properties.cityName : geo.properties.provincName}</div>
                             ${legend?.mode === "quantitative" ? `<div>${Intl.NumberFormat("fa-IR").format((currentItem?.value as number) || 0)} :تعداد</div>` : `<div>دسته: ${currentItem?.value || "نامشخص"}</div>`} 
                            </div>`
                      );
                    }}
                    onMouseLeave={() => {
                      if (disableTooltip) return;
                      setTooltipContent("");
                    }}
                    onClick={
                      !drilldown ? undefined : () => handleChangeProvince(geo)
                    }
                    fill={getColor(currentItem?.value) as string}
                    stroke="#093A3C"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                      hover: {
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {!legend?.disable && legend?.mode === "quantitative" && (
          <>
            {scaleType === "linear" || scaleType === "sequential" ? (
              <GradientLegend scale={legendScale} colors={colorScale} />
            ) : (
              <QuantitativeLegend scale={legendScale} />
            )}
          </>
        )}
        {!legend?.disable && legend?.mode === "qualitative" && (
          <QualitativeLegend scale={legendScale} />
        )}
      </div>
    </>
  );
}
