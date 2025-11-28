import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from "../../features/auth/hooks/useAuth";
import { config } from "../../config/config";

type NavbarProps = {
  onSidebarToggle?: () => void;
  isProtectedRoute?: boolean;
};

export default function Navbar({ onSidebarToggle, isProtectedRoute = false }: NavbarProps) {
  const navigate = useNavigate();
  const { data: me, isLoading } = useAuthUser();


  const handleJiraLogin = () => {
    const apiBase = config.API_BASE.replace(/\/$/, "");
    window.location.href = `${apiBase}/api/atlassian/OAuth/authorize`;
  };

  return (
    <header className="border-b">
      <nav className="w-full flex items-center  min-h-[72px] px-4 sm:px-6 md:px-10">
        <div className="flex items-center gap-3">
          <div
            className="cursor-pointer font-bold text-2xl md:text-3xl"
            onClick={() => navigate("/")}
          >
            Taskline
          </div>


          {/* ✅ Mobilde sadece hamburger kalsın */}
          {onSidebarToggle && (
            <button
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-gray-100"
              aria-label="Sidebar'ı aç/kapat"
              onClick={onSidebarToggle}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          )}
        </div>

        {isProtectedRoute && (
          <div className="flex-1 flex justify-center px-3">
            <div className="w-full max-w-xl">
              Search
            </div>
          </div>
        )}



        <div className="hidden md:flex items-center gap-3 ml-auto">
          {isLoading ? (
            <div className="w-24 h-6 bg-gray-300 animate-pulse rounded" />
          ) : me ? (
            <></>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="hover:underline">
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Sign Up
              </button>
              <button
                onClick={handleJiraLogin}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Login With Jira
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
