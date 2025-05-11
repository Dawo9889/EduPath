import { useEffect, useState } from 'react';
import UserTable from '../../../components/admin/UserTable';
import UserForm from '../../../components/admin/UserForm';
import CSVImport from '../../../components/admin/CSVImport';
import User from '../../../types/User';
import { AnimatePresence, motion } from 'framer-motion';


function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [showCSVModal, setShowCSVModal] = useState(false);

  // Fetch users on load
  useEffect(() => {
    fetch('/api/users') // replace with your backend URL
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleUserSave = (newUser: User) => {
    if (newUser.id) {
      // Update
      setUsers(prev => prev.map(u => u.id === newUser.id ? newUser : u));
    } else {
      // Create
      setUsers(prev => [...prev, { ...newUser, id: Date.now().toString() }]); // Temp ID, replace with real
    }
    setEditingUser(null); // Close the form after saving
  };

  const handleUserDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleCSVImport = (importedUsers: User[]) => {
    setUsers(prev => [...prev, ...importedUsers]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage Users</h1>
      <button
        onClick={() =>
          setEditingUser({ id: '', firstname: '', lastname: '', email: '', role: 'student' }) // adjust fields to match User type
        }
        className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
        >
        Add User
      </button>
      <button
          onClick={() => setShowCSVModal(true)}
          className="mb-4 ml-2 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)]"
        >
          Bulk add
      </button>


      {users.length === 0 ? (
        <p className="text-gray-500">No users found. Please add a user.</p>
      ):
      <UserTable users={users} onEdit={setEditingUser} onDelete={handleUserDelete} />
      }
      
      {/* Animated Popup */}  
      <AnimatePresence>
        {editingUser && (
          <>
          <motion.div
          className="fixed inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setEditingUser(null)}
          />
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setEditingUser(null)} // Close on overlay click
          >
            <div
              className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
                          
              <UserForm user={editingUser} onSave={handleUserSave} onClose={() => setEditingUser(null)} />
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCSVModal && (
          <>
          <motion.div
          className="fixed inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowCSVModal(false)}
          />
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowCSVModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-lg mt-20 p-6 w-full max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CSVImport onImport={(users) => {
                handleCSVImport(users);
                setShowCSVModal(false);
              }} />
              <button
                onClick={() => setShowCSVModal(false)}
                className="mt-4 text-sm text-gray-500 hover:text-red-600"
              >
                Cancel
              </button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </div>
  );
}

export default ManageUsers;
