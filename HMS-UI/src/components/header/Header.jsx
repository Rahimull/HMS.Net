


const Header = () =>{
    return (
       <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Dashbord</h1>
        <div className="flex items-center gap-4">
            <span>Admin</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>

        </div>
       </header>
    );
}
export default Header;