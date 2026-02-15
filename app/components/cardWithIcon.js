import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';

export default function CardWithIcon({ icon, title, texts }) {
  // Bezpieczne pobieranie markdown
  const markdownContent = texts?.[0]?.text?.markdown;
  return (
    <div className="w-full p-4 sm:w-1/2 lg:w-1/3">
      <div className="group h-full w-full rounded-md border border-blue-400 bg-white px-8 pt-8 pb-6 transition-colors hover:bg-blue-400">
        {/* Ikona */}
        {icon && (
          <div className="mb-8 text-center">
            <FontAwesomeIcon
              className="text-7xl text-blue-500 transition-colors group-hover:text-white"
              icon={icon}
            />
          </div>
        )}
        {/* Tytuł */}
        {title && (
          <h2 className="mb-4 text-center text-3xl font-light text-blue-900 transition-colors group-hover:text-white">
            {title}
          </h2>
        )}
        {/* Treść */}
        {markdownContent && (
          <ReactMarkdown className="markdown-content text-center transition-colors group-hover:text-white">
            {markdownContent}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
