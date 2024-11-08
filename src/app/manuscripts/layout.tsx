import SideBar from "../components/SideBar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-row">
    <SideBar />
    {children}
  </div>;
}