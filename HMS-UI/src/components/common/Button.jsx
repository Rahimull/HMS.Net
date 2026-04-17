const Button = ({text, onClick, color="blue"}) =>{
    return(
        <button 
            onClick={onClick}
            className={`px-4 py-2 rounded text-white m-2 ${
                color === "green" ? "bg-green-600" : "bg-blue-600"}`}
        >
            {text}
        </button>
    );
    
}
export default Button;