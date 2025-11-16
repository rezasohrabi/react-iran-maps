import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function SpellingVariantsSample() {
  const quantitativeData: ProvinceData[] = [
    { name: "تهران", value: 2000 },
    { name: "اذربایجان شرقی", value: 1500 },
    { name: "آذربایجان غربی", value: 1400 },
    { name: "چهار محال و بختیاری", value: 1300 },
    { name: "کهکیلویه وبویراحمد", value: 1200 },
    { name: "سیستان وبلوچستان", value: 1100 },
    { name: "خراسان‌رضوی", value: 1000 },
    { name: "خراسانجنوبی", value: 900 },
    { name: "خراسان شمالی", value: 800 },
    { name: "اصفهان", value: 700 },
    { name: "فارس", value: 600 },
    { name: "خوزستان", value: 500 },
    { name: "کرمان", value: 400 },
    { name: "البرز", value: 300 },
    { name: "گیلان", value: 250 },
    { name: "کرمانشاه", value: 200 },
    { name: "همدان", value: 150 },
    { name: "اردبیل", value: 100 },
    { name: "هرمزگان", value: 90 },
    { name: "لرستان", value: 80 },
    { name: "مرکزی", value: 70 },
    { name: "گلستان", value: 60 },
    { name: "کردستان", value: 50 },
    { name: "بوشهر", value: 40 },
    { name: "قزوین", value: 30 },
    { name: "زنجان", value: 25 },
    { name: "سمنان", value: 20 },
    { name: "یزد", value: 15 },
    { name: "ایلام", value: 10 },
    { name: "مازندران", value: 5 },
    { name: "قم", value: 0 },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۳. پشتیبانی از املاهای مختلف نام استان‌ها
      </h2>
      <p className="text-gray-600 mb-4">
        در این مثال، نام استان‌ها با املاهای مختلف نوشته شده‌اند (مثل "اذربایجان" به جای "آذربایجان"، 
        "چهار محال" به جای "چهارمحال"، "کهکیلویه" به جای "کهگیلویه" و ...)
        ولی به درستی نمایش داده می‌شوند.
      </p>
      <div className="bg-blue-50 border-r-4 border-blue-400 p-4 mb-4">
        <h3 className="font-semibold text-blue-800 mb-2">نمونه‌هایی از املاهای مختلف:</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>آذربایجان / اذربایجان</li>
          <li>چهارمحال / چهار محال</li>
          <li>کهگیلویه / کهکیلویه</li>
          <li>سیستان و بلوچستان / سیستان وبلوچستان</li>
          <li>خراسان رضوی / خراسان‌رضوی / خراسانرضوی</li>
        </ul>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={quantitativeData}
          legend={{
            mode: "quantitative",
            colors: ["#fff", "#16898E"],
            scaleType: "linear",
          }}
        />
      </div>
    </section>
  );
}

