import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./store.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
// Si quieres usar estos, descomenta (existen en tu repo):
// import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function AppRoutes() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:type/:id" element={<Details />} />
            <Route path="*" element={<h2>404 - No encontrado</h2>} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    </StoreProvider>
  );
}
