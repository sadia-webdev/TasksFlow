import Sidebar from "./components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex bg-gray-50' >
        <Sidebar />
        <main className='flex-1 p-6'>{children}</main>
    </div>
  );
}
