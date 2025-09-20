import React, { useState, useEffect } from "react";

export default function Checkins() {
  const [checkins, setCheckins] = useState([]);
  const [studentId, setStudentId] = useState("");

  // Fetch all checkins
  const fetchCheckins = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/checkins/");
      const data = await res.json();
      setCheckins(data);
    } catch (error) {
      console.error("Error fetching checkins:", error);
    }
  };

  useEffect(() => {
    fetchCheckins();
  }, []);

  // Handle check-in submit
  const handleCheckin = async (e) => {
    e.preventDefault();

    if (!studentId.trim()) {
      alert("Please enter a Student ID");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/checkins/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });

      if (res.ok) {
        setStudentId(""); // clear input
        fetchCheckins(); // refresh checkins list
      } else {
        const errorData = await res.json();
        alert("Check-in failed: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error during check-in:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-red-700 mb-4">
        Check-in Management
      </h1>

      {/* Check-in Form */}
      <form onSubmit={handleCheckin} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Check In
        </button>
      </form>

      {/* Check-ins Table */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Check-ins</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-red-100 text-left">
            <th className="border border-gray-300 p-2">Student ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {checkins.map((c) => (
            <tr key={c.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">
                {c.student?.studentId}
              </td>
              <td className="border border-gray-300 p-2">{c.student?.name}</td>
              <td className="border border-gray-300 p-2">{c.student?.email}</td>
              <td className="border border-gray-300 p-2">
                {new Date(c.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
