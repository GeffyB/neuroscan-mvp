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
          <nav style={{ padding: "10px", borderBottom: "2px dashed #999" }}>
            <a href="/">🏠 Início</a> |{" "}
            <a href="/cadastro">📝 Cadastro</a> |{" "}
            <a href="/teste">🧠 Teste</a> |{" "}
            <a href="/resultado">📊 Resultado</a> |{" "}
            <a href="/fim">🚪 Fim</a>
          </nav>
        )}

        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
