import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssistantMark from './components/AssistantMark.jsx';
import ChatComposer from './components/ChatComposer.jsx';
import ChatHeader from './components/ChatHeader.jsx';
import MessageBubble from './components/MessageBubble.jsx';
import WelcomePanel from './components/WelcomePanel.jsx';
import { chatSocket } from './features/chat/chatSocket.js';
import { receiveResponse, sendStarted, setConnection } from './features/chat/chatSlice.js';

export default function App() {
  const dispatch = useDispatch();
  const { messages, isLoading, connection } = useSelector((state) => state.chat);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const onConnect = () => dispatch(setConnection('connected'));
    const onDisconnect = () => dispatch(setConnection('disconnected'));
    const onConnectError = () => dispatch(setConnection('disconnected'));
    const onResponse = (data) => dispatch(receiveResponse(data?.response || 'The assistant returned an empty response.'));

    chatSocket.on('connect', onConnect);
    chatSocket.on('disconnect', onDisconnect);
    chatSocket.on('connect_error', onConnectError);
    chatSocket.on('ai-message-response', onResponse);
    chatSocket.connect();

    return () => {
      chatSocket.off('connect', onConnect);
      chatSocket.off('disconnect', onDisconnect);
      chatSocket.off('connect_error', onConnectError);
      chatSocket.off('ai-message-response', onResponse);
      chatSocket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  function sendMessage(text) {
    if (connection !== 'connected' || isLoading) return;
    dispatch(sendStarted(text));
    chatSocket.emit('ai-message', text);
  }

  return (
    <main className="app-shell">
      <ChatHeader connection={connection} />
      <section className="chat-panel">
        <div className="conversation" aria-live="polite">
          {messages.length === 0 ? <WelcomePanel onChoosePrompt={sendMessage} /> : (
            <div className="message-list">
              {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
              {isLoading && <article className="message-row assistant-row typing-row"><AssistantMark small /><div className="typing-indicator" aria-label="ChatBoot is thinking"><span /><span /><span /></div></article>}
              <div ref={messageEndRef} />
            </div>
          )}
        </div>
        <ChatComposer disabled={connection !== 'connected' || isLoading} onSend={sendMessage} />
      </section>
    </main>
  );
}