"use client";
import React, { useState } from 'react';

const Zahraa = () => {
  const [area, setArea] = useState<string>('');
  const [pricePerMeter, setPricePerMeter] = useState<string>('');
  const [zone, setZone] = useState<string>('');
  const [quarterlyData, setQuarterlyData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const zones = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4'];

  const calculate = () => {
    if (!area || !pricePerMeter || !zone) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const areaNum = parseFloat(area);
    const pricePerMeterNum = parseFloat(pricePerMeter);

    if (isNaN(areaNum) || isNaN(pricePerMeterNum)) {
      alert('يرجى إدخال قيم صحيحة');
      return;
    }

    setLoading(true);

    const totalPrice = areaNum * pricePerMeterNum;
    const discount = totalPrice * 0.05;  // 5% discount
    const adjustedTotalPrice = totalPrice - discount;
    const contractPayment = totalPrice * 0.07;  // 7% contract payment

    // Quarterly Data
    const quarterlyInstallment = (adjustedTotalPrice - contractPayment - (adjustedTotalPrice * 0.2)) / 28;  // 28 quarterly installments
    const halfTimePayment = adjustedTotalPrice * 0.2;  // Payment after 2.5 years
    const maintenance = adjustedTotalPrice * 0.1;  // 10% maintenance fee

    const quarterlyData = {
      totalPrice: adjustedTotalPrice,
      contractPayment,
      quarterlyInstallment,
      halfTimePayment,
      discount,
      maintenance,
    };

    // Monthly Data
    const monthlyInstallment = (adjustedTotalPrice - contractPayment - (adjustedTotalPrice * 0.2)) / 82;  // 82 monthly installments
    const yearlyInstallment = adjustedTotalPrice * 0.05;  // 5% yearly installment
    const finalPayment = adjustedTotalPrice * 0.2;  // Payment upon receipt

    const monthlyData = {
      totalPrice: adjustedTotalPrice,
      contractPayment,
      yearlyInstallment,
      monthlyInstallment,
      finalPayment,
      discount,
      maintenance,
    };

    setQuarterlyData(quarterlyData);
    setMonthlyData(monthlyData);
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', direction: 'rtl', fontFamily: 'Arial, sans-serif' }}>
      <h1>حساب تكلفة Zahraa</h1>

      <label>المساحة (م²): </label>
      <input
        type="number"
        value={area}
        className="m-2 text-black"
        onChange={(e) => setArea(e.target.value)}
        placeholder="أدخل المساحة"
      />

      <label>سعر المتر: </label>
      <input
        type="number"
        value={pricePerMeter}
        className="m-2 text-black"
        onChange={(e) => setPricePerMeter(e.target.value)}
        placeholder="أدخل سعر المتر"
      />

      <label>اختر المنطقة: </label>
      <select
        value={zone}
        onChange={(e) => setZone(e.target.value)}
        className="m-2 text-black"
      >
        <option value="">اختر المنطقة</option>
        {zones.map((zoneOption, index) => (
          <option key={index} value={zoneOption}>
            {zoneOption}
          </option>
        ))}
      </select>

      <button onClick={calculate} disabled={loading}>احسب</button>
      {loading && <div>جاري الحساب...</div>}

      <h2>النتائج</h2>

      {/* Quarterly Data */}
      {quarterlyData && (
        <table style={{ width: '80%', margin: 'auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>مدة التقسيط</th>
              <th>الإجمالي</th>
              <th>الإجمالي بعد الخصم</th>
              <th>دفعة التعاقد</th>
              <th>أقساط ربع سنوية بعد الخصم</th>
              <th>دفعة بعد سنتين ونصف</th>
              <th>الصيانة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8 سنوات</td>
              <td>{quarterlyData.totalPrice.toLocaleString()}</td>
              <td>{(quarterlyData.totalPrice - quarterlyData.discount).toLocaleString()}</td>
              <td>{quarterlyData.contractPayment.toLocaleString()}</td>
              <td>{quarterlyData.quarterlyInstallment.toLocaleString()}</td>
              <td>{quarterlyData.halfTimePayment.toLocaleString()}</td>
              <td>{quarterlyData.maintenance.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Monthly Data */}
      {monthlyData && (
        <table style={{ width: '80%', margin: 'auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>مدة التقسيط</th>
              <th>الإجمالي</th>
              <th>الإجمالي بعد الخصم</th>
              <th>دفعة التعاقد</th>
              <th>أقساط شهرية بعد الخصم</th>
              <th>أقساط سنوية</th>
              <th>دفعة الاستلام</th>
              <th>الصيانة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8 سنوات</td>
              <td>{monthlyData.totalPrice.toLocaleString()}</td>
              <td>{(monthlyData.totalPrice - monthlyData.discount).toLocaleString()}</td>
              <td>{monthlyData.contractPayment.toLocaleString()}</td>
              <td>{monthlyData.monthlyInstallment.toLocaleString()}</td>
              <td>{monthlyData.yearlyInstallment.toLocaleString()}</td>
              <td>{monthlyData.finalPayment.toLocaleString()}</td>
              <td>{monthlyData.maintenance.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      )}

      <p>يتم سداد 10% كمصاريف صيانة عند الاستلام.</p>
    </div>
  );
};

export default Zahraa;
