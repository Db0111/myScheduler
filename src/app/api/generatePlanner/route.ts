import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 환경변수로 API 키 저장
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { studyPeriod, availableHours, studyAmount } = body;
    console.log("studyPeriod", studyPeriod);
    console.log("availableHours", availableHours);
    console.log("studyAmount", studyAmount);

    // 요청 유효성 검사
    if (!studyPeriod || !availableHours || !studyAmount) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const prompt = `
        You are an AI that helps people create personalized planners.
        
        Here are the details provided by the user:
        - Total Study period: from ${studyPeriod.startDate} to ${
      studyPeriod.endDate
    }
        - Available hours: ${JSON.stringify(availableHours, null, 2)}
        - Study amount: ${JSON.stringify(studyAmount, null, 2)}
        
        Using this information, please create a weekly planner. 
        For the total study period, appropriately divide the amount of study according to the available time of the day. 
        The amount of study will be given by the number of pages per subject, and plan to study at least two subjects a day. 
        (If there is one subject, you can divide it into one subject a day.) 
        If the available time is 0, you cannot study, so give it a value with the string 'pass' on that day.
        
        The study period is the year, month, and day based on the date the user enters now, and when you plan the planner based on the start date, please:
        1. Treat the start and end dates according to the current year.
        2. Convert the start date (e.g., "1월 2일") to the correct date of the current year, considering the current month and year.
        3. Determine the actual day of the week based on the start date (e.g., "Mon", "Tue", etc.).
        4. Plan the study schedule in the format of: 
            'Date (Day): {subject: pages, subject: pages, ...}'
        5. Ensure the total pages planned across the period equal ${JSON.stringify(
          studyAmount,
          null,
          2
        )} exactly. (Do not exceed or be short.)
        
        Respond in a clear, concise format with each day and its respective tasks. And don't give me any descriptions, only give me planner.
        `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
    });

    const planner = completion.choices[0]?.message?.content;

    return NextResponse.json({ planner });
  } catch (error) {
    console.error("Error in generatePlanner API:", error);

    return NextResponse.json(
      { error: "Failed to generate planner" },
      { status: 500 }
    );
  }
}
