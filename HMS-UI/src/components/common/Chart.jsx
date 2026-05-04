import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";



export default function Chart({data}){
    return(
        <div className="bg-white p-4 rounded-xl shadow">
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data}>
                    <XAxis dataKey="itemName"  hide />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#6366f9" />
                </BarChart>
                 
            </ResponsiveContainer>
        </div>
    );
}