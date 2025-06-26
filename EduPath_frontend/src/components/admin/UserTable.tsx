import { useState, useMemo, use } from "react";
import User from "../../types/User";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  isImport?: boolean
}

type SortKey = keyof User;
type SortOrder = "asc" | "desc";

function UserTable({ users, onEdit, onDelete, isImport }: Props) {
  const { userId } = useAuth(); 

  const [sortKey, setSortKey] = useState<SortKey>("firstname");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
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
      <div className="flex justify-between items-center">
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

      <table className="w-full min-w-[800px] rounded-xl shadow-md overflow-hidden text-primary">
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
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.email} className="border-t bg-secondary">
              <td className="p-2 w-[15%]">{user.firstname}</td>
              <td className="p-2 w-[20%]">{user.lastname}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 w-[15%]">{user.role}</td>
              <td className="p-2 w-[18%]">
                <button
                  className="btn-primary text-white w-[47%] px-2 py-1 rounded mr-[6%]"
                  onClick={() => {  
                    onEdit(user)
                    console.log("Editing user:", user)  
                  }}
                  disabled={user.id === userId}
                >
                  {isImport ? "Import" : "Edit"}
                </button>
                <button
                  className="btn-danger text-white w-[47%] px-2 py-1 rounded"
                  onClick={() => onDelete(user.id)}
                  disabled={user.id == userId}
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
          className="px-3 py-1 rounded bg-tertiary hover:bg-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span>
          Showing {Math.min((currentPage - 1) * rowsPerPage + 1, users.length)}–{Math.min(currentPage * rowsPerPage, users.length)} of {users.length}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 rounded bg-tertiary hover:bg-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserTable;
