import './globals.css'

export const metadata = {
  title: 'BJJ Connect',
  description: 'Plataforma para a comunidade do Jiu-Jitsu Brasileiro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

