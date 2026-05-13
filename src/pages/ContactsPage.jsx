import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Globe, GitBranch, Bot, Send } from 'lucide-react';

const contacts = [
  {
    icon: Phone,
    label: 'Phone (CZ)',
    value: '+420 778 974 161',
    href: 'tel:+420778974161',
    external: false,
  },
  {
    icon: Phone,
    label: 'Phone (IT)',
    value: '+39 334 223 1606',
    href: 'tel:+393342231606',
    external: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'andbr95@gmail.com',
    href: 'mailto:andbr95@gmail.com',
    external: false,
  },
  {
    icon: Globe,
    label: 'LinkedIn',
    value: 'andrea-bruni',
    href: 'https://www.linkedin.com/in/andrea-bruni-8b1b85138/',
    external: true,
  },
  {
    icon: GitBranch,
    label: 'GitHub',
    value: 'anbruni',
    href: 'https://github.com/anbruni',
    external: true,
  },
];

function ContactCard({ icon: Icon, label, value, href, external }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-4 p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 hover:scale-105 transition-all duration-200"
    >
      <div className="p-3 rounded-lg bg-french-blue/30 shrink-0">
        <Icon size={20} className="text-french-blue-light" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</span>
        <span className="text-white font-medium truncate">{value}</span>
      </div>
    </a>
  );
}

function ContactsPage() {
    const location = useLocation();
    const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen flex flex-col items-start justify-center px-6 md:px-10 pb-24 pt-0 md:pt-10 md:pb-24 relative z-10 max-w-5xl mx-auto">

      {isHome ? null : (
        <Link to="/" className="md:hidden btn-back mb-10">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      )}

      <h1 className="heading-1 mb-3">Get In Touch</h1>
      <p className="subtitle mb-12">I'm always open to new opportunities and conversations.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-16">
        {contacts.map((contact) => (
          <ContactCard key={contact.label} {...contact} />
        ))}
      </div>

      <div className="w-full border-t border-white/10 pt-12">
        <h2 className="heading-2 mb-3">Reach out directly</h2>
        <p className="subtitle mb-8">Two ways to get in touch with me instantly.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="mailto:andbr95@gmail.com"
            className="flex items-center gap-4 p-5 rounded-xl bg-french-blue/20 border border-french-blue/30 hover:bg-french-blue/30 hover:scale-105 transition-all duration-200"
          >
            <div className="p-3 rounded-lg bg-french-blue/40 shrink-0">
              <Send size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold">Send me an email</span>
              <span className="text-slate-400 text-sm">Direct to my inbox</span>
            </div>
          </a>

          <div className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 opacity-60 cursor-not-allowed">
            <div className="p-3 rounded-lg bg-white/10 shrink-0">
              <Bot size={20} className="text-slate-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Chat with my AI</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-french-blue/40 text-french-blue-light font-medium">Coming Soon</span>
              </div>
              <span className="text-slate-400 text-sm">An AI agent trained to be me</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ContactsPage;