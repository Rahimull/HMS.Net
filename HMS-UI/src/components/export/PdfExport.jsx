import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PdfEport(columns, rows, fileName="report"){
    const doc = new jsPDF();

    autoTable(doc, {
        head: [columns],
        body: rows,
    });
    doc.save(`${fileName}.pdf`);
}