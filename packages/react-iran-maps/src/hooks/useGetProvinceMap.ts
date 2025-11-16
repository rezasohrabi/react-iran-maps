import { useMemo } from "react";
import { CountyMapItem, ProvinceData, ProvinceMapItem } from "../types";
import { normalizeProvinceName } from "../lib";

export function useGetProvinceMap(data?: ProvinceData[]) {
  return useMemo(() => {
    if (!data) {
      return {};
    }

    const provinceMap: Record<string, ProvinceMapItem> = {};

    if (data) {
      const language = data[0]?.name.match(/[a-zA-Z]/) ? "en" : "fa";

      data.forEach((province) => {
        const normalizedName = normalizeProvinceName(province.name, language);

        provinceMap[normalizedName] = {
          value: province.value,
          name: normalizedName,
          counties: province.counties
            ? province.counties.reduce((countyMap: CountyMapItem, county) => {
                countyMap[county.name] = county;
                return countyMap;
              }, {})
            : undefined,
        };
      });
    }

    return provinceMap;
  }, [data]);
}
