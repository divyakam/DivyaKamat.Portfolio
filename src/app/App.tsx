import { BrowserRouter } from "react-router-dom";
import { AppShell } from "./AppShell";

// Font imports — self-hosted via Fontsource (Latin subset, woff2)
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/gochi-hand/400.css";
import "@fontsource/newsreader/600.css";

// Global styles
import "@/styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
