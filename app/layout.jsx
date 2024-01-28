import '@styles/globals.css'
import '@radix-ui/themes/styles.css';
import { GoogleAnalytics } from '@next/third-parties/google'
import Nav from "@components/nav/Nav";
import Provider from "@components/provider/Provider";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@lib/utils"
import Footer from "@components/footer/Footer";
import {Theme} from "@radix-ui/themes";
import { SpeedInsights } from "@vercel/speed-insights/next"


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
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      <meta property="og:image" content="/assets/images/eazya_open_graph.png"/>
      <meta property="og:image:type" content="image/png"/>
      <meta property="og:image:width" content="1024"/>
      <meta property="og:image:height" content="720"/>
      <GoogleAnalytics gaId="G-RDCDRE0DZT"></GoogleAnalytics>
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
        <Nav/>
        <main className="app">
          <div className="content">
            {children}
          </div>
          <SpeedInsights />
        </main>
        <Footer/>
      </Provider>
    </Theme>
    </body>
    </html>
  )
}
