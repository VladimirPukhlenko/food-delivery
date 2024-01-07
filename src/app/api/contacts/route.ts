import { Inputs } from "@/components/Form";
import FeedBack from "@/libs/mongoose/schemas/feedBackSchema";
import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data: Inputs = await request.json();

    await mongooseConnect();
    const newFeedBack = new FeedBack(data);
    const feedBack = await newFeedBack.save();
    return new NextResponse(JSON.stringify(feedBack), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
