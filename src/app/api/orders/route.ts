import User from "@/libs/mongoose/schemas/UserSchema";
import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import Order from "@/libs/mongoose/schemas/orderSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { IOrder } from "@/types/order.interface";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { message: "Not authenticated" },
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  try {
    await mongooseConnect();

    if (session.user?.isAdmin) {
      const allOrders = await Order.find();
      return new NextResponse(JSON.stringify(allOrders), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    const orders = await Order.find({
      email: session.user.email,
    });

    return new NextResponse(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const order: IOrder = await request.json();
    await mongooseConnect();

    const newOrder = await new Order(order).save();

    return new NextResponse(JSON.stringify(newOrder), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
