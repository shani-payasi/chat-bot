import { Sparkles } from 'lucide-react';

export default function AssistantMark({ small = false }) {
  return (
    <span className={`assistant-mark${small ? ' assistant-mark-small' : ''}`} aria-hidden="true">
      <Sparkles size={small ? 15 : 20} strokeWidth={2} />
    </span>
  );
}