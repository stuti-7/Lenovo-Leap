import { useState, useEffect } from "react";

function StudentCard({ student, onDelete }) {
  return (
    <div style={styles.card}>
      <div style={styles.avatar}>{student.name.charAt(0).toUpperCase()}</div>
      <div style={styles.cardInfo}>
        <h3 style={styles.studentName}>{student.name}</h3>
        <p style={styles.studentDetail}>Age: {student.age}</p>
        <p style={styles.studentDetail}>Course: {student.course}</p>
      </div>
      <button style={styles.deleteBtn} onClick={() => onDelete(student.id)}>
        Delete
      </button>
    </div>
  );
}

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!name || !age || !course) {
      setError("Please fill in all fields.");
      return;
    }
    if (isNaN(age) || age <= 0) {
      setError("Please enter a valid age.");
      return;
    }
    onAdd({ name, age: Number(age), course });
    setName("");
    setAge("");
    setCourse("");
    setError("");
  }

  return (
    <div style={styles.formBox}>
      <h2 style={styles.formTitle}>Add New Student</h2>
      <p style={styles.formSubtitle}>
        Fill in the details below to add a student
      </p>

      {error && <p style={styles.errorMsg}>{error}</p>}

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Student Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. Riya Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Age</label>
          <input
            style={styles.input}
            type="number"
            placeholder="e.g. 20"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Course</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. Computer Science"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>&nbsp;</label>
          <button style={styles.addBtn} onClick={handleSubmit}>
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [students, setStudents] = useState(() => {
  const data = localStorage.getItem("students");
  return data
    ? JSON.parse(data)
    : [
        { id: 1, name: "Stuti Shivhare", age: 20, course: "Computer Science" },
        { id: 2, name: "Alice", age: 21, course: "Data Science" },
        { id: 3, name: "John", age: 19, course: "Web Development" },
      ];
});

  //LOAD from localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  //SAVE to localStorage 
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  function addStudent(studentData) {
    setStudents([...students, { id: Date.now(), ...studentData }]);
  }

  function deleteStudent(id) {
    setStudents(students.filter((s) => s.id !== id));
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Student Management App</h1>
        <p style={styles.subtitle}>Total Students: {students.length}</p>
      </header>

      <AddStudentForm onAdd={addStudent} />

      <div style={styles.listSection}>
        <h2 style={styles.listTitle}>Student List</h2>
        {students.length === 0 ? (
          <p style={styles.emptyMsg}>No students yet. Add one above!</p>
        ) : (
          <div style={styles.grid}>
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onDelete={deleteStudent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3eeff",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "36px 48px",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "2rem",
    color: "#5b2d8e",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#9b7ec8",
    fontSize: "0.95rem",
    marginTop: "6px",
  },
  // Form — full width bar
  formBox: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "28px 32px",
    boxShadow: "0 4px 20px rgba(130, 80, 200, 0.1)",
    border: "1.5px solid #e4d4f7",
    marginBottom: "36px",
  },
  formTitle: {
    fontSize: "1.15rem",
    color: "#5b2d8e",
    margin: "0 0 4px 0",
    fontWeight: "700",
  },
  formSubtitle: {
    fontSize: "0.85rem",
    color: "#9b7ec8",
    margin: "0 0 20px 0",
  },
  formRow: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    minWidth: "160px",
  },
  label: {
    fontSize: "0.8rem",
    color: "#7a5ea7",
    marginBottom: "6px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1.5px solid #d8c4f0",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "#faf6ff",
    color: "#3b1f6e",
    width: "100%",
    boxSizing: "border-box",
  },
  addBtn: {
    padding: "11px 24px",
    background: "linear-gradient(135deg, #8e44c8, #6a1fa8)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "0.95rem",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
  },
  errorMsg: {
    color: "#c0392b",
    backgroundColor: "#fdecea",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "14px",
  },
  // Student list
  listSection: {
    marginTop: "8px",
  },
  listTitle: {
    fontSize: "1.1rem",
    color: "#5b2d8e",
    marginTop: 0,
    marginBottom: "16px",
    fontWeight: "700",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 2px 12px rgba(130, 80, 200, 0.08)",
    border: "1.5px solid #ede0fa",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #b07ce8, #7b2fc9)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    fontWeight: "bold",
    flexShrink: 0,
  },
  cardInfo: {
    flex: 1,
  },
  studentName: {
    margin: "0 0 4px 0",
    fontSize: "0.95rem",
    color: "#3b1f6e",
    fontWeight: "600",
  },
  studentDetail: {
    margin: "2px 0",
    fontSize: "0.82rem",
    color: "#9278b8",
  },
  deleteBtn: {
    backgroundColor: "#fdf0ff",
    color: "#a020c0",
    border: "1.5px solid #e0b8f5",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
    fontSize: "0.82rem",
    flexShrink: 0,
    fontWeight: "500",
  },
  emptyMsg: {
    color: "#b89fd4",
    textAlign: "center",
    padding: "40px 0",
    fontSize: "1rem",
  },
};