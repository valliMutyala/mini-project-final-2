import { Link } from "react-router-dom";

export default function Footer() {
    return(
        <footer className="bg-primary text-primary-foreground py-4 px-6 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm">&copy; 2023 Neighborhood Navigator. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link to="/" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    )
}