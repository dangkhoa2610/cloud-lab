import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Câu 59 & 63: Lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students');
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

  // Câu 60 & 61: Thêm mới (POST) hoặc Cập nhật (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const url = editingId ? `http://localhost:5000/api/students/${editingId}` : 'http://localhost:5000/api/students';
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

  // Câu 61: Đưa thông tin lên Form để Sửa
  const handleEdit = (st) => {
    setEditingId(st._id);
    setFormData({ studentId: st.studentId, name: st.name, email: st.email });
  };

  // Câu 62: Xóa sinh viên (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' });
        if (res.ok) fetchStudents();
      } catch (err) {
        console.error("Lỗi xóa sinh viên:", err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>{editingId ? "Cập Nhật Sinh Viên" : "Thêm Sinh Viên Mới"}</h2>
      
      {/* Form nhập dữ liệu */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input name="studentId" placeholder="MSSV" value={formData.studentId} onChange={handleChange} required />
        <input name="name" placeholder="Họ và tên" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">{editingId ? "Lưu Cập Nhật" : "Thêm"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ studentId: '', name: '', email: '' }); }}>Hủy</button>}
      </form>

      {/* Hiển thị danh sách */}
      <h2>Danh Sách Sinh Viên</h2>
      <ul>
        {students.map((st) => (
          <li key={st._id} style={{ marginBottom: '8px' }}>
            {st.studentId} - {st.name} - {st.email} {' '}
            <button onClick={() => handleEdit(st)}>Sửa</button> {' '}
            <button onClick={() => handleDelete(st._id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;