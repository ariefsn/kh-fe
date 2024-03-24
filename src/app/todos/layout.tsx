import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todos - KH",
  description: "Todos - KH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}</div>
  );
}
