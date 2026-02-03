import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent } from "../../Redux/slice/Event.slice.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const EventHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading } = useSelector((state) => state.event);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Events</h2>
          <p className="text-gray-500 text-sm">Manage and view all events</p>
        </div>

        <Link
          to="/event"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Event
        </Link>
      </div>

      {/* EVENTS */}
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* MEDIA */}
              <div className="relative w-full h-[300px] bg-black">
                {event.mediaType === "image" ? (
                  <img
                    src={event.mediaUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <video
                    src={event.mediaUrl}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* DATE BADGE */}
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  {new Date(event.date).toLocaleDateString("en-IN")}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {event.title}
                </h3>

                {/* ORGANIZER */}
                <p className="text-sm text-gray-500 mb-3">
                  Organized by{" "}
                  <span className="font-semibold text-gray-700">
                    {event.organizedBy}
                  </span>
                </p>

                {/* INFO */}
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <div className="flex items-center gap-2">
                    📍 <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    ⏰ <span>{event.time}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-auto flex gap-3">
                  <button
                    onClick={() => navigate(`/eventupdate/${event._id}`)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(event._id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="font-semibold text-lg mb-2">Delete Event</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this event?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await dispatch(deleteEvent(deleteId)).unwrap();
                    toast.success("Event deleted");
                  } catch (err) {
                    toast.error(err);
                  }
                  setDeleteId(null);
                }}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventHome;
