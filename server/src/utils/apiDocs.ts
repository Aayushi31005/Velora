const prettyJson = (value: unknown) => JSON.stringify(value, null, 2);

export const buildApiDocsPage = () => {
  const registerExample = prettyJson({
    name: "Ada Lovelace",
    email: "ada@example.com",
    password: "secret123",
  });

  const loginExample = prettyJson({
    email: "ada@example.com",
    password: "secret123",
  });

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Velora API</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0d1117;
        --panel: #161b22;
        --panel-2: #1f2630;
        --text: #e6edf3;
        --muted: #9da7b3;
        --accent: #ffb86c;
        --border: #30363d;
        --success: #3fb950;
        --error: #ff7b72;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Consolas, "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top, rgba(255, 184, 108, 0.12), transparent 30%),
          var(--bg);
        color: var(--text);
      }

      main {
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px 64px;
      }

      h1, h2, h3 {
        margin: 0 0 12px;
      }

      p {
        color: var(--muted);
        line-height: 1.5;
      }

      .hero, .card {
        background: linear-gradient(180deg, rgba(31, 38, 48, 0.95), rgba(22, 27, 34, 0.95));
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 24px;
        margin-bottom: 20px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
      }

      .hero code,
      .endpoint code {
        color: var(--accent);
      }

      .grid {
        display: grid;
        gap: 20px;
      }

      @media (min-width: 860px) {
        .grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      .endpoint {
        display: inline-flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 12px;
        font-size: 14px;
      }

      .method {
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(255, 184, 108, 0.14);
        color: var(--accent);
        font-weight: 700;
      }

      textarea {
        width: 100%;
        min-height: 160px;
        border-radius: 14px;
        border: 1px solid var(--border);
        background: var(--panel-2);
        color: var(--text);
        padding: 14px;
        font: inherit;
        resize: vertical;
      }

      button {
        border: 0;
        border-radius: 999px;
        background: var(--accent);
        color: #201100;
        font-weight: 700;
        padding: 12px 18px;
        cursor: pointer;
        margin-top: 14px;
      }

      pre {
        margin: 16px 0 0;
        padding: 14px;
        border-radius: 14px;
        border: 1px solid var(--border);
        background: #0b0f14;
        overflow: auto;
        white-space: pre-wrap;
        word-break: break-word;
      }

      .ok {
        color: var(--success);
      }

      .bad {
        color: var(--error);
      }

      ul {
        padding-left: 18px;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <h1>Velora Backend</h1>
        <p>This server is running. You can test the auth endpoints directly from this page.</p>
        <ul>
          <li><code>POST /api/auth/register</code></li>
          <li><code>POST /api/auth/login</code></li>
          <li><code>GET /api/auth/me</code></li>
          <li><code>GET /api/products</code></li>
        </ul>
      </section>

      <section class="grid">
        <article class="card">
          <div class="endpoint"><span class="method">POST</span><code>/api/auth/register</code></div>
          <h2>Register</h2>
          <textarea id="register-body">${registerExample}</textarea>
          <button type="button" onclick="sendRequest('/api/auth/register', 'register-body', 'register-result')">Run Register</button>
          <pre id="register-result">Waiting for request...</pre>
        </article>

        <article class="card">
          <div class="endpoint"><span class="method">POST</span><code>/api/auth/login</code></div>
          <h2>Login</h2>
          <textarea id="login-body">${loginExample}</textarea>
          <button type="button" onclick="sendRequest('/api/auth/login', 'login-body', 'login-result')">Run Login</button>
          <pre id="login-result">Waiting for request...</pre>
        </article>

        <article class="card">
          <div class="endpoint"><span class="method">GET</span><code>/api/auth/me</code></div>
          <h2>Protected Route</h2>
          <p>Paste the token from register or login here.</p>
          <textarea id="token-body">Bearer YOUR_TOKEN</textarea>
          <button type="button" onclick="sendProtectedRequest()">Run Protected Route</button>
          <pre id="token-result">Waiting for request...</pre>
        </article>
      </section>
    </main>

    <script>
      async function sendRequest(url, textareaId, outputId) {
        const output = document.getElementById(outputId);
        output.textContent = 'Sending request...';
        output.className = '';

        try {
          const body = JSON.parse(document.getElementById(textareaId).value);
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

          const text = await response.text();
          let parsed;

          try {
            parsed = JSON.parse(text);
          } catch {
            parsed = text;
          }

          output.className = response.ok ? 'ok' : 'bad';
          output.textContent = JSON.stringify(
            {
              status: response.status,
              body: parsed,
            },
            null,
            2,
          );
        } catch (error) {
          output.className = 'bad';
          output.textContent = JSON.stringify(
            {
              message: error instanceof Error ? error.message : 'Unknown error',
            },
            null,
            2,
          );
        }
      }

      async function sendProtectedRequest() {
        const output = document.getElementById('token-result');
        output.textContent = 'Sending request...';
        output.className = '';

        try {
          const authHeader = document.getElementById('token-body').value.trim();
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: authHeader,
            },
          });

          const text = await response.text();
          let parsed;

          try {
            parsed = JSON.parse(text);
          } catch {
            parsed = text;
          }

          output.className = response.ok ? 'ok' : 'bad';
          output.textContent = JSON.stringify(
            {
              status: response.status,
              body: parsed,
            },
            null,
            2,
          );
        } catch (error) {
          output.className = 'bad';
          output.textContent = JSON.stringify(
            {
              message: error instanceof Error ? error.message : 'Unknown error',
            },
            null,
            2,
          );
        }
      }
    </script>
  </body>
</html>`;
};
