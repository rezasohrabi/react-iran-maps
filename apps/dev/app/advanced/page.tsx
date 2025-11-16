"use client";

import Link from "next/link";
import {
  CustomTooltipSample,
  DifferentSizesSample,
  NoLegendSample,
  CustomAspectRatioSample,
  EnglishNamesSample,
  IncompleteDataSample,
  ZeroValuesSample,
  SequentialLegendsSample,
  SpellingVariantsSample,
} from "../samples";
import { Navbar } from "../components/Navbar";

export default function AdvancedPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              نمونه‌های پیشرفته
            </h2>
            <p className="text-gray-600">
              سناریوهای پیچیده و سفارشی‌سازی‌های پیشرفته
            </p>
          </div>

          <CustomTooltipSample />
          <DifferentSizesSample />
          <NoLegendSample />
          <CustomAspectRatioSample />
          <EnglishNamesSample />
          <IncompleteDataSample />
          <ZeroValuesSample />
          <SequentialLegendsSample />
          <SpellingVariantsSample />

          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">بازگشت به نمونه‌های پایه</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              → نمونه‌های پایه
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
