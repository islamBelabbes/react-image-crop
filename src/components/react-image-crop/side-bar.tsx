import React from "react";

function SideBar({ children }: { children: React.ReactNode }) {
  return <aside className="w-full p-4 border-r xl:w-80">{children}</aside>;
}

export default SideBar;
