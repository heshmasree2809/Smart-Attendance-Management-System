import React, { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";
import { Plus, Pencil, Trash } from "lucide-react";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function Courses() {
  const [rows, setRows] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [form, setForm] = useState({ code: "", name: "", credits: 4 });

  const load = async () => {
    const res = await adminAPI.getCourses();
    setRows(res.data || []);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ code: "", name: "", credits: 4 }); setOpenForm(true); };
  const openEdit = (r) => { setEditing(r); setForm({ code: r.code, name: r.name, credits: r.credits }); setOpenForm(true); };
  const save = async () => {
    if (editing) await adminAPI.updateCourse(editing.id, form);
    else await adminAPI.createCourse(form);
    setOpenForm(false); await load();
  };
  const remove = async () => { await adminAPI.deleteCourse(confirm.id); setConfirm({open:false,id:null}); await load(); };

  return (
    <div>
      <h1 className="section-title">Courses</h1>

      <div className="flex justify-end mb-3">
        <button className="btn bg-[#A78BFA] text-white" onClick={openCreate}>
          <Plus size={16} /> Add Course
        </button>
      </div>

      <div className="card-soft p-0 overflow-hidden">
        <table className="table-modern w-full">
          <thead><tr><th>Code</th><th>Name</th><th>Credits</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="p-3">{r.code}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.credits}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-ghost" onClick={() => openEdit(r)}><Pencil size={16}/></button>
                    <button className="btn btn-ghost text-red-600" onClick={() => setConfirm({ open: true, id: r.id })}><Trash size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td className="p-6 text-center text-slate-500" colSpan={4}>No courses</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal
        open={openForm}
        title={editing ? "Edit Course" : "Add Course"}
        onClose={() => setOpenForm(false)}
        footer={<button className="btn bg-[#A78BFA] text-white" onClick={save}>{editing ? "Update" : "Create"}</button>}
      >
        <div className="space-y-3">
          <div><div className="text-sm">Code</div><input className="input mt-1" value={form.code} onChange={(e)=>setForm({...form, code:e.target.value})} /></div>
          <div><div className="text-sm">Name</div><input className="input mt-1" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} /></div>
          <div><div className="text-sm">Credits</div><input className="input mt-1" type="number" value={form.credits} onChange={(e)=>setForm({...form, credits:Number(e.target.value)||0})} /></div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} message="Delete this course?" onCancel={()=>setConfirm({open:false,id:null})} onConfirm={remove}/>
    </div>
  );
}
