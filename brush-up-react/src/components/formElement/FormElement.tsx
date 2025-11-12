import { useState } from "react";
import Input from "./Input";
import SubmitBtn from "./SubmitBtn";

interface FormData {
    employeeId: string,
    employeeName: string,
    salary: string 
}

interface FormElementProps {
    onAddEmployee: (data: FormData) => void;
}

const FormElement = ({onAddEmployee}: FormElementProps) => {
    const [formData, setFormData] = useState<FormData>({
        employeeId: "",
        employeeName: '',
        salary: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevFormData)=>({
            ...prevFormData, 
            [name]: value
        }))
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onAddEmployee(formData)
        // Here you can add logic to handle the form submission, like sending data to an API
        setFormData({
            employeeId: "",
            employeeName: '',
            salary: ''
        }); 
    }

    return ( 
        <form onSubmit={handleSubmit} className="flex flex-col flex-wrap w-full gap-5 mt-5 text-xl border p-5 rounded-xl">
            <Input
                placeholder="Employee ID"
                type="text"
                name="employeeId"
                value={formData.employeeId}            
                onChange={handleChange}
                className="mb-2 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
                placeholder="Employee Name"
                type="text"
                name="employeeName"
                value={formData.employeeName}            
                onChange={handleChange}
                className="mb-2 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
                placeholder="Salary"
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="mb-2 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SubmitBtn 
                text="Submit"
                onClick={()=> {}}
            />
        </form>
     );
}
 
export default FormElement;