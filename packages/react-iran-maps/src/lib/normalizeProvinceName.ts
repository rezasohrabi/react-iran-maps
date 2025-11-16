const PROVINCE_NAME_VARIANTS: Record<string, string[]> = {
  "آذربایجان شرقی": [
    "اذربایجان شرقی",
    "آذربایجان‌شرقی",
    "اذربایجان‌شرقی",
    "آذربایجانشرقی",
    "اذربایجانشرقی",
  ],
  "آذربایجان غربی": [
    "اذربایجان غربی",
    "آذربایجان‌غربی",
    "اذربایجان‌غربی",
    "آذربایجانغربی",
    "اذربایجانغربی",
  ],
  اردبیل: ["اردبیل"],
  اصفهان: ["اصفهان"],
  البرز: ["البرز"],
  ایلام: ["ایلام"],
  بوشهر: ["بوشهر"],
  تهران: ["تهران"],
  "چهارمحال و بختیاری": [
    "چهار محال و بختیاری",
    "چهارمحال وبختیاری",
    "چهار محال وبختیاری",
    "چهارمحال‌و‌بختیاری",
    "چهار محال‌و‌بختیاری",
    "چهارمحال بختیاری",
    "چهار محال بختیاری",
  ],
  "خراسان جنوبی": ["خراسان‌جنوبی", "خراسانجنوبی"],
  "خراسان رضوی": ["خراسان‌رضوی", "خراسانرضوی", "خراسان رضوى"],
  "خراسان شمالی": ["خراسان‌شمالی", "خراسانشمالی"],
  خوزستان: ["خوزستان"],
  زنجان: ["زنجان"],
  سمنان: ["سمنان"],
  "سیستان و بلوچستان": [
    "سیستان وبلوچستان",
    "سیستان‌و‌بلوچستان",
    "سیستان بلوچستان",
    "سیستان و بلوچستان",
  ],
  فارس: ["فارس"],
  قزوین: ["قزوین", "قزوين"],
  قم: ["قم"],
  کردستان: ["کردستان"],
  کرمان: ["کرمان"],
  کرمانشاه: ["کرمانشاه"],
  "کهگیلویه و بویراحمد": [
    "کهگیلویه وبویراحمد",
    "کهگیلویه‌و‌بویراحمد",
    "کهکیلویه و بویراحمد",
    "کهکیلویه وبویراحمد",
    "کهکیلویه‌و‌بویراحمد",
    "کهگیلویه بویراحمد",
    "کهکیلویه بویراحمد",
  ],
  گلستان: ["گلستان"],
  گیلان: ["گیلان"],
  لرستان: ["لرستان"],
  مازندران: ["مازندران"],
  مرکزی: ["مرکزی", "مرکزي"],
  هرمزگان: ["هرمزگان"],
  همدان: ["همدان"],
  یزد: ["یزد"],
};

const PROVINCE_NAME_VARIANTS_EN: Record<string, string[]> = {
  EastAzarbaijan: ["East Azarbaijan", "East Azerbaijan", "EastAzerbaijan"],
  WestAzarbaijan: ["West Azarbaijan", "West Azerbaijan", "WestAzerbaijan"],
  Ardebil: ["Ardabil"],
  Esfahan: ["Isfahan", "Isfehan"],
  Alborz: [],
  Ilam: [],
  Bushehr: ["Boushehr"],
  Tehran: [],
  ChaharMahallandBakhtiari: [
    "Chaharmahal and Bakhtiari",
    "Chahar Mahal and Bakhtiari",
    "ChaharMahal and Bakhtiari",
  ],
  SouthKhorasan: ["South Khorasan"],
  RazaviKhorasan: ["Razavi Khorasan", "Khorasan Razavi"],
  NorthKhorasan: ["North Khorasan"],
  Khuzestan: [],
  Zanjan: [],
  Semnan: [],
  SistanandBaluchestan: [
    "Sistan and Baluchestan",
    "Sistan and Baluchistan",
    "SistanandBaluchistan",
  ],
  Fars: [],
  Qazvin: [],
  Qom: [],
  Kordestan: ["Kurdistan"],
  Kerman: [],
  Kermanshah: [],
  KohgiluyehandBuyerAhmad: [
    "Kohgiluyeh and Boyer Ahmad",
    "Kohgiluyeh and BuyerAhmad",
    "KohgiluyehandBoyerAhmad",
  ],
  Golestan: [],
  Gilan: ["Guilan"],
  Lorestan: [],
  Mazandaran: [],
  Markazi: [],
  Hormozgan: [],
  Hamadan: [],
  Yazd: [],
};

let normalizedMapFA: Record<string, string> | null = null;
let normalizedMapEN: Record<string, string> | null = null;

function buildNormalizedMap(
  variants: Record<string, string[]>
): Record<string, string> {
  const map: Record<string, string> = {};

  for (const [standardName, alternativeNames] of Object.entries(variants)) {
    const normalizedStandard = standardName
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
    map[normalizedStandard] = standardName;

    alternativeNames.forEach((variant) => {
      const normalizedVariant = variant
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      map[normalizedVariant] = standardName;
    });
  }

  return map;
}

function getNormalizedMap(language: "fa" | "en"): Record<string, string> {
  if (language === "fa") {
    if (!normalizedMapFA) {
      normalizedMapFA = buildNormalizedMap(PROVINCE_NAME_VARIANTS);
    }
    return normalizedMapFA;
  } else {
    if (!normalizedMapEN) {
      normalizedMapEN = buildNormalizedMap(PROVINCE_NAME_VARIANTS_EN);
    }
    return normalizedMapEN;
  }
}

export function normalizeProvinceName(
  name: string,
  language: "fa" | "en" = "fa"
): string {
  const normalized = name.toLowerCase().replace(/\s+/g, " ").trim();
  const map = getNormalizedMap(language);
  return map[normalized] || name;
}
