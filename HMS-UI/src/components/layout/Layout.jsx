import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

function Layout({ children }) {
    return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">
          {children}
         
        </main>
      </div>
    </div>
  );
}
export default Layout;
