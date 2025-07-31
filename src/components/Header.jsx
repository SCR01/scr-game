import { Link } from "react-router-dom";
import "./Header.css"; // Optional: for styling

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/nexus">NEXUS</Link></li>
          <li><Link to="/vault">VAULT</Link></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
  );
}