"use client"; // لأننا نستخدم حالة (state) في هذا المكون

import { useState } from "react";
import Link from "next/link";

export default function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm); // تمرير مصطلح البحث إلى الدالة الأب
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* اسم الشركة */}
        <Link href="/" className="text-xl font-bold">
          معمار المرشدي
        </Link>

        {/* شريط البحث */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ابحث عن مشروع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            بحث
          </button>
        </div>
      </div>
    </nav>
  );
}