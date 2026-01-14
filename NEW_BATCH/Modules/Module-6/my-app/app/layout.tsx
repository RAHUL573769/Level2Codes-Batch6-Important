// app/layout.tsx
// import "./globals.css"

export const metadata = {
  title: "My App",
  description: "My Next.js App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <h1>This is Root Layou</h1>
      <body>{children}</body>
    </html>
  )
}
