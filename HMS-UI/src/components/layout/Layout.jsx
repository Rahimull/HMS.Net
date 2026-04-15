import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;