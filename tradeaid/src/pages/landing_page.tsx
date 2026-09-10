import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Menu,
  MessageCircle,
  PackageCheck,
  ReceiptText,
  Search,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import "../landing_page.css";

const capabilities = [
  {
    icon: MessageCircle,
    title: "Talks to customers",
    text: "Answers questions, takes orders and follows up naturally on WhatsApp.",
    tone: "mint",
  },
  {
    icon: ReceiptText,
    title: "Closes the paperwork",
    text: "Creates clean receipts and records every sale without extra data entry.",
    tone: "yellow",
  },
  {
    icon: Search,
    title: "Watches the market",
    text: "Compares prices and turns market movement into a clear recommendation.",
    tone: "blue",
  },
  {
    icon: PackageCheck,
    title: "Keeps stock honest",
    text: "Updates inventory as orders happen and flags what needs your attention.",
    tone: "coral",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className="site-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="TradeAid home">
          <span className="brand-mark">
            <Zap size={19} fill="currentColor" />
          </span>
          <span>TradeAid</span>
        </a>
        <nav
          className={open ? "nav-links is-open" : "nav-links"}
          aria-label="Main navigation"
        >
          <a href="#brain" onClick={() => setOpen(false)}>
            The business brain
          </a>
          <a href="#workflow" onClick={() => setOpen(false)}>
            How it works
          </a>
          <button className="text-button" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className="nav-cta" onClick={() => navigate("/register")}>
            Start on WhatsApp <ArrowRight size={16} />
          </button>
        </nav>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main id="top">
        <section className="hero-new">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={15} /> Your business, thinking ahead
            </div>
            <h1>
              Run your whole business from one <em>conversation.</em>
            </h1>
            <p>
              TradeAid is the business brain inside WhatsApp. It talks to
              customers, records sales, creates receipts, watches your stock and
              shows you what to do next.
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => navigate("/register")}
              >
                <MessageCircle size={19} /> Connect WhatsApp{" "}
                <ArrowRight size={18} />
              </button>
              <a className="secondary-link" href="#brain">
                See it in action <span>↓</span>
              </a>
            </div>
            <div className="proof-line">
              <span>
                <Check size={14} /> No new app to learn
              </span>
              <span>
                <Check size={14} /> Set up in minutes
              </span>
            </div>
          </div>
          <div
            className="brain-stage"
            aria-label="TradeAid live business activity"
          >
            <div className="stage-glow" />
            <div className="activity-window">
              <div className="window-top">
                <span className="status-dot" /> TradeAid is working{" "}
                <span className="window-time">Live</span>
              </div>
              <div className="chat-row customer">
                <div className="avatar">AO</div>
                <div className="bubble">
                  <small>Amaka O.</small>Please send 2 cartons of Milo and a
                  receipt.
                </div>
              </div>
              <div className="ai-processing">
                <span className="mini-bot">
                  <Bot size={15} />
                </span>
                <div>
                  <strong>Order confirmed</strong>
                  <p>Receipt #1048 sent · Stock updated</p>
                </div>
                <span className="done">
                  <Check size={14} />
                </span>
              </div>
              <div className="insight-card">
                <div className="insight-icon">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <small>TRADEAID INSIGHT</small>
                  <strong>Milo is selling 24% faster this week.</strong>
                  <p>Restock 3 cartons before Friday.</p>
                </div>
              </div>
              <div className="chat-row bot">
                <div className="avatar bot-avatar">
                  <Zap size={15} />
                </div>
                <div className="bubble">
                  Done. I’ve sent Amaka her receipt and added ₦18,400 to today’s
                  sales.
                </div>
              </div>
            </div>
            <div className="float-card revenue">
              <small>TODAY’S REVENUE</small>
              <strong>₦284,600</strong>
              <span>↗ 18.4%</span>
            </div>
            <div className="float-card handled">
              <span className="pulse-ring">
                <Check size={15} />
              </span>
              <div>
                <strong>12 tasks handled</strong>
                <small>while you were away</small>
              </div>
            </div>
          </div>
        </section>
        <section className="trust-strip">
          <div>
            <span>Customer conversations</span>
            <i />
            <span>Sales & receipts</span>
            <i />
            <span>Inventory</span>
            <i />
            <span>Market intelligence</span>
            <i />
            <span>Finance</span>
          </div>
        </section>
        <section className="capability-section" id="brain">
          <div className="section-heading">
            <span className="section-kicker">MORE THAN SOFTWARE</span>
            <h2>A business brain that does the work, not just displays it.</h2>
            <p>
              Most tools wait for you to update them. TradeAid listens, acts,
              records and recommends—in the flow of every WhatsApp conversation.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ icon: Icon, title, text, tone }, i) => (
              <article className={`capability-card ${tone}`} key={title}>
                <span className="card-index">0{i + 1}</span>
                <div className="cap-icon">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="learn">
                  Explore capability <ArrowRight size={15} />
                </span>
              </article>
            ))}
          </div>
        </section>
        <section className="workflow-section" id="workflow">
          <div className="workflow-copy">
            <span className="section-kicker light">
              A NORMAL DAY, RUN BETTER
            </span>
            <h2>Every message becomes business momentum.</h2>
            <p>
              A customer places an order. TradeAid does the connected work
              automatically, then gives you the full picture.
            </p>
            <button
              className="light-button"
              onClick={() => navigate("/dashboard")}
            >
              Explore the command centre <ArrowRight size={17} />
            </button>
          </div>
          <div className="workflow-list">
            {[
              "Customer order received",
              "Payment & receipt recorded",
              "Inventory adjusted",
              "Sales forecast updated",
            ].map((item, i) => (
              <div className="workflow-item" key={item}>
                <span>{i + 1}</span>
                <strong>{item}</strong>
                <Check size={18} />
              </div>
            ))}
          </div>
        </section>
        <section className="final-cta">
          <div>
            <span className="section-kicker">
              YOUR BUSINESS IS ALREADY TALKING
            </span>
            <h2>Now give it a brain.</h2>
            <p>
              Connect TradeAid to WhatsApp and turn everyday conversations into
              a business that runs smarter.
            </p>
          </div>
          <button
            className="primary-button dark"
            onClick={() => navigate("/register")}
          >
            <MessageCircle size={19} /> Start with WhatsApp{" "}
            <ArrowRight size={18} />
          </button>
        </section>
      </main>
      <footer className="site-footer">
        <a className="brand" href="#top">
          <span className="brand-mark">
            <Zap size={18} fill="currentColor" />
          </span>
          <span>TradeAid</span>
        </a>
        <p>Your business brain, always on.</p>
        <span>© 2026 TradeAid</span>
      </footer>
    </div>
  );
}
