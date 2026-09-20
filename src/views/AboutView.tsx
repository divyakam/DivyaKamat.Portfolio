import { Wall } from "@/components/about/Wall";
import { WhoAmI } from "@/components/about/WhoAmI";
import { Skills } from "@/components/about/Skills";

/**
 * AboutView — §8.9
 * Three stacked blocks: Wall, Who am I, Skills.
 */
export function AboutView() {
  return (
    <div>
      <h2 className="sr-only">About</h2>

      {/* Wall collage */}
      <Wall />

      {/* Who am I */}
      <div style={{ marginTop: 64 }}>
        <WhoAmI />
      </div>

      {/* Skills */}
      <div style={{ marginTop: 96 }}>
        <Skills />
      </div>
    </div>
  );
}
