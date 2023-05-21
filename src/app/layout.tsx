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
        <div className="max-w-md w-full py-20 px-8 h-screen">{children}</div>
      </body>
    </html>
  )
}
