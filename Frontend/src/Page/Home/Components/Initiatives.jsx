// src/components/Initiatives.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../../components/ProjectCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LiaArrowRightSolid } from "react-icons/lia";
import { fetchEvents } from "../../../Redux/slice/Events.slice";
import {Link} from "react-router-dom"

const Initiatives = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  /* ---------- Desktop Pagination ---------- */
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProjects = events.slice(startIndex, startIndex + itemsPerPage);

  /* ---------- Mobile Slider ---------- */
  const [mobileIndex, setMobileIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-3">
              From Vision to Reality
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Initiatives we proudly completed
            </h3>
          </div>

          <a className="hidden md:flex cursor-pointer items-center gap-2 text-orange-600 font-bold">
            <Link to="/event" className="flex gap-1"> View all projects <LiaArrowRightSolid size={22} className="mt-1" /></Link>
          </a>
        </div>

        {/* ================= Desktop Grid ================= */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ProjectCard key={i} loading />
              ))
            : visibleProjects.map((event) => (
                <ProjectCard
                  key={event._id}
                  mediaUrl={event.mediaUrl}
                  mediaType={event.mediaType}
                  title={event.title}
                  description={event.description}
                  city={event.location}
                  date={event.date}
                  category={event.organizedBy}
                />
              ))}
        </div>

        {/* ================= Pagination ================= */}
        {totalPages > 1 && (
          <div className="hidden md:flex mt-12 justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-gray-100"
            >
              <FaChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === page
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-gray-100"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* ================= Mobile Slider ================= */}
        <div className="md:hidden mt-8">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <ProjectCard key={i} loading />
                  ))
                : events.map((event) => (
                    <ProjectCard
                      key={event._id}
                      mediaUrl={event.mediaUrl}
                      mediaType={event.mediaType}
                      title={event.title}
                      description={event.description}
                      city={event.location}
                      date={event.date}
                      category={event.organizedBy}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
