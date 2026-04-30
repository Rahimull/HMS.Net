const InvoiceHeader = ({title = "Pharmacy"}) =>{
    <div className="bg-slate-900 text-white px-6 py-4">
        <h2 className="text-lg font-semibold">{title} Invoice</h2>
        <p className="text-xs text-gray-400"> Hospital ERP System</p>
    </div>
}

export default InvoiceHeader;