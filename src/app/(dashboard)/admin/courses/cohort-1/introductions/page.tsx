import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import IntroCarousel, { type ParticipantIntro } from "./intro-carousel";

const COHORT_NAMES = ["Celeste", "Nori", "Daniel", "Lora", "Marielle"];

export default async function IntroductionsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: intakes } = await supabase
    .from("intake_responses")
    .select("user_id, first_name, business_oneliner, one_thing");

  const intakeByFirstName = Object.fromEntries(
    (intakes ?? [])
      .filter((r) => r.first_name)
      .map((r) => [r.first_name!.toLowerCase(), r])
  );

  const participants: ParticipantIntro[] = COHORT_NAMES.map((name, i) => {
    const match = intakeByFirstName[name.toLowerCase()];
    return {
      id: String(i),
      name,
      business: match?.business_oneliner ?? null,
      oneThing: match?.one_thing ?? null,
    };
  });

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/courses/cohort-1"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back to Cohort 1
        </Link>
        <p className="tm-eyebrow mb-1">Cohort 1 · Kickoff Session</p>
        <h1
          className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-2"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
        >
          Participant Introductions
        </h1>
        <p className="tm-body-sm max-w-lg">
          Each participant will share their name, what they do, and one thing
          they want to transform or become by the end of Week 4.
        </p>
      </div>

      <IntroCarousel participants={participants} />
    </div>
  );
}
