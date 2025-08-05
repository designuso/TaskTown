import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TaskFlow</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Built with ❤️ for productivity enthusiasts
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-600">
            <Link href="/privacy-policy">
              <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms-of-service">
              <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            </Link>
            <Link href="/contact-support">
              <span className="hover:text-primary transition-colors cursor-pointer">Contact Support</span>
            </Link>
            <Link href="/help-center">
              <span className="hover:text-primary transition-colors cursor-pointer">Help Center</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}