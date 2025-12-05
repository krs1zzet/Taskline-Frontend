import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from "../../features/auth/hooks/useAuth";
import { config } from "../../config/config";
import SearchBar from "./SearchBar";

type NavbarProps = {
  onSidebarToggle?: () => void;
  isProtectedRoute?: boolean;
};

export default function Navbar({ onSidebarToggle, isProtectedRoute = false }: NavbarProps) {
  const navigate = useNavigate();
  const { data: me, isLoading } = useAuthUser();
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut.mutate(undefined, { onSuccess: () => navigate("/", { replace: true }) });
  };

  const handleJiraLogin = () => {
    const apiBase = config.API_BASE.replace(/\/$/, "");
    window.location.href = `${apiBase}/api/atlassian/OAuth/authorize`;
  };

  return (
    <header className="backdrop-blur-lg bg-white/70 shadow-sm border-b sticky top-0 z-50">
      <nav className="w-full flex justify-between items-center min-h-[72px] px-4 sm:px-6 md:px-10">

        {/* Logo */}
        <div
          className="cursor-pointer font-extrabold text-2xl md:text-3xl text-blue-700 hover:text-blue-900 transition select-none"
          onClick={() => navigate("/main-page")}
        >
          Taskline
        </div>

        {/* Search bar (protected routes only) */}
        {isProtectedRoute && (
          <div className="hidden md:flex flex-1 justify-center px-6">
            <SearchBar />
          </div>
        )}

        {/* Mobile menu icon */}
        {onSidebarToggle && (
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-gray-200 transition"
            aria-label="Sidebar toggle"
            onClick={onSidebarToggle}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center gap-3 ml-4">

          {!me ? (
            isLoading ? (
              <div className="w-24 h-6 bg-gray-300 animate-pulse rounded" />
            ) : (
              <>

                
                {/* <button
                  onClick={() => navigate("/login")}
                  className="text-gray-700 hover:text-gray-900 hover:underline transition"
                >
                  Login
                </button>

               
                <button
                  onClick={() => navigate("/register")}
                  className="
                    px-4 py-2 rounded-lg font-medium
                    bg-blue-600 text-white shadow
                    hover:bg-blue-700 hover:shadow-lg
                    transition-all duration-200
                    transform hover:-translate-y-[1px]
                  "
                >
                  Sign Up
                </button>
                 */}

                {/* Jira Login */}
                <button
                  onClick={handleJiraLogin}
                  className="
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                    bg-[#c500cc] text-white shadow
                    hover:bg-[#0747A6] hover:shadow-lg
                    transition-all duration-200
                    transform hover:-translate-y-[1px]
                  "
                >
                  Login With Jira
                </button>
              </>
            )
          ) : (
            <button
              onClick={handleSignOut}
              className="
                px-4 py-2 rounded-lg font-medium
                bg-red-600 text-white shadow
                hover:bg-red-700 hover:shadow-lg
                transition-all duration-200
                transform hover:-translate-y-[1px]
              "
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
