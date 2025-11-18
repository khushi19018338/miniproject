import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Activity, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            <Activity className="w-6 h-6" />
            <span>HealthAssist</span>
          </NavLink>

          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className="text-foreground hover:text-primary transition-colors"
                  activeClassName="text-primary font-semibold"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
                  activeClassName="opacity-100"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className="text-foreground hover:text-primary transition-colors"
                  activeClassName="text-primary font-semibold"
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/chatbot"
                  className="text-foreground hover:text-primary transition-colors"
                  activeClassName="text-primary font-semibold"
                >
                  Chatbot
                </NavLink>

                <NavLink
                  to="/tracker"
                  className="text-foreground hover:text-primary transition-colors"
                  activeClassName="text-primary font-semibold"
                >
                  Tracker
                </NavLink>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
