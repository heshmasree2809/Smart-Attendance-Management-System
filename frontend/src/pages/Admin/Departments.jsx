import React, { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";
import { Plus, Pencil, Trash } from "lucide-react";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function Departments() {
  const [rows, setRows] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [form, setForm] = useState({ name: "", hod: "" });

  const load = async () => {
    const res = await adminAPI.getDepartments();
    setRows(res.data || []);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: "", hod: "" }); setOpenForm(true); };
  const openEdit = (r) => { setEditing(r); setForm({ name: r.name, hod: r.hod }); setOpenForm(true); };
  const save = async () => {
    if (editing) await adminAPI.updateDepartment(editing.id, form);
    else await adminAPI.createDepartment(form);
    setOpenForm(false); await load();
  };
  const remove = async () => { await adminAPI.deleteDepartment(confirm.id); setConfirm({open:false,id:null}); await load(); };

  return (
    <div>
      <h1 className="section-title">Departments</h1>

      <div className="flex justify-end mb-3">
        <button className="btn bg-[#A78BFA] text-white" onClick={openCreate}>
          <Plus size={16} /> Add Department
        </button>
      </div>

      <div className="card-soft p-0 overflow-hidden">
        <table className="table-modern w-full">
          <thead><tr><th>Name</th><th>HOD</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.hod}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-ghost" onClick={() => openEdit(r)}><Pencil size={16}/></button>
                    <button className="btn btn-ghost text-red-600" onClick={() => setConfirm({ open: true, id: r.id })}><Trash size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td className="p-6 text-center text-slate-500" colSpan={3}>No departments</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal
        open={openForm}
        title={editing ? "Edit Department" : "Add Department"}
        onClose={() => setOpenForm(false)}
        footer={<button className="btn bg-[#A78BFA] text-white" onClick={save}>{editing ? "Update" : "Create"}</button>}
      >
        <div className="space-y-3">
          <div><div className="text-sm">Name</div><input className="input mt-1" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} /></div>
          <div><div className="text-sm">HOD</div><input className="input mt-1" value={form.hod} onChange={(e)=>setForm({...form, hod:e.target.value})} /></div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} message="Delete this department?" onCancel={()=>setConfirm({open:false,id:null})} onConfirm={remove}/>
    </div>
  );
}
