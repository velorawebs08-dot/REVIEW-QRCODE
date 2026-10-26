/**
 * Copies text to the clipboard with modern navigator.clipboard and fallback to execCommand.
 * Returns true if copied successfully, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Method 1: Modern asynchronous Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Failed or permission denied, proceed to fallback
    }
  }

  // Method 2: Fallback using temporary textarea + execCommand('copy')
  return copyUsingExecCommand(text);
}

/**
 * Synchronous copy for click handlers (e.g. anchor tag clicks) to guarantee
 * clipboard population within user activation context without awaiting.
 */
export function copySynchronously(text: string): boolean {
  if (!text) return false;

  // Fire modern async API without awaiting
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      navigator.clipboard.writeText(text).catch(() => {});
    } catch {
      // Ignore
    }
  }

  // Also execute synchronous execCommand immediately during current event turn
  return copyUsingExecCommand(text);
}

function copyUsingExecCommand(text: string): boolean {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Mobile Safari support

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}
