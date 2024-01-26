import '@styles/globals.css'
import '@radix-ui/themes/styles.css';
import { GoogleAnalytics } from '@next/third-parties/google'
import Nav from "@components/nav/Nav";
import Provider from "@components/provider/Provider";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@lib/utils"
import Footer from "@components/footer/Footer";
import {Theme} from "@radix-ui/themes";

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
    <head>
      <link rel="icon" href="/assets/images/eazyaLogo.png"/>
      <GoogleAnalytics gaId="G-X48SYYDLT6"></GoogleAnalytics>
    </head>
    <body className={cn(
      "min-h-screen bg-background font-sans antialiased",
      fontSans.variable
    )}>
    <Theme>
      <Provider>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <Nav/>
          <div className="content">
            {children}
          </div>
        </main>
        <Footer/>
      </Provider>
    </Theme>
    </body>
    </html>
  )
}
