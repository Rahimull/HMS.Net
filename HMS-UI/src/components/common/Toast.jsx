

const Toast = ({message, type, onClose}) => {
    if(!message) return null;

    const bgColor = type === "error" ? "bg-red-500" : type === "success" ? "bg-green-500" : "bg-yellow-500";  
    return (
        <div className={`fixed bottom-5 right-5 px-4 py-2 text-white rounded shadow ${bgColor}`}>
            {message}
            <button onClick={onClose} className="ml-4 text-sm opacity-70">X</button>
        </div>
    );  

}

export default Toast;