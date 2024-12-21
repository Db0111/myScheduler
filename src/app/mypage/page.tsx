"use client";

import {
  Calendar,
  Card,
  CardBody,
  CardHeader,
  DateRangePicker,
  Input,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function MyPage() {
  const { data: session, status } = useSession();
  return (
    <div>
      <div>Mypage</div>
      <Card>
        <CardHeader>
          <div>
            <p>{session?.user?.userId}님</p>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <h1>공부 기간을 선택하세요</h1>
            <DateRangePicker />
          </div>
          <h1>요일 별로 하루에 공부할 수 있는 순수 시간을 선택하세요</h1>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center space-x-2">
              <h4>Mon</h4>
              <Input fullWidth={false} />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <h4>Tue</h4>
              <Input fullWidth={false} />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <h4>Wed</h4>
              <Input fullWidth={false} />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <h4>Thu</h4>
              <Input fullWidth={false} />
            </div>
            <div className="flex flex-row items-center  space-x-2">
              <h4>Fri</h4>
              <Input fullWidth={false} />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <h4>Sat</h4>
              <Input fullWidth={false} />
            </div>
            <div className="flex flex-row items-center  space-x-2">
              <h4>Sun</h4>
              <Input fullWidth={false} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
