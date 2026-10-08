import { useState, useEffect } from 'react';
import './App.css'; // Import file CSS để làm đẹp giao diện

// Tự động nhận link Backend từ Render (hoặc chạy localhost nếu ở máy cá nhân)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách sinh viên (GET)
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách sinh viên:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Thêm mới (POST) hoặc Cập nhật (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `${API_URL}/api/students/${editingId}`
        : `${API_URL}/api/students`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ studentId: '', name: '', email: '' });
        setEditingId(null);
        fetchStudents();
      }
    } catch (err) {
      console.error("Lỗi xử lý dữ liệu:", err);
    }
  };

  // Đưa thông tin lên Form để Sửa
  const handleEdit = (st) => {
    setEditingId(st._id);
    setFormData({ studentId: st.studentId, name: st.name, email: st.email });
  };

  // Xóa sinh viên (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      try {
        const res = await fetch(`${API_URL}/api/students/${id}`, { method: 'DELETE' });
        if (res.ok) fetchStudents();
      } catch (err) {
        console.error("Lỗi xóa sinh viên:", err);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ studentId: '', name: '', email: '' });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ứng Dụng Quản Lý Sinh Viên</h1>
      </header>

      {/* Form nhập dữ liệu */}
      <div className="card">
        <h2 className="card-title">
          {editingId ? "Cập Nhật Thông Tin Sinh Viên" : "Thêm Sinh Viên Mới"}
        </h2>
        <form onSubmit={handleSubmit} className="student-form">
          <input
            name="studentId"
            placeholder="MSSV"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
          <input
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="button-group">
            <button type="submit" className={`btn ${editingId ? 'btn-update' : 'btn-add'}`}>
              {editingId ? "Lưu Cập Nhật" : "Thêm Sinh Viên"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Hiển thị danh sách */}
      <div className="card">
        <h2 className="card-title">Danh Sách Sinh Viên</h2>
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và Tên</th>
                <th>Email</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-msg">Chưa có sinh viên nào trong danh sách.</td>
                </tr>
              ) : (
                students.map((st) => (
                  <tr key={st._id}>
                    <td><strong>{st.studentId}</strong></td>
                    <td>{st.name}</td>
                    <td>{st.email}</td>
                    <td className="action-buttons">
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(st)}>Sửa</button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(st._id)}>Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;