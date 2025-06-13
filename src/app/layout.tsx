// ===============================
// 📦 ARQUIVO: src/app/layout.tsx
// ===============================

// 🎯 OBJETIVO: Define o layout global do app e insere o menu temporário no modo dev

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const estamosNaBaguncaDoDev = process.env.NODE_ENV === "development";

  return (
    <html lang="pt-BR">
      <body>
        {estamosNaBaguncaDoDev && (
          <nav
            style={{
              padding: "10px",
              borderBottom: "2px dashed #999",
              textAlign: "center",
              fontSize: "0.95rem",
            }}
          >
            <a href="/" style={{ margin: "0 0.5em" }}>🏠 Início</a>|
            <a href="/cadastro" style={{ margin: "0 0.5em" }}>📝 Cadastro</a>|
            <a href="/teste" style={{ margin: "0 0.5em" }}>🧠 Teste</a>|
            <a href="/resultado" style={{ margin: "0 0.5em" }}>📊 Resultado</a>|
            <a href="/fim" style={{ margin: "0 0.5em" }}>🚪 Fim</a>
          </nav>
        )}

        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
