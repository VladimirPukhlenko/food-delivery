import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import Order from "@/libs/mongoose/schemas/orderSchema";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const status = await request.json();
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!id && !session?.user.isAdmin) {
    return new NextResponse(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await mongooseConnect();
    const requiredOrder = await Order.findOne({ _id: id });

    if (!requiredOrder) {
      return new NextResponse(JSON.stringify({ message: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    requiredOrder.status = status;
    const order = await requiredOrder.save();

    return new NextResponse(JSON.stringify(order), {
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
