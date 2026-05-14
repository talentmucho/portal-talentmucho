import CohortIntakeForm from "@/components/cohort1/CohortIntakeForm";

export const metadata = {
  title: "Build your Bootcamp Map · Cohort 1",
  robots: { index: false },
};

export default function Session2Page() {
  return <CohortIntakeForm nextPath="/participant/courses/cohort-1" prevPath="/participant/courses/cohort-1/session-1" />;
}
