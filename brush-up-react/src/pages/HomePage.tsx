import { useState } from "react";
import FormElement from "../components/formElement/FormElement"
import TableData from "../components/tables/TableData"

interface Employee {
  employeeId: string;
  employeeName: string;
  salary: string;
}

interface SearchParams {
  searchTerm: string;
}

const HomePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({ searchTerm: "" });

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchParams({ searchTerm })
  };

  const deleteEmployee = (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.employeeId !== id));
  };

  console.log(searchParams);
  console.log(employees);
  

  return (
    <div className='text-black shadow-gray-50 text-4xl text-left'>
        <h2 className=' text-center py-5'>Crud App</h2>
        <div className=' flex justify-center gap-10'>
        <div>
            <FormElement onAddEmployee={handleAddEmployee} />
        </div>
        <div>
          <div>
            <input 
              type="text" 
              placeholder="Search by Name"
              className='border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5'
              onChange={handleSearchChange}
            />
          </div>
            <TableData 
              employee={employees}
              onDeleteEmployee={deleteEmployee}
            />
        </div>
        </div>
    </div>
  )
}

export default HomePage
