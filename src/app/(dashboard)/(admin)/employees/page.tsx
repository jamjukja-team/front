import EmployeesView from "@/views/employees/Employees.view";
import { getEmployees } from "@/services/employeeService";

export default async function EmployeesPage() {
  // 서버 사이드에서 데이터 가져오기
  const response = await getEmployees();
  const employees = response?.employees || [];

  return <EmployeesView initialEmployees={employees} />;
}


