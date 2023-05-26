const dev = {
  app_urls: ['http://localhost:5173', 'http://127.0.0.1:5173'],
};
const prod = {
  app_urls: ['https://www.example.com'],
};

let app_config = dev;

if (process.env.NODE_ENV === 'production') {
  app_config = prod;
}

export default app_config;
