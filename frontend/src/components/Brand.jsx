import { Sparkles } from 'lucide-react';

export default function Brand() {
  return (
    <a className="brand" href="/" aria-label="ChatBoot home">
      <span className="brand-mark"><Sparkles size={19} strokeWidth={2.2} /></span>
      <span className="brand-name">chat<span>boot</span></span>
    </a>
  );
}