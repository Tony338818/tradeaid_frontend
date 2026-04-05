import SideNav from "../components/side_nav";
import "../dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <SideNav />

      <main className="dashboard-content">
        <h1>Dashboard Content</h1>
      </main>
    </div>
  );
}
