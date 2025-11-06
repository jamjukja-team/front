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
  // 서버 사이드에서 데이터 가져오기
  let employee = null;
  try {
    const response = await getEmployees();
    employee = response.employees.find((emp) => {
      // 여러 방식으로 비교 시도
      const empIdStr = emp.emp_id?.toString();
      const paramId = params.id;
      return empIdStr === paramId || emp.emp_id === Number(paramId);
    });
  } catch (error) {
    console.error("Failed to fetch employee:", error);
  }

  return <EmployeeDetailView employee={employee || undefined} />;
}
