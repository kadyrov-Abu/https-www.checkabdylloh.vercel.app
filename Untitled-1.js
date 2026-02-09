/app
 ├─ page.jsx
 ├─ layout.jsx
 └─ globals.css
import "./globals.css";

export const metadata = {
  title: "Check Tool",
  description: "Simple online check tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
"use client";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = () => {
    if (!value) {
      setResult("❌ Please enter something");
      return;
    }

    setResult(`✅ Checked: ${value}`);
  };

  return (
    <main className="container">
      <h1>Online Check Tool</h1>
      <p>Enter data below and click check</p>

      <input
        type="text"
        placeholder="Enter text..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={handleCheck}>Check</button>

      {result && <div className="result">{result}</div>}
    </main>
  );
}
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  margin: 0;
  background: #0f172a;
  color: white;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

h1 {
  font-size: 2.2rem;
}

p {
  opacity: 0.8;
}

input {
  width: 280px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  outline: none;
}

button {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

.result {
  margin-top: 10px;
  padding: 12px;
  background: #020617;
  border-radius: 8px;
}
npx create-next-app check-tool
cd check-tool
# замени файлы
npm run dev
<meta name="google-site-verification" content="qO1kb79R1qRyBC829__3ALyNFhETmyXSjvaoNnnULQA" />