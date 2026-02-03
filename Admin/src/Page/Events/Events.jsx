import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../Redux/slice/Event.slice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ MISSING STATE
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizedBy: "",
    image: null,
  });

  // ✅ MISSING HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!formData.image) {
      toast.error("Please upload image or video");
      return;
    }

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("date", formData.date);
    fd.append("time", formData.time);
    fd.append("location", formData.location);
    fd.append("organizedBy", formData.organizedBy);
    fd.append("media", formData.image); // 🔑 backend expects "media"

    try {
      await dispatch(createEvent(fd)).unwrap();
      toast.success("Event created successfully");
      navigate("/eventhome");
    } catch (err) {
      toast.error(err || "Event creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-orange-600">
            Organize New Event
          </h1>
          <p className="text-gray-500 text-sm">
            Fill in event details carefully
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* DATE & TIME */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg"
            />
          </div>

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Location"
          />

          {/* ORGANIZED BY */}
          <input
            type="text"
            name="organizedBy"
            required
            value={formData.organizedBy}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Organized By"
          />

          {/* IMAGE / VIDEO */}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleImageChange}
            className="w-full"
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default Events;
