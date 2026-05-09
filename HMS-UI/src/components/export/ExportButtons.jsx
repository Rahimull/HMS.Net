import { PrintData} from "./PrintExport";
import PdfEport from "./PdfExport";
import ExcelExport from "./ExcelExport";
import Button from "../common/Button";


export default function ExportButtons({
    data = [],
    pdfColumns=[],
    pdfRows = [],
    fileName = "report",
}){
    return(
        <div className="flex gap-2">
            <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={()=>{ ExcelExport(data, fileName) }}
            >
                Export to Excel
            </Button>
            <Button 
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={()=>{  PdfEport(pdfColumns, pdfRows, fileName) }}
            >
                PDF
            </Button>
            <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={PrintData}
            >
                Print
            </Button>

        </div>
    );
}