import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { toolsConfig } from './config/tools';
import { ToastProvider } from './contexts/ToastContext';

// Import implemented tools
import JsonPrettifier from './pages/formatters/JsonPrettifier';
import Base64Converter from './pages/converters/Base64Converter';
import TimestampConverter from './pages/converters/TimestampConverter';
import UrlConverter from './pages/converters/UrlConverter';
import PasswordGenerator from './pages/security/PasswordGenerator';
import HashCalculator from './pages/security/HashCalculator';
import JwtDecoder from './pages/converters/JwtDecoder';
import CidrCalculator from './pages/network/CidrCalculator';
import UserAgentParser from './pages/network/UserAgentParser';
import IpLookup from './pages/network/IpLookup';
import HttpStatusCodes from './pages/network/HttpStatusCodes';
import MarkdownPreviewer from './pages/converters/MarkdownPreviewer';
import SvgOptimizer from './pages/converters/SvgOptimizer';
import StorageManager from './pages/system/StorageManager';
import RegexTester from './pages/converters/RegexTester';
import FlexboxVisualizer from './pages/frontend/FlexboxVisualizer';
import GridVisualizer from './pages/frontend/GridVisualizer';
import ColorContrastChecker from './pages/frontend/ColorContrastChecker';
import HtmlEditor from './pages/frontend/HtmlEditor';
import UnicodeConverter from './pages/converters/UnicodeConverter';
import CronGenerator from './pages/converters/CronGenerator';
import CspGenerator from './pages/security/CspGenerator';
import TaiwanIdGenerator from './pages/security/TaiwanIdGenerator';
import GuidGenerator from './pages/security/GuidGenerator';
import SqlFormatter from './pages/formatters/SqlFormatter';
import XmlFormatter from './pages/formatters/XmlFormatter';
import HtmlFormatter from './pages/formatters/HtmlFormatter';
import JavaScriptFormatter from './pages/formatters/JavaScriptFormatter';
import CheatSheet from './pages/system/CheatSheet';
import DiffChecker from './pages/formatters/DiffChecker';
import Base64Image from './pages/converters/Base64Image';

// Placeholder component for tools not yet implemented
function ToolPlaceholder({ name, description }: { name: string; description: string }) {
  return (
    <div className="tool-container">
      <h1 className="tool-header">{name}</h1>
      <p className="tool-description">{description}</p>
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-blue-800 dark:text-blue-300">
          🚧 此工具即將推出！請稍後再回來查看更新。
        </p>
      </div>
    </div>
  );
}

// Map of implemented tools
const implementedTools: Record<string, React.ComponentType> = {
  'json-format': JsonPrettifier,
  'base64': Base64Converter,
  'timestamp': TimestampConverter,
  'url': UrlConverter,
  'password': PasswordGenerator,
  'hash': HashCalculator,
  'jwt-decoder': JwtDecoder,
  'cidr': CidrCalculator,
  'ua-parser': UserAgentParser,
  'ip-lookup': IpLookup,
  'http-codes': HttpStatusCodes,
  'markdown-preview': MarkdownPreviewer,
  'svg-optimizer': SvgOptimizer,
  'storage-manager': StorageManager,
  'regex-tester': RegexTester,
  'flexbox': FlexboxVisualizer,
  'grid': GridVisualizer,
  'color-contrast': ColorContrastChecker,
  'unicode': UnicodeConverter,
  'cron': CronGenerator,
  'csp': CspGenerator,
  'taiwan-id': TaiwanIdGenerator,
  'guid': GuidGenerator,
  'sql-format': SqlFormatter,
  'xml-format': XmlFormatter,
  'html-formatter': HtmlFormatter,
  'js-formatter': JavaScriptFormatter,
  'cheatsheet': CheatSheet,
  'diff': DiffChecker,
  'base64-image': Base64Image,
  'html-editor': HtmlEditor,
};

function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          
          {/* Dynamic routes from toolsConfig */}
          {toolsConfig.map((tool) => {
            const Component = implementedTools[tool.id];
            
            return (
              <Route
                key={tool.id}
                path={tool.path}
                element={
                  Component ? (
                    <Component />
                  ) : (
                    <ToolPlaceholder name={tool.name} description={tool.description} />
                  )
                }
              />
            );
          })}
          
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
    </ToastProvider>
  );
}

export default App;

