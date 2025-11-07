import React, { useEffect, useMemo, useState } from "react";
import { adminAPI } from "../../services/api";
import { Plus, Pencil, Trash, Search } from "lucide-react";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // modals
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const [form, setForm] = useState({ name: "", email: "", role: "student" });

  const load = async () => {
    const res = await adminAPI.getUsers();
    setUsers(res.data || []);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchText = (u.name + u.email + u.role).toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" ? true : u.role === roleFilter;
      return matchText && matchRole;
    });
  }, [users, search, roleFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", email: "", role: "student" });
    setOpenForm(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role });
    setOpenForm(true);
  };

  const save = async () => {
    if (editing) {
      await adminAPI.updateUser(editing.id, form);
    } else {
      await adminAPI.createUser(form);
    }
    setOpenForm(false);
    await load();
  };

  const removeUser = async () => {
    await adminAPI.deleteUser(confirm.id);
    setConfirm({ open: false, id: null });
    await load();
  };

  return (
    <div>
      <h1 className="section-title">Manage Users</h1>

      {/* toolbar */}
      <div className="card-soft p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              className="input pl-9 w-64"
              placeholder="Search user"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="input w-40" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button className="btn bg-[#A78BFA] text-white" onClick={openCreate}>
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* table */}
      <div className="card-soft p-0 overflow-hidden">
        <table className="table-modern w-full">
          <thead>
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Role</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-ghost" onClick={() => openEdit(u)}>
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn btn-ghost text-red-600"
                      onClick={() => setConfirm({ open: true, id: u.id })}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td className="p-6 text-center text-slate-500" colSpan={4}>No users</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* form modal */}
      <Modal
        open={openForm}
        title={editing ? "Edit User" : "Add User"}
        onClose={() => setOpenForm(false)}
        footer={
          <button className="btn bg-[#A78BFA] text-white" onClick={save}>
            {editing ? "Update" : "Create"}
          </button>
        }
      >
        <div className="space-y-3">
          <div>
            <div className="text-sm text-slate-600">Name</div>
            <input className="input mt-1" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
          </div>
          <div>
            <div className="text-sm text-slate-600">Email</div>
            <input className="input mt-1" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
          </div>
          <div>
            <div className="text-sm text-slate-600">Role</div>
            <select className="input mt-1" value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* confirm delete */}
      <ConfirmDialog
        open={confirm.open}
        message="Are you sure you want to delete this user?"
        onCancel={() => setConfirm({ open: false, id: null })}
        onConfirm={removeUser}
      />
    </div>
  );
}
