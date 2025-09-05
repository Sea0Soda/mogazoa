import './globals.css';
import Header from '@/components/common/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='bg-gray-900'>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
