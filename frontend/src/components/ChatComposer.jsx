import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

export default function ChatComposer({ disabled, onSend }) {
  const [value, setValue] = useState('');

  function submit(event) {
    event.preventDefault();
    const message = value.trim();
    if (!message || disabled) return;
    onSend(message);
    setValue('');
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <div className="composer-area">
      <form className="composer" onSubmit={submit}>
        <textarea aria-label="Message ChatBoot" placeholder="Message ChatBoot..." rows={1} value={value}
          onChange={(event) => setValue(event.target.value)} onKeyDown={handleKeyDown} disabled={disabled} />
        <div className="composer-controls">
          <button className="send-button" type="submit" aria-label="Send message" disabled={!value.trim() || disabled}><ArrowUp size={19} strokeWidth={2.3} /></button>
        </div>
      </form>
      <p className="disclaimer">ChatBoot can make mistakes. Check important information.</p>
    </div>
  );
}