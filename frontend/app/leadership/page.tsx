import { CoreValuesSection } from "@/components/leadership/CoreValuesSection";
import { LeadershipHeroSection } from "@/components/leadership/LeadershipHeroSection";
import { LeadershipPhilosophySection } from "@/components/leadership/LeadershipPhilosophySection";
import { LeadershipTeamSection } from "@/components/leadership/LeadershipTeamSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPersonJsonLd } from "@/lib/json-ld";
import { fetchLeadershipContent } from "@/lib/leadership-content";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("leadership", { canonicalPath: "/leadership" });

export const dynamic = "force-dynamic";

export default async function LeadershipPage() {
  const leadership = await fetchLeadershipContent();

  return (
    <>
      <JsonLd data={getPersonJsonLd(leadership.team.members)} />
      <LeadershipHeroSection content={leadership.hero} />
      <LeadershipPhilosophySection content={leadership.philosophy} />
      <LeadershipTeamSection content={leadership.team} />
      <CoreValuesSection content={leadership.values} />
      <PageCtaBanner
        title={leadership.cta.title}
        description={leadership.cta.description}
        cta={leadership.cta.cta}
      />
    </>
  );
}
