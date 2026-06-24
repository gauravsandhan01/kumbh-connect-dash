import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck2, FileText, CheckCircle2, XCircle, RefreshCcw, Eye } from "lucide-react";

export const Route = createFileRoute("/_admin/documents")({
  head: () => ({ meta: [{ title: "Documents Verification · Admin" }] }),
  component: DocumentsPage,
});

type Doc = { id: string; vendor: string; biz: string; type: string; submitted: string; status: "Pending" | "Approved" | "Rejected" | "Resubmit"; };
const docs: Doc[] = [
  { id: "DOC-501", vendor: "Ravi Kumar", biz: "Ganga View Hotel", type: "Aadhaar Card", submitted: "2h ago", status: "Pending" },
  { id: "DOC-502", vendor: "Ravi Kumar", biz: "Ganga View Hotel", type: "PAN Card", submitted: "2h ago", status: "Approved" },
  { id: "DOC-503", vendor: "Sita Devi", biz: "Annapurna Mess", type: "FSSAI License", submitted: "5h ago", status: "Pending" },
  { id: "DOC-504", vendor: "Dr. Mehta", biz: "Sangam Medical", type: "Medical License", submitted: "1d ago", status: "Resubmit" },
  { id: "DOC-505", vendor: "Mahesh T.", biz: "Tirth Transport", type: "Transport License", submitted: "2d ago", status: "Pending" },
  { id: "DOC-506", vendor: "Priya Iyer", biz: "Tulsi Bhandar", type: "GST Certificate", submitted: "3d ago", status: "Rejected" },
  { id: "DOC-507", vendor: "Rakesh Y.", biz: "Shiv Camp", type: "Trade License", submitted: "4d ago", status: "Approved" },
  { id: "DOC-508", vendor: "Ravi Kumar", biz: "Ganga View Hotel", type: "Hotel License", submitted: "2h ago", status: "Pending" },
];

const tone = (s: Doc["status"]) =>
  s === "Approved" ? "bg-emerald-100 text-emerald-700" :
  s === "Rejected" ? "bg-rose-100 text-rose-700" :
  s === "Resubmit" ? "bg-amber-100 text-amber-700" :
  "bg-sacred-blue/10 text-sacred-blue";

function DocumentsPage() {
  const [tab, setTab] = useState<"All" | Doc["status"]>("Pending");
  const filtered = docs.filter(d => tab === "All" || d.status === tab);
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Documents Verification</h1>
          <p className="text-sm text-muted-foreground">Verify KYC, business and license documents submitted by vendors.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-full bg-saffron/10 px-3 py-1.5 text-sm font-semibold text-saffron">
          <FileCheck2 className="h-4 w-4" />{docs.filter(d => d.status === "Pending").length} pending
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {(["All", "Pending", "Approved", "Rejected", "Resubmit"] as const).map((t) => (
          <Button key={t} size="sm" variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)} className="rounded-full">{t}</Button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Document</th>
                <th className="px-4 py-3 hidden md:table-cell">Vendor / Business</th>
                <th className="px-4 py-3 hidden lg:table-cell">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-saffron/10 text-saffron"><FileText className="h-4 w-4" /></span>
                      <div>
                        <div className="font-semibold">{d.type}</div>
                        <div className="text-xs text-muted-foreground">{d.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="font-medium">{d.vendor}</div>
                    <div className="text-xs text-muted-foreground">{d.biz}</div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{d.submitted}</td>
                  <td className="px-4 py-3"><Badge className={`${tone(d.status)} rounded-full`}>{d.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" aria-label="View"><Eye className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" aria-label="Approve"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></Button>
                      <Button size="icon" variant="ghost" aria-label="Reject"><XCircle className="h-4 w-4 text-rose-600" /></Button>
                      <Button size="icon" variant="ghost" aria-label="Resubmit"><RefreshCcw className="h-4 w-4 text-amber-600" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}