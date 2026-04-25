import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import DesignSystem from "./app/DesignSystem.tsx";
import CaseStudy01 from "./app/CaseStudy01.tsx";
import Comps from "./app/Comps.tsx";
import "./styles/index.css";

const rootElement = document.getElementById("root")!;

const app = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/design-system" element={<DesignSystem />} />
      <Route path="/case/01" element={<CaseStudy01 />} />
      <Route path="/comps" element={<Comps />} />
    </Routes>
  </BrowserRouter>
);

// Hydrate if prerendered HTML exists, otherwise do a fresh render
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
