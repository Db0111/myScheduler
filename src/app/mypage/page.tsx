"use client";

import {
  Card,
  CardBody,
  CardHeader,
  DateRangePicker,
  Input,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import useScheduleStore from "@/store/scheduleStore";
import { useState } from "react";

export default function MyPage() {
  const { data: session } = useSession();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const {
    studyPeriod,
    setStudyPeriod,
    availableHours,
    setAvailableHours,
    studyAmount,
    setStudyAmount,
  } = useScheduleStore();

  // gpt 에 플래너 요청
  const generatePlanner = async () => {
    try {
      const response = await fetch("/api/generatePlanner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studyPeriod,
          availableHours,
          studyAmount,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Generated Planner:", data.planner);
        alert(data.planner);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const [subject, setSubject] = useState("");
  const [pages, setPages] = useState<number | "">("");

  const handleStartDate = (startDate) => {
    useScheduleStore.getState().setStudyPeriod("startDate", startDate);
  };

  const handleEndDate = (endDate) => {
    useScheduleStore.getState().setStudyPeriod("endDate", endDate);
  };

  const handleInputChange = (day: string, value: number) => {
    setAvailableHours(day, value);
  };
  const handleStudyAmount = () => {
    setStudyAmount(subject, Number(pages));
    setSubject("");
    setPages("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="bg-blue-500 text-white p-6 rounded-t-md">
          <h1 className="text-xl font-bold">Study Planner </h1>
          <p className="text-sm mt-2">{session?.user?.userId}님 환영합니다!</p>
        </CardHeader>
        <CardBody className="p-6 space-y-6">
          {/* Study Period Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              공부 기간 선택
            </h2>
            <div className="flex flex-row gap-2">
              <div>
                <div>시작 기간</div>
                <Input
                  onChange={(e) => handleStartDate(e.target.value)}
                  value={studyPeriod.startDate || ""}
                  placeholder="예) 1월 1일"
                  className="mt-2 bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div>-</div>
              <div>
                <div>종료 기간</div>
                <Input
                  onChange={(e) => handleEndDate(e.target.value)}
                  value={studyPeriod.endDate || ""}
                  placeholder="예) 1월 8일"
                  className="mt-2 bg-gray-100 p-2 rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              요일 별 공부 가능 시간
            </h2>
            <p className="text-sm text-gray-500">
              30분 단위는 0.5로 입력해주세요
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {days.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between bg-white-100 p-2 border-1 rounded-md"
                >
                  <span className="font-medium text-gray-600">{day}</span>
                  <Input
                    fullWidth={false}
                    value={availableHours[day]}
                    onChange={(e) =>
                      handleInputChange(day, Number(e.target.value))
                    }
                    className="w-20"
                    placeholder="0"
                  />
                  <span className="text-gray-600 ml-2">시간</span>
                </div>
              ))}
            </div>
          </div>

          {/* Study Amount Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              공부해야 할 분량
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-4 items-center justify-center">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">과목명</label>
                <Input
                  fullWidth={false}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="예: 수학"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">
                  공부 분량 (페이지)
                </label>
                <Input
                  fullWidth={false}
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="예: 50"
                />
              </div>
              <div className="flex justify-end items-end">
                <Button
                  onPress={handleStudyAmount}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Add Study Amount
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onPress={generatePlanner}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Generate Planner
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
