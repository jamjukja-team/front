import RQHydrate from "@/components/Data/RQHydrate";
import { getAttendances } from "@/services/attendanceService";
import AttendanceView from "@/views/attendance/Attendance.view";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export default async function AttendancePage() {
  // const response = await getAttendances();
  // const attendances = response?.attendances || [];
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const qc = new QueryClient();

  // 서버에서 미리 데이터 가져오기
  await qc.prefetchQuery({
    queryKey: ["attendance", currentMonth],
    queryFn: () => getAttendances(currentMonth),
  });

  // 서버에서 prefetch한 데이터는 클래스 인스턴스이기 때문에 직렬화 불가능. 
  // 그래서 dehydrate를 사용하여 직렬화 가능한 순수 JavaScript 객체 반환.
  // 즉, 캐시를 JSON처럼 만들어서 전달할 수 있게 만든다.
  const dehydratedState = dehydrate(qc);

  return (
    // useQuery가 사용할 수 있는 클라이언트 캐시로 복원. (View 컴포넌트에서 사용할 수 있도록 함).
    <RQHydrate state={dehydratedState}>
      {/* <AttendanceView initialAttendances={attendances} /> */}
      <AttendanceView />
    </RQHydrate>
  );
}