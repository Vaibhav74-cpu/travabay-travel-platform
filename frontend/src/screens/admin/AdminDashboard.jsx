import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/redux/slices/adminApiSlice";
import { logout } from "@/redux/slices/authSlice";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutApi] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success("Logout sucessfully");
      navigate("/admin/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.message || error?.message || "Failed to logout");
    }
  };
  return (
    <header className="w-full bg-gradient-to-r from-[#031d3f] via-[#0a2a5c] to-[#031d3f] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <h1 className="text-white font-bold text-xl tracking-wide">
          <Link to="/admin/packages">Admin Panel</Link>
        </h1>

        <nav className="hidden md:flex items-center gap-10 text-white font-medium">
          <Link
            to="/admin/packages"
            className="relative hover:text-yellow-400 transition duration-300"
          >
            PACKAGES
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/admin/bookings"
            className="hover:text-yellow-400 transition duration-300"
          >
            BOOKINGS
          </Link>

          <Link
            to="/admin/enquiries"
            className="hover:text-yellow-400 transition duration-300"
          >
            ENQUIRIES
          </Link>

          <div className="hidden md:block">
            <Button
              onClick={logoutHandler}
              className="bg-red-500 hover:bg-red-600 transition duration-300 text-white px-5 py-2 rounded-full shadow-md"
            >
              LOGOUT
            </Button>
          </div>

          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-2xl"
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>

          {menuOpen && (
            <div className="md:hidden bg-[#0a2a5c] text-white flex flex-col items-center gap-6 py-6 shadow-lg">
              <Link
                to="/admin/packages"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                PACKAGES
              </Link>

              <Link
                to="/admin/bookings"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                BOOKINGS
              </Link>

              <Link
                to="/admin/enquiries"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400"
              >
                ENQUIRIES
              </Link>

              <Button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
              >
                Logout
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AdminDashboard;
