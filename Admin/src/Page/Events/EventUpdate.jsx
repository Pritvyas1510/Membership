import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api/Api";
import toast from "react-hot-toast";

const EventUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizedBy: "",
    media: null,        // new file
    mediaUrl: "",       // existing media
    mediaType: "",
  });

  const [preview, setPreview] = useState(null);

  /* FETCH EVENT */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get("/event");
        const event = res.data.find((e) => e._id === id);

        if (!event) {
          toast.error("Event not found");
          return navigate("/eventhome");
        }

        setFormData({
          ...event,
          media: null,
        });
      } catch {
        toast.error("Failed to load event");
      }
    };

    fetchEvent();
  }, [id, navigate]);

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* MEDIA CHANGE */
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((p) => ({
      ...p,
      media: file,
      mediaUrl: "",   // 🔥 remove old media
      mediaType: "",
    }));

    setPreview(URL.createObjectURL(file));
  };

  /* REMOVE EXISTING MEDIA */
  const removeMedia = () => {
    setFormData((p) => ({
      ...p,
      mediaUrl: "",
      mediaType: "",
      media: null,
    }));
    setPreview(null);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("date", formData.date);
    fd.append("time", formData.time);
    fd.append("location", formData.location);
    fd.append("organizedBy", formData.organizedBy);

    if (formData.media) {
      fd.append("media", formData.media);
    }

    try {
      await api.put(`/event/${id}`, fd);
      toast.success("Event updated successfully");
      navigate("/eventhome");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow w-full max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Update Event</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" value={formData.title} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />

          <textarea name="description" rows="3"
            value={formData.description} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />

          <div className="grid grid-cols-2 gap-3">
            <input type="date" name="date" value={formData.date}
              onChange={handleChange} className="border px-4 py-2 rounded" />
            <input type="time" name="time" value={formData.time}
              onChange={handleChange} className="border px-4 py-2 rounded" />
          </div>

          <input name="location" value={formData.location}
            onChange={handleChange} className="w-full px-4 py-2 border rounded" />

          <input name="organizedBy" value={formData.organizedBy}
            onChange={handleChange} className="w-full px-4 py-2 border rounded" />

          {/* CURRENT MEDIA */}
          {formData.mediaUrl && (
            <div className="relative">
              {formData.mediaType === "image" ? (
                <img src={formData.mediaUrl} className="h-40 rounded" />
              ) : (
                <video src={formData.mediaUrl} controls className="h-40 rounded" />
              )}
              <button
                type="button"
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* NEW PREVIEW */}
          {preview && (
            <div>
              {formData.media?.type.startsWith("image") ? (
                <img src={preview} className="h-40 rounded" />
              ) : (
                <video src={preview} controls className="h-40 rounded" />
              )}
            </div>
          )}

          {/* UPLOAD */}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventUpdate;
