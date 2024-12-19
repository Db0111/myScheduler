import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, password, email, name } = await req.json();

  // 중복 검사
  const existingUser = await prisma.user.findUnique({
    where: { userId },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User ID already exists" },
      { status: 400 }
    );
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  // 사용자 생성
  const user = await prisma.user.create({
    data: {
      userId,
      password: hashedPassword,
      email,
      name,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
