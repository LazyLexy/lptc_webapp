import ApplicationPrintView from "@/components/admissions/ApplicationPrintView";

export default async function AdmissionPrintViewPage({
  params,
  searchParams,
}: {
  params: Promise<{ applicationNo: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { applicationNo } = await params;
  const query = await searchParams;
  const token = String(query.token ?? "");

  return (
    <main className="bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <ApplicationPrintView applicationNo={applicationNo} token={token} />
    </main>
  );
}
