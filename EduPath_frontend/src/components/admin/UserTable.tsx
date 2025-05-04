import User from "../../types/User";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <table className="w-full mt-6 rounded-xl shadow-md overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">First Name</th>
          <th className="p-2">Last Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-t">
            <td className="p-2">{user.firstname}</td>
            <td className="p-2">{user.lastname}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
            <td className="p-2 space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                onClick={() => onEdit(user)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
