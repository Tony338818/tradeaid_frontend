import {
  LayoutDashboard,
  Package,
  CreditCard,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    title: "GENERAL",
    links: [
      { name: "Dashboard", icon: LayoutDashboard },
      { name: "Products", icon: Package },
      { name: "Transactions", icon: CreditCard },
    ],
  },
  {
    title: "HELP & SETTINGS",
    links: [
      { name: "Settings", icon: Settings },
      { name: "Privacy", icon: Shield },
    ],
  },
];

export default function SideNav() {
  return (
    <div className="side_nav">
      <div className="nav-brand">
        <div className="logo"></div>
        <span>TradeAid</span>
      </div>

      {navItems.map((section, index) => (
        <div key={index}>
          <h4 className="nav-title">{section.title}</h4>

          <ul className="nav-links">
            {section.links.map((link, i) => {
              const Icon = link.icon;

              return (
                <li key={i} className="nav-item">
                  <Icon size={18} />
                  <span>{link.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="logout">
        <LogOut size={18} />
        <span>Logout</span>
      </div>
    </div>
  );
}