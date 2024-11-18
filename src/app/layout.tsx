import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
