import { Inputs } from "@/components/Form";
import FeedBack from "@/libs/mongoose/feedBackSchema";
import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import { NextResponse } from "next/server";

/**
 * Обрабатывает POST-запрос для добавления новой обратной связи.
 *
 * @param {Request} request - Запрос на добавление обратной связи.
 * @returns {NextResponse} - Ответ с информацией о результате добавления.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const feedBack: Inputs = await request.json();
    await mongooseConnect();
    const newFeedBack = new FeedBack(feedBack);
    await newFeedBack.save();
    // Возвращаем успешный ответ
    return new NextResponse(JSON.stringify({ message: "success" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    // В случае ошибки возвращаем сообщение об ошибке
    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while trying to add the message",
      })
    );
  }
}
