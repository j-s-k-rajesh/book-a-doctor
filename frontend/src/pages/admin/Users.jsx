import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getUsers,
  deleteUser,
} from "../../api/adminApi";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      toast.success(
        "User deleted"
      );

      fetchUsers();
    } catch (error) {
      console.error(error);

      toast.error(
        "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all users.
        </p>

        <div
          className="
            mt-8

            bg-slate-900
            border border-slate-800

            rounded-3xl

            overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="
                    border-b border-slate-800
                    text-left
                  "
                >
                  <th className="p-4">
                    Name
                  </th>

                  <th className="p-4">
                    Email
                  </th>

                  <th className="p-4">
                    Role
                  </th>

                  <th className="p-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="
                      border-b border-slate-800
                    "
                  >
                    <td className="p-4">
                      {user.name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4 capitalize">
                      {user.role}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleDelete(
                            user._id
                          )
                        }
                        className="
                          px-4 py-2

                          rounded-xl

                          bg-red-500/10
                          text-red-400

                          hover:bg-red-500/20
                        "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Users;