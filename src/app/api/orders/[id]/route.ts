import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import Order from "@/libs/mongoose/orderSchema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * Обрабатывает PUT-запрос для обновления статуса заказа.
 * @param {Request} request - Запрос на обновление статуса.
 * @param {Object} params - Параметры запроса.
 * @param {string} params.id - Идентификатор заказа.
 * @returns {NextResponse} - Ответ с информацией о результате обновления статуса.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const status = await request.json();
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (id && session?.user.isAdmin) {
    try {
      await mongooseConnect();
      const requiredOrder = await Order.findOne({ _id: id });

      if (requiredOrder) {
        requiredOrder.status = status;
        await requiredOrder.save();

        return new NextResponse(
          JSON.stringify({ message: "Status has been changed" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Возврат, если заказ не был найден
      return new NextResponse(JSON.stringify({ message: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);

      return new NextResponse(
        JSON.stringify({ message: "Error while trying to request" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // Возвращаем ошибку, если не выполнены условия
  return new NextResponse(
    JSON.stringify({ message: "Unauthorized or missing order ID" }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}
