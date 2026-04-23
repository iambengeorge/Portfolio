import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import DesignSystem from "./app/DesignSystem.tsx";
import CaseStudy01 from "./app/CaseStudy01.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/design-system" element={<DesignSystem />} />
      <Route path="/case/01" element={<CaseStudy01 />} />
    </Routes>
  </BrowserRouter>
);
