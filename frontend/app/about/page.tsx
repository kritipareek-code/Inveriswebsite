import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { MissionVisionSection } from "@/components/about/MissionVisionSection";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import { fetchAboutContent } from "@/lib/about-content";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("about", { canonicalPath: "/about" });

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const about = await fetchAboutContent();

  return (
    <>
      <AboutHeroSection content={about.hero} />
      <WhoWeAreSection content={about.whoWeAre} />
      <MissionVisionSection content={about.missionVision} />
      <PageCtaBanner
        title={about.cta.title}
        description={about.cta.description}
        cta={about.cta.cta}
      />
    </>
  );
}
