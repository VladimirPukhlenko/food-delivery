import User from "@/libs/mongoose/UserSchema";
import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import Order from "@/libs/mongoose/orderSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { IOrder } from "@/types/types";

/**
 * Обрабатывает GET-запрос для получения заказов.
 * @param {NextRequest} request - Запрос на получение заказов.
 * @returns {NextResponse} - Ответ с информацией о заказах.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    try {
      await mongooseConnect();

      if (session.user?.isAdmin) {
        const allOrders = await Order.find();
        return new NextResponse(JSON.stringify(allOrders), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const requeredUser = await User.findOne({ email: session.user.email });
      const userOrders = await Order.find({
        _id: { $in: requeredUser?.orders },
      });

      return new NextResponse(JSON.stringify(userOrders), {
        status: 200,
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

  return NextResponse.json(
    { message: "Not authenticated" },
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * Обрабатывает POST-запрос для добавления нового заказа.
 * @param {Request} request - Запрос на добавление заказа.
 * @returns {NextResponse} - Ответ с информацией о результате добавления заказа.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    try {
      const order: IOrder = await request.json();
      await mongooseConnect();

      const userWithOrder = await User.findOne({ email: session.user.email });
      if (!userWithOrder) {
        return new NextResponse(JSON.stringify({ message: "Not authorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      const newOrder = new Order(order);
      const res = await newOrder.save();
      userWithOrder.orders.push(res._id);
      userWithOrder.save();

      return new NextResponse(
        JSON.stringify({
          message: "Order successfully completed. Wait for email",
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify({ message: "Order failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
