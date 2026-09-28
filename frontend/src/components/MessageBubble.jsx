import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AssistantMark from './AssistantMark.jsx';

export default function MessageBubble({ message }) {
  const isAssistant = message.role === 'assistant';
  return (
    <article className={`message-row ${isAssistant ? 'assistant-row' : 'user-row'}`}>
      {isAssistant && <AssistantMark small />}
      <div className={`message-content ${isAssistant ? 'assistant-message' : 'user-message'}`}>
        {isAssistant ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown> : <p>{message.content}</p>}
      </div>
    </article>
  );
}