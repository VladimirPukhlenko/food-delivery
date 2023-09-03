import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trattoria | cart",
};
const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default CartLayout;
