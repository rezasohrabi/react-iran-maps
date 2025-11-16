import { CountyFeature } from "./CountyFeature";
import { ProvinceData, ProvinceMapItem } from "./ProvinceData";

/**
 * Single legend item for qualitative mode.
 */
interface LegendItem {
  /** Display label */
  label: string;
  /** Value to match against data */
  value: string;
  /** Hex color code */
  color: string;
}

/**
 * Legend for quantitative data (numeric values).
 * @example { mode: "quantitative", colors: ["#FFF", "#000"] }
 */
interface QuantitativeLegend {
  disable?: boolean;
  mode: "quantitative";
  /** Color gradient from low to high */
  colors?: string[];
  items?: never;
  scaleType?: "quantize" | "sequential" | "linear";
}

/**
 * Legend for qualitative data (c ategorical values).
 * @example { mode: "qualitative", items: [{ label: "Low", value: "low", color: "#FFF" }] }
 */
interface QualitativeLegend {
  disable?: boolean;
  mode: "qualitative";
  items: LegendItem[];
  colors?: never;
  scaleType?: never;
}

type LegendConfig = QuantitativeLegend | QualitativeLegend;

/**
 * Props for the ChoroplethMap component.
 */
export interface ChoroplethMapProps {
  /** Enable drilldown to counties on click */
  drilldown?: boolean;
  /** Disable tooltips */
  disableTooltip?: boolean;
  /** Province and county data */
  data?: ProvinceData[];
  /** Map width in pixels (default: 800) */
  width?: number;
  /** Map height in pixels (default: 600) */
  height?: number;
  /** Aspect ratio container (default: "1.23") */
  aspectRatio?: string;
  /** Legend configuration */
  legend?: LegendConfig;
  /** Map zoom scale */
  scale?: number;
  /** Custom tooltip HTML renderer */
  renderTooltipContent?: (
    provinceData?: ProvinceMapItem,
    geo?: CountyFeature
  ) => string;
}
