import axios from "axios";
import { useEffect, useState } from "react";

const JobSearchBar = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const FetchData = () => {
    axios
      .get(`http://localhost:3000/api/jobs`, {
        title: jobTitle,
        location: location,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log({ jobTitle, location, jobType });
    FetchData();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 items-center bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto"
    >
      {/* Job Title Input */}
      <input
        type="text"
        placeholder="Job title or keywords"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Location Dropdown */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Location</option>
        <option value="new-york">New York</option>
        <option value="london">London</option>
        <option value="remote">Remote</option>
      </select>

      {/* Job Type Dropdown */}
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="w-full md:w-1/4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Job Type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default JobSearchBar;
