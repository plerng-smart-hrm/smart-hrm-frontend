export function extractFileName(contentDisposition: string | null): string {
  if (!contentDisposition) return "contract.pdf";

  // RFC 5987 (filename*=UTF-8'')
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''(.+)/);
  if (utf8Match && utf8Match[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  // Fallback filename="..."
  const normalMatch = contentDisposition.match(/filename="([^"]+)"/);
  if (normalMatch && normalMatch[1]) {
    return normalMatch[1];
  }

  return "contract.pdf";
}
