import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HalUtama from "./pages/hal-utama";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route untuk WhatsApp CRM */}
        <Route path="/" element={<HalUtama />} />

        {/* Kalau ingin halaman lain tinggal tambah di sini */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
