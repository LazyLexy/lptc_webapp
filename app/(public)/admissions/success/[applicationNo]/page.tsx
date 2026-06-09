import AdmissionSuccessCard from "@/components/admissions/AdmissionSuccessCard";

export default async function AdmissionSuccessPage({
  params,
}: {
  params: Promise<{ applicationNo: string }>;
}) {
  const { applicationNo } = await params;

  return (
    <main className="bg-slate-50 px-4 py-14 text-slate-950 sm:px-6 lg:px-8">
      <AdmissionSuccessCard applicationNo={applicationNo} />
    </main>
  );
}
