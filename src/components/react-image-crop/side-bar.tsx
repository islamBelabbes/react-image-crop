import React from "react";

function SideBar({ children }: { children: React.ReactNode }) {
  return <aside className="w-full p-4 border-r lg:w-80">{children}</aside>;
}

export default SideBar;
