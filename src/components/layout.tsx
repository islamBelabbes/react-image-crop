import React from "react";
import Header from "./header";
import Footer from "./footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
