import { NextResponse } from "next/server";
import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import Category from "@/libs/mongoose/schemas/categorySchema";

// Это API написано на случай, если возникнет необходимость переключиться с генерации статических страниц (Static Site Generation) на серверный рендеринг (Server Side Rendering).

/**
 * Обрабатывает GET-запрос для получения всех категорий.
 */
export async function GET() {
  try {
    await mongooseConnect();
    const allCategories = await Category.find();

    return new NextResponse(JSON.stringify(allCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
      }),
      {
        status: 500,
      }
    );
  }
}
