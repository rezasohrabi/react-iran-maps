import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function SequentialLegendsSample() {
  const quantitativeData: ProvinceData[] = [
    { name: "تهران", value: 15000000 },
    { name: "اصفهان", value: 5500000 },
    { name: "خراسان رضوی", value: 6500000 },
    { name: "فارس", value: 4800000 },
    { name: "خوزستان", value: 4700000 },
    { name: "آذربایجان شرقی", value: 3900000 },
    { name: "مازندران", value: 3200000 },
    { name: "آذربایجان غربی", value: 3200000 },
    { name: "کرمان", value: 3100000 },
    { name: "البرز", value: 2800000 },
  ];

  // Sequential color schemes (single-hue progressions)
  const bluesSequential = [
    "#EFF6FF",
    "#BFDBFE",
    "#60A5FA",
    "#3B82F6",
    "#1E40AF",
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۱۵. انواع مقیاس‌های رنگی برای داده‌های کمی
      </h2>
      <p className="text-gray-600 mb-6">
        مقایسه سه نوع مقیاس مختلف: Linear (خطی پیوسته)، Sequential (متوالی
        پیوسته)، و Quantize (گسسته)
      </p>

      <div className="space-y-6">
        {/* Linear Scale */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Linear Scale - مقیاس خطی (پیوسته)
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            هر مقدار رنگ منحصر به فرد خودش را دارد - بهترین برای نمایش گرادیانت
            پیوسته
          </p>
          <div className="border border-gray-200 rounded-lg p-4">
            <ChoroplethMap
              data={quantitativeData}
              legend={{
                mode: "quantitative",
                colors: bluesSequential,
                scaleType: "linear",
              }}
            />
          </div>
        </div>

        {/* Sequential Scale */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Sequential Scale - مقیاس متوالی (پیوسته)
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            مشابه Linear اما با interpolation بهینه‌تر برای داده‌های متوالی
          </p>
          <div className="border border-gray-200 rounded-lg p-4">
            <ChoroplethMap
              data={quantitativeData}
              legend={{
                mode: "quantitative",
                colors: bluesSequential,
                scaleType: "sequential",
              }}
            />
          </div>
        </div>

        {/* Quantize Scale */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Quantize Scale - مقیاس گسسته
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            داده‌ها به دسته‌های مجزا تقسیم می‌شوند - برای دسته‌بندی مقادیر
          </p>
          <div className="border border-gray-200 rounded-lg p-4">
            <ChoroplethMap
              data={quantitativeData}
              legend={{
                mode: "quantitative",
                colors: bluesSequential,
                scaleType: "quantize",
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">
          <strong>تفاوت‌ها:</strong>
        </p>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>
            <strong>Linear & Sequential:</strong> گرادیانت پیوسته - هر عدد رنگ
            منحصر به فرد دارد (مثلاً ۵,۵۰۰,۰۰۰ و ۴,۸۰۰,۰۰۰ رنگ‌های متفاوت)
          </li>
          <li>
            <strong>Quantize:</strong> دسته‌بندی گسسته - چند مقدار مختلف ممکن
            است همان رنگ را داشته باشند
          </li>
          <li>
            پیش‌فرض: اگر scaleType مشخص نشود، Quantize استفاده می‌شود. برای
            گرادیانت پیوسته باید صراحتاً scaleType را "linear" یا "sequential"
            تنظیم کنید
          </li>
        </ul>
      </div>
    </section>
  );
}
