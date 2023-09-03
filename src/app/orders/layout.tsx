import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trattoria | orders",
};
const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default OrderLayout;
