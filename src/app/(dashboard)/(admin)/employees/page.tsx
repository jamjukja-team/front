import EmployeesView from "@/views/employees/Employees.view";
import { getEmployees } from "@/services/employeeService";

export default async function EmployeesPage() {
  // 서버 사이드에서 데이터 가져오기
  let employees = [];
  try {
    const response = await getEmployees();
    employees = response.employees || [];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
  }

  return <EmployeesView initialEmployees={employees} />;
}

