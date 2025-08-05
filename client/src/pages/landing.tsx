import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { CheckCircle, Target, BarChart3, Users, Clock, Star, Trophy, Calendar } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">TaskFlow</h1>
            </div>
            <Button 
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-login"
              className="bg-primary hover:bg-blue-600"
            >
              Sign In with Google
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Master Your Daily Tasks
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Stay organized, track your progress, and compete with your team. 
            TaskFlow helps you achieve more every day with intelligent task management.
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            data-testid="button-get-started"
            className="bg-primary hover:bg-blue-600 text-lg px-8 py-3"
          >
            Get Started Free
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Smart Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Organize tasks with categories, priorities, and due dates. 
                Never miss an important deadline again.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Performance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Track your productivity with detailed analytics and 
                visual reports of your daily achievements.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Team Leaderboards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Compete with your team members and stay motivated 
                with friendly competition and achievements.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Smart Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Get timely notifications and reminders to keep 
                you on track with your daily goals.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to boost your productivity?
          </h3>
          <p className="text-slate-600 mb-6">
            Join thousands of users who have transformed their daily workflow with TaskFlow.
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            data-testid="button-start-now"
            className="bg-primary hover:bg-blue-600"
          >
            Start Your Journey Now
          </Button>
        </div>
      </main>

      {/* Footer */}
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
                <a className="hover:text-primary transition-colors">Privacy Policy</a>
              </Link>
              <Link href="/terms-of-service">
                <a className="hover:text-primary transition-colors">Terms of Service</a>
              </Link>
              <Link href="/contact-support">
                <a className="hover:text-primary transition-colors">Contact Support</a>
              </Link>
              <Link href="/help-center">
                <a className="hover:text-primary transition-colors">Help Center</a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
