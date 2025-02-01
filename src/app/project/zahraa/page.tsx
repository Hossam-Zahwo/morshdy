"use client";
import React, { useState } from "react";



const Zahraa = () => {
  const [area, setArea] = useState("");
  const [pricePerMeter, setPricePerMeter] = useState("");
  const [zone, setZone] = useState("");
  const [quarterlyData, setQuarterlyData] = useState<{
    totalPrice: number;
    adjustedTotalPrice: number;
    contractPayment: number;
    quarterlyInstallment: number;
    maintenance: number;
  } | null>(null);

  const [monthlyData, setMonthlyData] = useState<{
    totalPrice: number;
    adjustedTotalPrice: number;
    contractPayment: number;
    monthlyInstallment: number;
    yearlyInstallment: number;
    maintenance: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4"];

  const calculate = () => {
    // التحقق من المدخلات
    if (!area || !pricePerMeter || !zone) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const areaNum = parseFloat(area.trim());
    const pricePerMeterNum = parseFloat(pricePerMeter.trim());

    if (isNaN(areaNum) || isNaN(pricePerMeterNum)) {
      alert("يرجى إدخال قيم صحيحة");
      return;
    }

    setLoading(true);

    // حساب الإجمالي بعد الخصم
    const totalPrice = areaNum * pricePerMeterNum;
    const discount = 1000000; // ثابت
    const adjustedTotalPrice = totalPrice - discount;
    const contractPayment = 1000000; // ثابت

    // حساب الأقساط الربع سنوية
    const quarterlyInstallment = (adjustedTotalPrice - contractPayment) / 28;
    const maintenance = adjustedTotalPrice * 0.1; // 10% من الإجمالي بعد الخصم

    // بيانات الأقساط الربع سنوية
    setQuarterlyData({
      totalPrice,
      adjustedTotalPrice,
      contractPayment,
      quarterlyInstallment,
      maintenance,
    });

    // حساب الأقساط الشهرية
    const monthlyInstallment = (adjustedTotalPrice - contractPayment) / 82;
    const yearlyInstallment = adjustedTotalPrice / 7;

    // بيانات الأقساط الشهرية
    setMonthlyData({
      totalPrice,
      adjustedTotalPrice,
      contractPayment,
      monthlyInstallment,
      yearlyInstallment,
      maintenance,
    });

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", direction: "rtl", fontFamily: "Arial, sans-serif" }}>
      <h1>حساب تكلفة Zahraa</h1>

      <label>المساحة (م²): </label>
      <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="أدخل المساحة" />

      <label>سعر المتر: </label>
      <input type="number" value={pricePerMeter} onChange={(e) => setPricePerMeter(e.target.value)} placeholder="أدخل سعر المتر" />

      <label>اختر المنطقة: </label>
      <select value={zone} onChange={(e) => setZone(e.target.value)}>
        <option value="">اختر المنطقة</option>
        {zones.map((zoneOption, index) => (
          <option key={index} value={zoneOption}>
            {zoneOption}
          </option>
        ))}
      </select>

      <button onClick={calculate} disabled={loading}>
        احسب
      </button>
      {loading && <div>جاري الحساب...</div>}

      <h2>النتائج</h2>

      {quarterlyData && (
        <table className="w-full mx-auto my-3 overflow-x-auto border-collapse">
          <thead>
            <tr>
              <th className="p-3 border border-gray-200">مدة التقسيط</th>
              <th className="p-3 border border-gray-200">الإجمالي</th>
              <th className="p-3 border border-gray-200">الإجمالي بعد الخصم</th>
              <th className="p-3 border border-gray-200">دفعة التعاقد</th>
              <th className="p-3 border border-gray-200">أقساط ربع سنوية</th>
              <th className="p-3 border border-gray-200">الصيانة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-200">7 سنوات</td>
              <td className="p-3 border border-gray-200">{quarterlyData.totalPrice.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{quarterlyData.adjustedTotalPrice.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{quarterlyData.contractPayment.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{quarterlyData.quarterlyInstallment.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{quarterlyData.maintenance.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      )}

      {monthlyData && (
        <table className="w-full mx-auto my-3 overflow-x-auto border-collapse">
          <thead>
            <tr>
              <th className="p-3 border border-gray-200">مدة التقسيط</th>
              <th className="p-3 border border-gray-200">الإجمالي</th>
              <th className="p-3 border border-gray-200">الإجمالي بعد الخصم</th>
              <th className="p-3 border border-gray-200">دفعة التعاقد</th>
              <th className="p-3 border border-gray-200">أقساط شهرية</th>
              <th className="p-3 border border-gray-200">أقساط سنوية</th>
              <th className="p-3 border border-gray-200">الصيانة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-200">7 سنوات</td>
              <td className="p-3 border border-gray-200">{monthlyData.totalPrice.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{monthlyData.adjustedTotalPrice.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{monthlyData.contractPayment.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{monthlyData.monthlyInstallment.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{monthlyData.yearlyInstallment.toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{monthlyData.maintenance.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      )}
      <p>يتم سداد 10% كمصاريف صيانة عند الاستلام.</p>
    </div>
  );
};

export default Zahraa;


