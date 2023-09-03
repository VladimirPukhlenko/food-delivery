import { NextResponse } from "next/server";
import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import Category from "@/libs/mongoose/categorySchema";

// Это API написано на случай, если возникнет необходимость переключиться с генерации статических страниц (Static Site Generation) на серверный рендеринг (Server Side Rendering).

/**
 * Обрабатывает GET-запрос для получения всех категорий.
 */
export async function GET() {
  try {
    await mongooseConnect();
    const allCategories = await Category.find();

    // Возвращаем список категорий
    return new NextResponse(JSON.stringify(allCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // В случае ошибки возвращаем сообщение об ошибке
    console.error("Error in GET:", error);
    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while trying to get categories",
      }),
      {
        status: 500,
      }
    );
  }
}

/**
 * Обрабатывает POST-запрос для добавления новой категории.
 * @param {Request} request - Запрос на добавление категории.
 */
export async function POST(request: Request) {
  try {
    const { title, slug }: { title: string; slug: string } =
      await request.json();

    await mongooseConnect();
    const newCategory = new Category({ title, slug });
    const res = await newCategory.save();

    // Возвращаем успешный ответ
    return new NextResponse(JSON.stringify({ message: "post success" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    // В случае ошибки возвращаем сообщение об ошибке
    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while trying to add a category",
      })
    );
  }
}
