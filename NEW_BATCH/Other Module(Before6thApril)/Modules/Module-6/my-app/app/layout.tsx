// app/layout.tsx
import { NavigationMenu } from "@/components/ui/navigation-menu"
import React from "react"
// import "./globals.css"
// import Nav from "@/components/ui/navigation-menu"

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
      <body>
        <h1>This is Root Layout</h1>
        {/* <Nav /> */}
{/* <NavigationMenu></NavigationMenu> */}
        {children}
      </body>
    </html>
  )
}
