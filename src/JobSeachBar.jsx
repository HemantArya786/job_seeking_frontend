import axios from "axios";
import { useState } from "react";

const JobSearchBar = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [data, setData] = useState();

  const FetchData = (title, location) => {
    axios
      .get(`http://localhost:3000/api/jobs`, {
        params: {
          title: title,
          location: location,
        },
      })
      .then((res) => setData(res?.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log({ jobTitle, location, jobType });
    FetchData(jobTitle, location);
  };

  return (
    <div>
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

      <div className="grid grid-cols-1  pt-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((job) => (
          <div
            key={job?.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-1">{job?.title}</h3>
            <p className="text-gray-600">{job?.company}</p>
            <p className="text-sm text-gray-500">{job?.location}</p>
            <span className="inline-block mt-2 text-sm bg-gray-200 px-3 py-1 rounded-full">
              {job.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearchBar;
