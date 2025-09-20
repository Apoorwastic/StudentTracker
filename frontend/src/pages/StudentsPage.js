import React, { useState, useEffect } from "react";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    pincode: "",
    district: "",
    state: "",
    country: "",
  });
  const [pincodeError, setPincodeError] = useState("");

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/students/");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle pincode change and autofill
  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, pincode: value });

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            district: postOffice.District || "",
            state: postOffice.State || "",
            country: postOffice.Country || "India",
          }));
          setPincodeError("");
        } else {
          setPincodeError("Invalid Pincode");
          setFormData((prev) => ({
            ...prev,
            district: "",
            state: "",
            country: "",
          }));
        }
      } catch (err) {
        setPincodeError("Error fetching pincode data");
      }
    }
  };

  // Submit new student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/students/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          name: "",
          email: "",
          studentId: "",
          pincode: "",
          district: "",
          state: "",
          country: "",
        });
        fetchStudents();
        setPincodeError("");
      } else {
        const errorData = await res.json();
        alert("Error adding student: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-red-700">Student Management</h2>

      {/* Add Student Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 bg-white shadow rounded grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={(e) =>
            setFormData({ ...formData, studentId: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handlePincodeChange}
          className="border p-2 rounded w-full"
          required
        />
        {pincodeError && (
          <p className="text-red-500 col-span-2">{pincodeError}</p>
        )}
        <input
          type="text"
          placeholder="District"
          value={formData.district}
          onChange={(e) =>
            setFormData({ ...formData, district: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="State"
          value={formData.state}
          onChange={(e) =>
            setFormData({ ...formData, state: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded col-span-2"
        >
          Add Student
        </button>
      </form>

      {/* Student List */}
      <h3 className="text-lg font-semibold mb-2">All Students</h3>
      <table className="w-full border border-gray-300">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Student ID</th>
            <th className="p-2 border">Pincode</th>
            <th className="p-2 border">District</th>
            <th className="p-2 border">State</th>
            <th className="p-2 border">Country</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="text-center">
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.email}</td>
              <td className="p-2 border">{s.studentId}</td>
              <td className="p-2 border">{s.pincode}</td>
              <td className="p-2 border">{s.district}</td>
              <td className="p-2 border">{s.state}</td>
              <td className="p-2 border">{s.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
