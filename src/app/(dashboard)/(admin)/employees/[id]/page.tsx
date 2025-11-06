import EmployeeDetailView from "@/views/employees/EmployeeDetail.view";
import { getEmployees } from "@/services/employeeService";

interface EmployeeDetailPageProps {
  params: {
    id: string;
  };
}

export default async function EmployeeDetailPage({
  params,
}: EmployeeDetailPageProps) {
  let employee = null;
  try {
    const response = await getEmployees();
    const employees = response.employees || [];
    employee = employees.find(
      (emp) => emp.emp_id?.toString() === params.id
    );
  } catch (error) {
    console.error("Failed to fetch employee:", error);
  }

  return <EmployeeDetailView employee={employee} employeeId={params.id} />;
}

