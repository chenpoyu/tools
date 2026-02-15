import { useState } from 'react';
import type { ReactNode } from 'react';
import { Copy, Check, Trash2, FileJson } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface ToolPageWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function ToolPageWrapper({
  title,
  description,
  children,
  actions,
}: ToolPageWrapperProps) {
  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="tool-header">{title}</h1>
        <p className="tool-description">{description}</p>
      </div>

      {actions && (
        <div className="mb-4 flex flex-wrap gap-2">
          {actions}
        </div>
      )}

      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

interface ToolSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function ToolSection({ title, children, className = '' }: ToolSectionProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

interface ToolInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  monospace?: boolean;
}

export function ToolInput({
  label,
  value,
  onChange,
  placeholder,
  rows = 8,
  readOnly = false,
  monospace = false,
}: ToolInputProps) {
  return (
    <div>
      <label className="input-label">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        readOnly={readOnly}
        className={`tool-textarea ${monospace ? 'font-mono' : ''}`}
      />
    </div>
  );
}

interface ToolButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
  disabled?: boolean;
}

interface ToolSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

export function ToolSelect({ label, value, onChange, options }: ToolSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ToolButton({
  onClick,
  children,
  variant = 'primary',
  icon,
  disabled = false,
}: ToolButtonProps) {
  const baseClass = variant === 'primary' ? 'tool-button' : 'tool-button-secondary';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {icon}
      {children}
    </button>
  );
}

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: number;
}

export function CopyButton({ text, label = 'Copy', size = 16 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('已複製到剪貼簿！', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('複製失敗', 'error');
    }
  };

  return (
    <ToolButton
      onClick={handleCopy}
      variant="secondary"
      icon={copied ? <Check size={size} /> : <Copy size={size} />}
      disabled={!text}
    >
      {copied ? 'Copied!' : label}
    </ToolButton>
  );
}

interface ClearButtonProps {
  onClear: () => void;
  label?: string;
}

export function ClearButton({ onClear, label = 'Clear' }: ClearButtonProps) {
  return (
    <ToolButton onClick={onClear} variant="secondary" icon={<Trash2 size={16} />}>
      {label}
    </ToolButton>
  );
}

interface LoadSampleButtonProps {
  onLoad: () => void;
  label?: string;
}

export function LoadSampleButton({ onLoad, label = 'Load Sample' }: LoadSampleButtonProps) {
  return (
    <ToolButton onClick={onLoad} variant="secondary" icon={<FileJson size={16} />}>
      {label}
    </ToolButton>
  );
}

interface TwoColumnLayoutProps {
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
}

export function TwoColumnLayout({ left, right, children }: TwoColumnLayoutProps) {
  if (children) {
    // Use children if provided
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children}
      </div>
    );
  }
  
  // Otherwise use left/right props
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
