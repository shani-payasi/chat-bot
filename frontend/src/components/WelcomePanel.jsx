import { ArrowUpRight, Code2, Lightbulb, PenLine } from 'lucide-react';

const prompts = [
  { icon: Lightbulb, label: 'Explain a tricky idea', prompt: 'Explain a tricky idea in a simple way' },
  { icon: Code2, label: 'Help me write some code', prompt: 'Help me write clean, maintainable code' },
  { icon: PenLine, label: 'Draft or polish writing', prompt: 'Help me draft a clear and thoughtful message' },
];

export default function WelcomePanel({ onChoosePrompt }) {
  return (
    <section className="welcome-panel" aria-label="Start a conversation">
      <h1>How can I help?</h1>
      <p className="welcome-description">Choose a starting point or ask your own question.</p>
      <div className="prompt-list">
        {prompts.map(({ icon: Icon, label, prompt }) => (
          <button className="prompt-option" key={label} type="button" onClick={() => onChoosePrompt(prompt)}>
            <Icon size={17} strokeWidth={1.8} /><span>{label}</span><ArrowUpRight className="prompt-arrow" size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}