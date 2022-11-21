import { dirname } from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(dirname(__filename));
/**
 * Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
 * @param {String|Number} value
 * @returns {String|Number}
 */
export function normalizePort(value) {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
