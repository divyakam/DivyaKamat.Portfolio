import { Tagline } from "@/components/home/Tagline";
import { ContactFab } from "@/components/fab/ContactFab";

/**
 * HomeView — §8.3
 * Tagline + subtext + FAB, centred in the right panel.
 */
export function HomeView() {
  return (
    <div
      style={{
        minHeight: "calc(100dvh - 56px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 24,
        position: "relative",
      }}
    >
      <Tagline />
      <ContactFab />
    </div>
  );
}
