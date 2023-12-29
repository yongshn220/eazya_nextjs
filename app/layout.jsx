import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@lib/utils"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata = {
  title: "eazyA",
  description: "University Community"
}


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <Provider>
          <div className="main ">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav/>
            <div className="content">
              {children}
            </div>
          </main>
        </Provider>
      </body>
    </html>
  )
}