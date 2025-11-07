// ✅ FULL MOCK BACKEND FOR FRONTEND DEVELOPMENT
console.log("%c✅ FULL MOCK BACKEND ACTIVE", "color: lightgreen; font-size: 16px;");

// ---------------------- Mock seed data ----------------------
export const mockUsers = {
  admin: { id: "admin001", name: "Admin User", email: "admin@scaams.com", role: "admin" },
  faculty: { id: "faculty001", name: "Dr. Rakesh", email: "faculty@scaams.com", role: "faculty", department: "CSE" },
  student: { id: "student001", name: "John Doe", email: "student@scaams.com", role: "student", rollNo: "21A21A05B1", year: "III", department: "CSE" },
};

export const mockAdminStats = {
  totalStudents: 1200,
  totalFaculty: 80,
  activeCourses: 52,
  totalDepartments: 8,
};

export const mockMarks = [
  { subject: "OS", internal: 24, external: 58, total: 82 },
  { subject: "DBMS", internal: 20, external: 64, total: 84 },
  { subject: "CN", internal: 22, external: 60, total: 82 },
];

export const mockAttendance = [
  { date: "2025-01-01", subject: "OS", status: "present" },
  { date: "2025-01-02", subject: "DBMS", status: "absent" },
  { date: "2025-01-03", subject: "CN", status: "present" },
  { date: "2025-01-04", subject: "Maths", status: "late" },
];

export let mockAssignments = [
  { _id: "as1", title: "Assignment 1 - Data Structures", description: "Explain stack operations", dueDate: "2025-12-02", course: { code: "CSE101", name: "DSA" }, faculty: { name: "Dr. Rakesh" }, attachments: [], submissions: [] },
  { _id: "as2", title: "Assignment 2 - DBMS", description: "Write SQL Queries", dueDate: "2025-12-10", course: { code: "CSE102", name: "DBMS" }, faculty: { name: "Dr. Rakesh" }, attachments: [], submissions: [] },
];

export const mockTimetable = [
  { day: "Monday", subject: "OS", time: "10:00 AM - 11:00 AM" },
  { day: "Tuesday", subject: "DBMS", time: "9:00 AM - 10:00 AM" },
  { day: "Wednesday", subject: "CN", time: "12:00 PM - 1:00 PM" },
];

// ---------------------- In-memory DB ----------------------
let mockUsersDB = [mockUsers.admin, mockUsers.faculty, mockUsers.student];
let mockDepartmentsDB = [
  { id: "d1", name: "CSE", hod: "Dr. Rakesh" },
  { id: "d2", name: "ECE", hod: "Dr. Sneha" },
];
let mockCoursesDB = [
  { id: "c1", code: "CSE101", name: "Data Structures", credits: 4 },
  { id: "c2", code: "CSE102", name: "DBMS", credits: 4 },
];
let mockNoticesDB = [
  { id: "n1", title: "Holiday Notice", message: "Holiday on 14th Nov" },
];

export const mockDB = {
  attendance: [],
};

// ---------------------- Enable mock ----------------------
export function enableMockBackend(API) {
  // request delay
  API.interceptors.request.use((config) => {
    return new Promise((resolve) => setTimeout(() => resolve(config), 200));
  });

  API.interceptors.response.use(
    (res) => res,
    (error) => {
      const url = error.config.url;
      const method = (error.config.method || "get").toLowerCase();
      const body = error.config.data ? JSON.parse(error.config.data) : {};

      // ---------- AUTH ----------
      if (url.includes("/auth/login")) {
        const email = body.email || "";
        let role = "student";
        if (email.includes("admin")) role = "admin";
        if (email.includes("faculty")) role = "faculty";
        return Promise.resolve({ data: { token: "mock-token-123", user: mockUsers[role] } });
      }

      // ---------- STATS ----------
      if (url === "/admin/stats") return Promise.resolve({ data: mockAdminStats });

      // ---------- USERS CRUD ----------
      if (url === "/admin/users" && method === "get") return Promise.resolve({ data: mockUsersDB });
      if (url === "/admin/users" && method === "post") {
        const u = { ...body, id: "u" + (mockUsersDB.length + 1) };
        mockUsersDB.push(u);
        return Promise.resolve({ data: u });
      }
      if (url.startsWith("/admin/users/") && method === "put") {
        const id = url.split("/").pop();
        mockUsersDB = mockUsersDB.map((u) => (u.id === id ? { ...u, ...body } : u));
        return Promise.resolve({ data: { success: true } });
      }
      if (url.startsWith("/admin/users/") && method === "delete") {
        const id = url.split("/").pop();
        mockUsersDB = mockUsersDB.filter((u) => u.id !== id);
        return Promise.resolve({ data: { success: true } });
      }

      // ---------- DEPARTMENTS CRUD ----------
      if (url === "/admin/departments" && method === "get") return Promise.resolve({ data: mockDepartmentsDB });
      if (url === "/admin/departments" && method === "post") {
        const d = { ...body, id: "d" + (mockDepartmentsDB.length + 1) };
        mockDepartmentsDB.push(d);
        return Promise.resolve({ data: d });
      }
      if (url.startsWith("/admin/departments/") && method === "put") {
        const id = url.split("/").pop();
        mockDepartmentsDB = mockDepartmentsDB.map((d) => (d.id === id ? { ...d, ...body } : d));
        return Promise.resolve({ data: { success: true } });
      }
      if (url.startsWith("/admin/departments/") && method === "delete") {
        const id = url.split("/").pop();
        mockDepartmentsDB = mockDepartmentsDB.filter((d) => d.id !== id);
        return Promise.resolve({ data: { success: true } });
      }

      // ---------- COURSES CRUD ----------
      if (url === "/admin/courses" && method === "get") return Promise.resolve({ data: mockCoursesDB });
      if (url === "/admin/courses" && method === "post") {
        const c = { ...body, id: "c" + (mockCoursesDB.length + 1) };
        mockCoursesDB.push(c);
        return Promise.resolve({ data: c });
      }
      if (url.startsWith("/admin/courses/") && method === "put") {
        const id = url.split("/").pop();
        mockCoursesDB = mockCoursesDB.map((c) => (c.id === id ? { ...c, ...body } : c));
        return Promise.resolve({ data: { success: true } });
      }
      if (url.startsWith("/admin/courses/") && method === "delete") {
        const id = url.split("/").pop();
        mockCoursesDB = mockCoursesDB.filter((c) => c.id !== id);
        return Promise.resolve({ data: { success: true } });
      }

      // ---------- NOTICES CRUD ----------
      if (url === "/admin/notices" && method === "get") return Promise.resolve({ data: mockNoticesDB });
      if (url === "/admin/notices" && method === "post") {
        const n = { ...body, id: "n" + (mockNoticesDB.length + 1) };
        mockNoticesDB.push(n);
        return Promise.resolve({ data: n });
      }
      if (url.startsWith("/admin/notices/") && method === "put") {
        const id = url.split("/").pop();
        mockNoticesDB = mockNoticesDB.map((n) => (n.id === id ? { ...n, ...body } : n));
        return Promise.resolve({ data: { success: true } });
      }
      if (url.startsWith("/admin/notices/") && method === "delete") {
        const id = url.split("/").pop();
        mockNoticesDB = mockNoticesDB.filter((n) => n.id !== id);
        return Promise.resolve({ data: { success: true } });
      }

      // ---------- Attendance mock (from earlier flow) ----------
      if (url.includes("/faculty/attendance/mark") && method === "post") {
        mockDB.attendance.push({
          regdNo: body.regdNo,
          class: body.class,
          period: body.period,
          timestamp: body.timestamp,
          status: "Present",
        });
        return Promise.resolve({ data: { message: "Attendance Saved" } });
      }
      if (url.includes("/faculty/attendance/list")) return Promise.resolve({ data: mockDB.attendance });

      // ---------- Student utilities ----------
      if (url.includes("/student/assignments") || url.includes("/faculty/assignments")) {
        return Promise.resolve({ data: mockAssignments });
      }
      if (url.includes("/student/attendance")) return Promise.resolve({ data: mockAttendance });
      if (url.includes("/student/marks")) return Promise.resolve({ data: mockMarks });
      if (url.includes("/student/classes/today")) return Promise.resolve({ data: mockTimetable });

      // fallback
      return Promise.resolve({ data: {} });
    }
  );
}
