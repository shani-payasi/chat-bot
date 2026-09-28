import Brand from './Brand.jsx';

const statusLabels = {
  connected: 'Connected',
  connecting: 'Connecting',
  disconnected: 'Reconnecting',
};

export default function ChatHeader({ connection }) {
  return (
    <header className="chat-header">
      <Brand />
      <div className="header-status"><span className={`connection-dot ${connection}`} />{statusLabels[connection]}</div>
    </header>
  );
}