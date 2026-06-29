import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function Navbar({ variant = "default" }) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isLanding = variant === "landing";

  return (
    <nav
      className={`${
        isLanding
          ? "absolute inset-x-0 top-0 z-10 bg-transparent"
          : "border-b border-parchment bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="font-serif text-xl font-bold text-ink">
            Shelf<span className="text-leather">Share</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hidden text-sm font-medium text-ink-light hover:text-leather sm:block"
              >
                Dashboard
              </Link>
              <Link
                to="/add-book"
                className="hidden text-sm font-medium text-ink-light hover:text-leather sm:block"
              >
                Add Book
              </Link>
              <span className="hidden text-sm text-ink-light md:block">
                Hi, {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
