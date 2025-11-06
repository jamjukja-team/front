"use client";

import HomeView from "@/views/home/Home.view";

export default function Home() {
  const handleCheckIn = async () => {
    // 출근 API 호출
    console.log("Check-in");
  };

  const handleCheckOut = async () => {
    // 퇴근 API 호출
    console.log("Check-out");
  };

  return (
    <HomeView
      onCheckIn={handleCheckIn}
      onCheckOut={handleCheckOut}
    />
  );
}
