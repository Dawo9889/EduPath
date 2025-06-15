import { useEffect, useState } from 'react';
import UserTable from '../../../components/admin/UserTable';
import UserForm from '../../../components/admin/UserForm';
import CSVImport from '../../../components/admin/CSVImport';
import ConfirmUserDelete from '../../../components/admin/ConfirmUserDelete';
import User from '../../../types/User';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { createUser, deleteUser, editUser, fetchUsers } from '../../../api/api';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



function ManageUsers() {
  const { isAuthenticated, userRole, authReady } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [importedUsers, setImportedUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);


  const [showCSVModal, setShowCSVModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showImportTable, setShowImportTable] = useState(false);

  // Fetch users on load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedUsers = await fetchUsers();
        console.log('Fetched users:', fetchedUsers);
        const normalizedUsers: User[] = fetchedUsers.map((u: any) => ({
        id: u.userId,
        firstname: u.firstName,
        lastname: u.lastName,
        email: u.email,
        role: u.role,
      }));
        setUsers(normalizedUsers);
      }
      catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

useEffect(() => {
  if (!authReady) return; // Don't check before ready

  if (!isAuthenticated || userRole !== 'admin') {
    navigate('/unauthorized');
  }
}, [authReady, isAuthenticated, userRole, navigate]);

  const [isLoading, setIsLoading] = useState(true);

const handleUserSave = async (newUser: User) => {
  setIsSaving(true);

  try {
    let response;

    if (newUser.id) {
      response = await editUser(newUser);
    } else {
      response = await createUser(newUser);
    }

    window.alert(response); // <-- This happens before clearing the form
    setEditingUser(null);   // Close the form after alert
    window.location.reload();
  } catch (error) {
    console.error('Failed to save user:', error);
    window.alert('Failed to save user. Please try again.');
  } finally {
    setIsSaving(false);
  }
};


  const handleUserDelete = async (id: string) => {
    try {
      const response = await deleteUser(id);
      window.alert(response);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleCSVImport = (importedUsers: User[]) => {
    setImportedUsers(importedUsers)
    setShowImportTable(true);
  };

  const handleImportOneUser = async (newUser: User) => {
  try {
    const response = await createUser(newUser);

    setImportedUsers(prev => prev.filter(user => user.id !== newUser.id));
    setUsers(prev => [...prev, newUser]);

    window.alert('User imported successfully!');
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('already')) {
      window.alert(`Failed to import user:\nUser with email ${newUser.email} already exists.`);
    } else {
      window.alert(`Failed to import user:\n${error.message || 'Unknown error'}`);
    }
  }
};

  const handleImportAllUsers = async () => {
  const failedUsers: User[] = [];
  const successfulUsers: User[] = [];

  for (const user of importedUsers) {
    try {
      await createUser(user);
      successfulUsers.push(user);
    } catch (error) {
      console.error(`Failed to import ${user.email}:`, error);
      failedUsers.push(user);
    }
  }

  // Update state
  setImportedUsers(failedUsers);

  // Close the table if all succeeded
  if (failedUsers.length === 0) {
    setShowImportTable(false);
  }

  // Show a single summary alert
  let summaryMessage = `Import Summary:\n`;
  summaryMessage += `✔️ ${successfulUsers.length} user(s) imported successfully.\n`;

  if (failedUsers.length > 0) {
    summaryMessage += `❌ ${failedUsers.length} user(s) failed to import:\n`;
    summaryMessage += failedUsers.map(u => `- ${u.email}`).join('\n');
  }

  window.alert(summaryMessage);
};

if (!authReady) {
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="loader"></div>

      <style>{`
        .loader {
          border: 6px solid #f3f3f3; /* Light gray */
          border-top: 6px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage Users</h1>
      <button
        onClick={() =>
          setEditingUser({ id: '', firstname: '', lastname: '', email: '', role: 'student' }) // adjust fields to match User type
        }
        className="mb-4 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)] cursor-pointer"
        >
        Add User
      </button>
      <button
          onClick={() => setShowCSVModal(true)}
          className="mb-4 ml-2 px-4 py-2 rounded font-medium text-[var(--text-100)] bg-[var(--bg-200)] hover:bg-[var(--bg-300)] cursor-pointer"
        >
          Bulk Import
      </button>

      {isLoading && <p className="text-gray-500">Loading users...</p> }
      
      {/* Show users or empty state */}
      {
        !isLoading && (
          <>
            {users.length === 0 ? (
              <p className="text-gray-500">No users found. Please add a user.</p>
            ) : (
              <UserTable
                users={users}
                onEdit={setEditingUser}
                onDelete={(id: string) => {
                  setUserToDelete(users.find(u => u.id === id) || null)
                  setConfirmDelete(true);
                }}
              />
            )}
          </>
        )
      }
      
      {/* Animated Popup */}  
      <AnimatePresence>
        {editingUser && (
          <>
          <motion.div
          className="fixed inset-0 bg-black z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-70"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="bg-primary rounded-xl shadow-lg mt-20 w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
                          
              <UserForm user={editingUser} onSave={handleUserSave} onClose={() => setEditingUser(null)} isSaving={isSaving} />
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCSVModal && (
          <>
          <motion.div
          className="fixed inset-0 bg-black z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {}}
          />
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-70"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {}}
          >
            <div
              className="bg-secondary rounded-xl shadow-lg mt-20 p-6 w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
                    <IoCloseOutline
                              className="text-4xl absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-500"
                              onClick={() => setShowCSVModal(false)}
                            />
                    <div className="flex flex-col gap-4"></div>
              <CSVImport onImport={(users) => {
                handleCSVImport(users);
                setShowCSVModal(false);
              }} />
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showImportTable && (
          <>
          <motion.div
          className="fixed inset-0 bg-black z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {}}
          />
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-70"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {}}
          >
            <div
              className="bg-secondary rounded-xl shadow-lg mt-20 min-w-[650px] w-[1000px] p-5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <IoCloseOutline
                className="text-4xl absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-500"
                onClick={() => {setShowImportTable(false); setImportedUsers([]);}}
              />
              <h2 className="text-2xl font-bold mb-4 text-primary">Users to import</h2>
              <button className='bg-green-500 p-2 rounded-xl text-white mb-4 absolute top-5 right-25 hover:bg-green-600 hover:cursor-pointer' onClick={handleImportAllUsers} >Import all</button>

              {/* Add this scrollable wrapper */}
              <div className="max-h-[650px] overflow-y-auto pr-2">
                <UserTable
                  users={importedUsers}
                  onEdit={handleImportOneUser}
                  onDelete={(p) => {setImportedUsers(importedUsers.filter(u => u.id !== p))}}
                  isImport={true}
                />
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <>
          <motion.div
          className="fixed inset-0 bg-black z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {}}
          />
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-70"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {}}
          >
            <div
              className="bg-secondary rounded-xl shadow-lg mt-20 w-full max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ConfirmUserDelete
                onDelete={() => {
                  handleUserDelete(userToDelete?.id || '');
                  setConfirmDelete(false);
                }}
                user={userToDelete || { id: '', firstname: '', lastname: '', email: '', role: 'student' }}
                onClose={() => {setConfirmDelete(false); setUserToDelete(null)}} />
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </div>
  );
}

export default ManageUsers;
