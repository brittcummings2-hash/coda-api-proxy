const http = require('http');
const url = require('url');

// Import the handler
const handler = require('./api/coda.js').default;

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/api/coda') {
    // Create Vercel-like request/response objects
    const vercelReq = {
      method: req.method,
      query: parsedUrl.query,
      headers: req.headers
    };
    
    const vercelRes = {
      statusCode: 200,
      headers: {},
      setHeader: (key, value) => {
        vercelRes.headers[key] = value;
      },
      status: (code) => {
        vercelRes.statusCode = code;
        return vercelRes;
      },
      json: (data) => {
        Object.entries(vercelRes.headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
        res.writeHead(vercelRes.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      },
      end: () => {
        Object.entries(vercelRes.headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
        res.writeHead(vercelRes.statusCode);
        res.end();
      }
    };
    
    try {
      await handler(vercelReq, vercelRes);
    } catch (error) {
      console.error('Handler error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Coda API Proxy</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .card {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #333; margin-top: 0; }
            code {
              background: #f0f0f0;
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 14px;
            }
            .status { color: #22c55e; font-weight: 600; }
            button {
              background: #0070f3;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 14px;
              margin-top: 10px;
            }
            button:hover { background: #0051cc; }
            .response {
              margin-top: 20px;
              padding: 15px;
              background: #f9f9f9;
              border-radius: 5px;
              border-left: 3px solid #0070f3;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .error { border-left-color: #ef4444; }
            .success { border-left-color: #22c55e; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>🚀 Coda API Proxy</h1>
            <p class="status">✓ Server is running</p>
            
            <h2>API Endpoint</h2>
            <p><code>GET /api/coda</code></p>
            
            <h2>Configuration</h2>
            <p>Make sure to set these environment variables in <code>.env</code>:</p>
            <ul>
              <li><code>CODA_API_KEY</code> - Your Coda API key</li>
              <li><code>CODA_DOC_ID</code> - Your Coda document ID</li>
              <li><code>CODA_TABLE_ID</code> - Your Coda table ID</li>
            </ul>
            
            <button onclick="testEndpoint()">Test API Endpoint</button>
            
            <div id="response"></div>
          </div>
          
          <script>
            async function testEndpoint() {
              const responseDiv = document.getElementById('response');
              responseDiv.innerHTML = '<div class="response">Loading...</div>';
              
              try {
                const response = await fetch('/api/coda');
                const data = await response.json();
                
                if (response.ok) {
                  responseDiv.innerHTML = '<div class="response success"><strong>Success!</strong>\\n' + 
                    JSON.stringify(data, null, 2) + '</div>';
                } else {
                  responseDiv.innerHTML = '<div class="response error"><strong>Error:</strong>\\n' + 
                    JSON.stringify(data, null, 2) + '</div>';
                }
              } catch (error) {
                responseDiv.innerHTML = '<div class="response error"><strong>Error:</strong>\\n' + 
                  error.message + '</div>';
              }
            }
          </script>
        </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`\\n🚀 Development server running!`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/coda\\n`);
});
