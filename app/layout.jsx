import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "eazyA",
  description: "University Community"
}


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
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
