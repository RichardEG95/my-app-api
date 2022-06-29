import type { Response as ExpressResponse } from 'express';

export default function respond(
  res: ExpressResponse,
  status: number,
  data?: unknown,
  contentType = 'application/json',
  extraHeaders?: Record<string, string>
): void {
  res.writeHead(status, {
    'Content-Type': contentType,
    ...extraHeaders
  });

  res.end(JSON.stringify(data));
}
