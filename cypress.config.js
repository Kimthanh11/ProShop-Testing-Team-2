import { defineConfig } from 'cypress';
import fs from 'fs';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        writeToFile({ filename, content }) {
          return new Promise((resolve, reject) => {
            fs.writeFile(filename, JSON.stringify(content, null, 2), (err) => {
              if (err) {
                return reject(err);
              }
              resolve(null);
            });
          });
        }
      });
    },
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false
  },
});

