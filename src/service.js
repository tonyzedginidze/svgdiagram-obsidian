import { requestUrl } from 'obsidian';
export const SERVICE_URL = 'https://svgdiagram.ai/rest/v1/obsidian';
export async function service(installationId, path, body = {}) {
  let response;
  try {
    response = await requestUrl({ url: `${SERVICE_URL}/${path}`, method: 'POST', contentType: 'application/json', body: JSON.stringify({ installationId, ...body }), throw: false });
  } catch {
    throw new Error('SVG Diagram is unreachable. Check your connection and retry the same request.');
  }
  let result;
  try { result = response.json; } catch { result = {}; }
  if (response.status >= 400) {
    const detail = typeof result?.error === 'string' && response.status < 500 ? result.error : null;
    const error = new Error(detail || (response.status >= 500 ? 'The diagram could not be generated and was not counted. Try again or rephrase your prompt.' : 'The request was rejected. Update the plugin and try again.'));
    error.code = result?.code;
    throw error;
  }
  return result;
}
