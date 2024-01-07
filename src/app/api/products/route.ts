import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import { NextResponse } from "next/server";
import Product from "@/libs/mongoose/schemas/productSchema";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      all: {},
      features: {
        isFeatures: true,
      },
      burgers: {
        category: "burgers",
      },
      pizzas: {
        category: "pizzas",
      },
      pastas: {
        category: "pastas",
      },
    };

    const type = searchParams.get("type") as keyof typeof query;

    if (!type || !query[type]) {
      return new NextResponse(
        JSON.stringify({ message: "Search Params is not correct" }),
        {
          status: 404,
        }
      );
    }

    await mongooseConnect();
    const products = await Product.find(query[type]);
    return new NextResponse(JSON.stringify(products), {
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
