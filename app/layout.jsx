import '@styles/globals.css'
import '@radix-ui/themes/styles.css';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
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
  title: "EazyA - An Anonymous University Community",
  description: "Join EazyA, the premier online platform for university students, faculty, and alumni. Connect, collaborate, and access a wealth of resources tailored for academic success and community involvement.",
  keywords: "University Community, Student Collaboration, Academic Resources, Alumni Network, Faculty Support, University Events",
  metadataBase: new URL("https://www.eazya.net/"),
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/assets/images/eazyaLogo.png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
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
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer/>
      </Provider>
    </Theme>
    </body>
    </html>
  )
}
