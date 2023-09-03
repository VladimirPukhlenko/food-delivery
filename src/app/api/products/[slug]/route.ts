import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import Product from "@/libs/mongoose/productSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Category from "@/libs/mongoose/categorySchema";
import { IMenuItem } from "@/types/types";

// БОльшая часть фунционала этого API написана на случай, если возникнет необходимость переключиться с генерации статических страниц (Static Site Generation) на серверный рендеринг (Server Side Rendering).
/**
 * Обрабатывает GET-запрос для получения продукта по slug или id.
 *
 * @param {Request} request - Запрос на получение продукта.
 * @param {Object} params - Параметры запроса.
 * @param {string} params.slug - slug или id продукта.
 * @returns {NextResponse} - Ответ с информацией о продукте.
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    // Устанавливаем соединение с базой данных MongoDB
    await mongooseConnect();

    // Если параметр slug равен "all", получаем все продукты
    if (params.slug === "all") {
      const allProducts = await Product.find();
      return new NextResponse(JSON.stringify(allProducts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Если параметр slug равен "landingPage", получаем продукты для страницы "landingPage"
    if (params.slug === "landingPage") {
      const landingProducts = await Product.find({
        isFeatures: true,
      });
      return new NextResponse(JSON.stringify(landingProducts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Получаем список всех категорий
    const allCategories: IMenuItem[] = await Category.find();
    const categorySlugs = allCategories.map((category) => category.slug);

    // Если параметр slug соответствует слагу какой-либо категории, получаем продукты этой категории
    if (categorySlugs.includes(params.slug)) {
      const categoriesProducts = await Product.find({
        category: params.slug,
      });
      return new NextResponse(JSON.stringify(categoriesProducts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Если параметр slug не соответствует ни одной из вышеперечисленных ситуаций, получаем информацию о конкретном продукте по его id
    const requiredProduct = await Product.findById(params.slug);
    return new NextResponse(JSON.stringify(requiredProduct), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Если произошла ошибка, записываем ее в консоль и возвращаем сообщение об ошибке
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Error" }), {
      status: 500,
    });
  }
}

/**
 * Обрабатывает DELETE-запрос для удаления продукта по id.
 *
 * @param {Request} request - Запрос на удаление продукта.
 * @param {Object} params - Параметры запроса.
 * @param {string} params.id - id продукта.
 * @returns {NextResponse} - Ответ с информацией о результате удаления.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (session?.user.isAdmin) {
    try {
      await mongooseConnect();
      await Product.findByIdAndDelete(params.slug);

      return new NextResponse(
        JSON.stringify({ message: "Product has been deleted" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log(error);

      return new NextResponse(JSON.stringify({ message: "Request error" }), {
        status: 500,
      });
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "No right to delete" }), {
      status: 403,
    });
  }
}
