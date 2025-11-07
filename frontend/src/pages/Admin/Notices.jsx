import React, { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";
import { Plus, Pencil, Trash } from "lucide-react";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function Notices() {
  const [rows, setRows] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [form, setForm] = useState({ title: "", message: "" });

  const load = async () => {
    const res = await adminAPI.getNotices();
    setRows(res.data || []);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title:"", message:"" }); setOpenForm(true); };
  const openEdit = (r) => { setEditing(r); setForm({ title: r.title, message: r.message }); setOpenForm(true); };
  const save = async () => {
    if (editing) await adminAPI.updateNotice(editing.id, form);
    else await adminAPI.createNotice(form);
    setOpenForm(false); await load();
  };
  const remove = async () => { await adminAPI.deleteNotice(confirm.id); setConfirm({open:false,id:null}); await load(); };

  return (
    <div>
      <h1 className="section-title">Notices</h1>

      <div className="flex justify-end mb-3">
        <button className="btn bg-[#A78BFA] text-white" onClick={openCreate}>
          <Plus size={16} /> Publish Notice
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="card-soft p-5 flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold text-[#4C1D95]">{r.title}</div>
              <div className="text-slate-600 mt-1">{r.message}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => openEdit(r)}><Pencil size={16}/></button>
              <button className="btn btn-ghost text-red-600" onClick={() => setConfirm({ open: true, id: r.id })}><Trash size={16}/></button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="card-soft p-6 text-center text-slate-500">No notices</div>}
      </div>

      <Modal
        open={openForm}
        title={editing ? "Edit Notice" : "Publish Notice"}
        onClose={() => setOpenForm(false)}
        footer={<button className="btn bg-[#A78BFA] text-white" onClick={save}>{editing ? "Update" : "Publish"}</button>}
      >
        <div className="space-y-3">
          <div><div className="text-sm">Title</div><input className="input mt-1" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} /></div>
          <div><div className="text-sm">Message</div><textarea className="input mt-1 h-28" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} /></div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} message="Delete this notice?" onCancel={()=>setConfirm({open:false,id:null})} onConfirm={remove}/>
    </div>
  );
}
