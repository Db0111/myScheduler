import { create } from "zustand";

interface ScheduleState {
  studyPeriod: { startDate: string | null; endDate: string | null };
  setStudyPeriod: (startDate: string, endTime: string) => void;
  availableHours: Record<string, number>; // 각 요일에 대해 숫자를 저장
  setAvailableHours: (day: string, value: number) => void; // 업데이트 함수
  studyAmount: Record<string, number>;
  setStudyAmount: (subject: string, pages: number) => void;
}

const useScheduleStore = create<ScheduleState>((set) => ({
  studyPeriod: { startDate: null, endDate: null },
  setStudyPeriod: (key, value) =>
    set((state) => ({
      studyPeriod: { ...state.studyPeriod, [key]: value },
    })),

  availableHours: {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  },
  setAvailableHours: (day: string, value: number) =>
    set((state) => ({
      availableHours: { ...state.availableHours, [day]: value },
    })),

  studyAmount: {},

  setStudyAmount: (subject: string, pages: number) =>
    set((state) => ({
      studyAmount: { ...state.studyAmount, [subject]: pages },
    })),
}));

export default useScheduleStore;
