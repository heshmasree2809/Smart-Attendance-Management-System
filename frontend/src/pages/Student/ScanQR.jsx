import React, { useEffect, useMemo, useState } from "react";
import { BarcodeScannerComponent } from "react-qr-barcode-scanner";
import { attendanceAPI } from "../../services/api";
import toast from "react-hot-toast";

function parseKeyValue(txt = "") {
  // supports "classId=...&period=..."
  const params = new URLSearchParams(txt);
  const classId = params.get("classId") || "";
  const period = params.get("period") || "";
  return { classId: decodeURIComponent(classId), period: decodeURIComponent(period) };
}

export default function ScanQR() {
  const [cameraReady, setCameraReady] = useState(false);
  const [scanText, setScanText] = useState("");
  const [form, setForm] = useState({ regdNo: "", classId: "", period: "" });
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(() => {
    return form.regdNo.trim() && form.classId.trim() && form.period.trim();
  }, [form]);

  const onUpdate = (err, result) => {
    if (err) return;
    if (result?.text && !scanText) {
      setScanText(result.text);
      const parsed = parseKeyValue(result.text);
      setForm((f) => ({ ...f, classId: parsed.classId, period: parsed.period }));
      toast.success("QR detected!");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        regdNo: form.regdNo.trim().toUpperCase(),
        classId: form.classId.trim(),
        period: form.period.trim(),
      };
      const { data } = await attendanceAPI.mark(payload);
      setSubmitted(true);
      toast.success("Attendance marked as PRESENT");
      console.log("Saved:", data);
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Failed to mark attendance");
    }
  };

  useEffect(() => {
    // iOS needs user interaction to allow camera; component handles permissions
    setCameraReady(true);
  }, []);

  return (
    <div>
      <h1 className="section-title">Scan Attendance QR</h1>

      {/* Scanner */}
      <div className="glass-card max-w-xl">
        {!scanText && cameraReady ? (
          <div className="rounded-xl overflow-hidden">
            <BarcodeScannerComponent
              width={"100%"}
              height={280}
              onUpdate={onUpdate}
            />
          </div>
        ) : !scanText ? (
          <p className="text-sm text-slate-600">Requesting camera permission…</p>
        ) : (
          <div className="text-sm text-slate-600">
            <p className="mb-2"><b>QR:</b> {scanText}</p>
          </div>
        )}

        {/* Form after scan */}
        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-600">Registration Number</label>
            <input
              className="input mt-1 uppercase"
              placeholder="e.g., 21A21A05B1"
              value={form.regdNo}
              onChange={(e) => setForm({ ...form, regdNo: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-600">Class ID</label>
              <input
                className="input mt-1"
                value={form.classId}
                onChange={(e) => setForm({ ...form, classId: e.target.value })}
                placeholder="CSE3-A-OS"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Period</label>
              <input
                className="input mt-1"
                type="number"
                min="1"
                max="9"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                required
              />
            </div>
          </div>

          <button disabled={!canSubmit} className="btn btn-primary w-full disabled:opacity-60">
            {submitted ? "Marked ✅" : "Submit Attendance"}
          </button>
        </form>
      </div>
    </div>
  );
}
