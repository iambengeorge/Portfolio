import { lazy, Suspense } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import DesignSystem from "./app/DesignSystem.tsx";
import CaseStudy01 from "./app/CaseStudy01.tsx";
import CaseStudy01v2 from "./app/CaseStudy01v2.tsx";
import Comps from "./app/Comps.tsx";
import "./styles/index.css";

const Case01Figma = lazy(() => import("./case01-figma/App.tsx"));

const rootElement = document.getElementById("root")!;

const app = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/design-system" element={<DesignSystem />} />
      <Route path="/case/01" element={<CaseStudy01 />} />
      <Route path="/case/01v2" element={<CaseStudy01v2 />} />
      <Route
        path="/case/01-figma"
        element={
          <Suspense fallback={null}>
            <Case01Figma />
          </Suspense>
        }
      />
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
