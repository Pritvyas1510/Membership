import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchMembers,
  rejectMember,
  deleteMember,
  makeSubAdmin,
} from "../../Redux/slice/member.slice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.member);
  const { name, role } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [confirmBox, setConfirmBox] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all"); // 👈 NEW

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  /* 🔍 SEARCH FILTER */
  const searchedMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.memberId?.toLowerCase().includes(search.toLowerCase()),
  );

  /* 🎯 ROLE FILTER */
  const filteredMembers = searchedMembers.filter((m) => {
    if (roleFilter === "member") return !m.isHead;
    if (roleFilter === "subadmin") return m.isHead;
    return true; // all
  });

  /* 🔼 SORT */
  const sortedMembers = [...filteredMembers].sort((a, b) =>
    a.memberId.localeCompare(b.memberId),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {name && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Welcome {name}</h3>
          <p className="text-gray-500">
            View and manage all registered members
          </p>
        </div>
      )}

      {/* SEARCH + FILTER */}
      <div className="mb-6 flex items-center justify-between gap-4 w-full">
        {/* SEARCH INPUT WITH CLEAR ICON */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by Name, Phone or Member ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none bg-gray-50"
          />

          {/* CLEAR (X) ICON */}
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* ROLE FILTER DROPDOWN (RIGHT SIDE) */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
        >
          <option value="all">All Members</option>
          <option value="member">Members</option>
          <option value="subadmin">Sub-Admins</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 text-left">Member ID</th>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Region</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Head Request</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : sortedMembers.length ? (
              sortedMembers.map((m) => (
                <tr key={m._id} className="border-b hover:bg-orange-50">
                  <td className="p-3 font-semibold">{m.memberId}</td>
                  <td className="p-3">
                    <img
                      src={m.photoUrl}
                      alt={m.name}
                      className="w-20 h-25  object-fit"
                    />
                  </td>
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.phone}</td>
                  <td className="p-3">{m.email || "-"}</td>
                  <td className="p-3">{m.city}</td>
                  <td className="p-3">{m.region}</td>
                  <td className="p-3 capitalize">{m.gender}</td>

                  {/* ROLE */}
                  <td className="p-3 font-semibold">
                    {m.isHead ? (
                      <span className="text-green-600">Sub-Admin</span>
                    ) : (
                      <span className="text-gray-600">Member</span>
                    )}
                  </td>

                  {/* HEAD REQUEST */}
                  <td className="p-3">
                    {m.interestedInHead ? (
                      <span className="text-orange-600 font-semibold">
                        Requested
                      </span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>

                  <td className="p-3 capitalize">{m.status}</td>

                  {/* ACTIONS */}
                  <td className="p-3 space-x-2">
                    {/* DELETE */}
                    <button
                      onClick={() =>
                        setConfirmBox({
                          title: "Delete Member",
                          message: `Delete ${m.name}?`,
                          onConfirm: async () => {
                            try {
                              await dispatch(deleteMember(m._id)).unwrap();
                              toast.success("Member deleted");
                            } catch (err) {
                              toast.error(err);
                            }
                            setConfirmBox(null);
                          },
                        })
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>

                    {/* MAKE SUB ADMIN */}
                    {m.interestedInHead &&
                      !m.isHead &&
                      m.headStatus === "pending" &&
                      m.status === "active" && (
                        <button
                          onClick={() =>
                            setConfirmBox({
                              title: "Confirm Promotion",
                              message: `Make ${m.name} a Sub-Admin?`,
                              onConfirm: async () => {
                                try {
                                  await dispatch(makeSubAdmin(m._id)).unwrap();
                                  toast.success("Member promoted");
                                  dispatch(fetchMembers());
                                } catch (err) {
                                  toast.error(err);
                                }
                                setConfirmBox(null);
                              },
                            })
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Make Sub-Admin
                        </button>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="p-6 text-center text-gray-500">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CONFIRM MODAL */}
      {confirmBox && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="font-semibold text-lg mb-2">{confirmBox.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{confirmBox.message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmBox(null)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmBox.onConfirm}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
