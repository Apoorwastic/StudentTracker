import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UsersIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Students", path: "/students", icon: UsersIcon },
    { name: "Check-ins", path: "/checkins", icon: ClipboardDocumentListIcon },
  ];

  return (
    <aside className="w-64 bg-primary text-white flex flex-col">
      <div className="text-2xl font-bold p-4 border-b border-red-700">
        Student Portal
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                pathname === item.path
                  ? "bg-red-700 text-white"
                  : "hover:bg-red-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}