const https = require('https');

const routes = [
  '',
  'optimizer',
  'volunteers',
  'predictions',
  'incidents',
  'simulator',
  'copilot',
  'briefings',
  'notifications',
  'users',
  'audit-logs',
  'settings',
  'about'
];

function checkRoute(route) {
  const url = `https://kumbhforce-ai.vercel.app/${route}`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`Route: /${route.padEnd(15)} | Status Code: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.log(`Error on /${route}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Verifying all deployed frontend navigation routes on Vercel...');
  for (const route of routes) {
    await checkRoute(route);
  }
}

run();
