import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import Product from "@/libs/mongoose/schemas/productSchema";
import { NextResponse } from "next/server";

type TParams = {
  params: { id: string };
};

export async function GET(request: Request, { params }: TParams) {
  try {
    await mongooseConnect();
    const product = await Product.findById(params.id);
    if (!product) {
      return new NextResponse(
        JSON.stringify({
          message: `Product with id ${params.id} not found`,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
      }
    );
  }
}
