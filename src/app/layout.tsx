import { Toaster } from "react-hot-toast"
import "./globals.css"

export const metadata = {
  title: "Diato",
  description: "요일별로 정리된 할 일 리스트.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center font-pretendard">
        <div className="h-screen w-full max-w-md px-8 py-20">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
