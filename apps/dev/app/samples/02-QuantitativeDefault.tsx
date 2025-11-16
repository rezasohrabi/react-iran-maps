import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function QuantitativeDefaultSample() {
  const quantitativeData: ProvinceData[] = [
    { name: "تهران", value: 2000 },
    { name: "اصفهان", value: 1800 },
    { name: "خراسان رضوی", value: 1600 },
    { name: "فارس", value: 1400 },
    { name: "خوزستان", value: 1200 },
    { name: "آذربایجان شرقی", value: 1000 },
    { name: "مازندران", value: 900 },
    { name: "آذربایجان غربی", value: 800 },
    { name: "کرمان", value: 700 },
    { name: "البرز", value: 600 },
    { name: "گیلان", value: 550 },
    { name: "کرمانشاه", value: 500 },
    { name: "همدان", value: 450 },
    { name: "اردبیل", value: 400 },
    { name: "هرمزگان", value: 350 },
    { name: "لرستان", value: 300 },
    { name: "مرکزی", value: 280 },
    { name: "گلستان", value: 260 },
    { name: "کردستان", value: 240 },
    { name: "بوشهر", value: 220 },
    { name: "قزوین", value: 200 },
    { name: "زنجان", value: 180 },
    { name: "سمنان", value: 160 },
    { name: "یزد", value: 140 },
    { name: "چهارمحال و بختیاری", value: 120 },
    { name: "سیستان و بلوچستان", value: 100 },
    { name: "ایلام", value: 80 },
    { name: "کهگیلویه و بویراحمد", value: 60 },
    { name: "خراسان شمالی", value: 40 },
    { name: "خراسان جنوبی", value: 20 },
    { name: "قم", value: 0 },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۲. داده‌های کمی با رنگ‌های پیش‌فرض
      </h2>
      <p className="text-gray-600 mb-4">
        نمایش جمعیت استان‌ها با مقیاس رنگی کمی و رنگ‌های پیش‌فرض
      </p>
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
