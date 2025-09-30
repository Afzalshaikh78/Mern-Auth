// utils/logger.js
export const logError = (error, req) => {
  const timestamp = new Date().toISOString();
  const route = req?.originalUrl || "N/A";
  const method = req?.method || "N/A";

  console.error(`
[ERROR] ${timestamp}
Route: ${method} ${route}
Message: ${error.message}
Stack: ${error.stack}
---------------------------------
  `);
};
