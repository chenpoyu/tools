import { useState, useCallback } from 'react';

interface UseToolReturn<T = string> {
  input: string;
  output: T;
  error: string;
  setInput: (value: string) => void;
  setOutput: (value: T) => void;
  setError: (value: string) => void;
  copyToClipboard: () => Promise<void>;
  clear: () => void;
}

export function useTool<T = string>(initialInput = '', initialOutput = '' as T): UseToolReturn<T> {
  const [input, setInput] = useState(initialInput);
  const [output, setOutput] = useState<T>(initialOutput);
  const [error, setError] = useState('');

  const copyToClipboard = useCallback(async () => {
    try {
      const textToCopy = typeof output === 'string' ? output : JSON.stringify(output);
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error('複製失敗:', err);
      setError('複製到剪貼簿失敗');
    }
  }, [output]);

  const clear = useCallback(() => {
    setInput('');
    setOutput(initialOutput);
    setError('');
  }, [initialOutput]);

  return {
    input,
    output,
    error,
    setInput,
    setOutput,
    setError,
    copyToClipboard,
    clear,
  };
}
