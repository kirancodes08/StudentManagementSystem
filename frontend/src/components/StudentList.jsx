import { useState, useEffect } from "react";
import axios from "axios";
import "./StudentList.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/student/${id}`);

      setStudents((previousStudents) =>
        previousStudents.filter((student) => student._id !== id),
      );
    } catch (err) {
      setError("Could not delete student. Please try again.");
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/student");

        setStudents(response.data);
      } catch (err) {
        setError("Could not load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
  return (
    <div className="student-page">
      <h1 className="student-title">Student Management System</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td>{student.enrolled ? "Enrolled" : "Not Enrolled"}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
