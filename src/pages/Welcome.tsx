// src/pages/Welcome.tsx
import React from "react"
import Layout from "@/pages/Layout"

export default function Welcome() {
  return (
    <Layout>
        <div className="mb-6">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Topik Utama &gt;{" "}
          <span className="text-gray-700 dark:text-gray-200">
            Dashboard Monitoring Risiko Banjir
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">
          Selamat Datang 👋
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Update Terakhir: Jumat, 10 Oktober 2025 Pukul 14.32 WIB
        </p>

        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2 text-black">Informasi Cepat</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Jumlah lokasi pemantauan banjir: 24</li>
            <li>Zona risiko tinggi: 8 kabupaten</li>
            <li>Terakhir diperbarui: 16 Oktober 2025</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
