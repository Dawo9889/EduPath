import { useState, useMemo } from "react";
import User from "../../types/User";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

type SortKey = keyof User;
type SortOrder = "asc" | "desc";

function UserTable({ users, onEdit, onDelete }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("firstname");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);


  // Sort users
  const sortedUsers = useMemo(() => {
    const sorted = [...users].sort((a, b) => {
      const valA = a[sortKey]?.toString().toLowerCase() ?? "";
      const valB = b[sortKey]?.toString().toLowerCase() ?? "";
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [users, sortKey, sortOrder]);

  const totalPages = Math.ceil(users.length / rowsPerPage);

const paginatedUsers = useMemo(() => {
  const start = (currentPage - 1) * rowsPerPage;
  return rowsPerPage >= users.length
    ? sortedUsers
    : sortedUsers.slice(start, start + rowsPerPage);
}, [sortedUsers, currentPage, rowsPerPage]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="mt-6 text-primary">
      <div className="flex justify-between items-center mb-2">
        <div className="mb-4">
          <label className="mr-2 font-medium">Show</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setRowsPerPage(value);
              setCurrentPage(1); // reset to page 1 when changing rows
            }}
            className="p-2 rounded border border-gray-300 cursor-pointer bg-primary text-primary"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={users.length}>All</option>
          </select>
        </div>
        <div className="text-sm">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <table className="w-full rounded-xl shadow-md overflow-hidden text-primary">
        <thead>
          <tr className="bg-tertiary text-left">
            {["firstname", "lastname", "email", "role"].map((key) => (
              <th
                key={key}
                className="p-2 cursor-pointer select-none"
                onClick={() => handleSort(key as SortKey)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                {sortKey === key && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
            ))}
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className="border-t bg-secondary">
              <td className="p-2">{user.firstname}</td>
              <td className="p-2">{user.lastname}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800 hover:underline"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Showing {Math.min((currentPage - 1) * rowsPerPage + 1, users.length)}–{Math.min(currentPage * rowsPerPage, users.length)} of {users.length}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserTable;
