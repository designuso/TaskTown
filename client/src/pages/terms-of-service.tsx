import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
          </div>
          <p className="text-slate-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                By accessing and using TaskFlow, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to these terms, please do not use 
                our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                TaskFlow is a productivity and task management application that helps users organize, 
                track, and complete their daily tasks. The service includes features such as task 
                creation, categorization, progress tracking, analytics, and team performance insights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Account Creation</h4>
                <p className="text-slate-600">
                  You must create an account using Replit Auth to access TaskFlow. You are responsible 
                  for maintaining the confidentiality of your account credentials.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Account Responsibility</h4>
                <p className="text-slate-600">
                  You are responsible for all activities that occur under your account. You must notify 
                  us immediately of any unauthorized use of your account.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 mb-3">You agree not to use TaskFlow to:</p>
              <ul className="space-y-2 text-slate-600">
                <li>• Violate any applicable laws or regulations</li>
                <li>• Infringe on intellectual property rights</li>
                <li>• Upload or transmit harmful, offensive, or inappropriate content</li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>• Interfere with other users' ability to use the service</li>
                <li>• Use the service for commercial purposes without authorization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data and Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
                and protect your information. By using TaskFlow, you consent to our privacy practices 
                as described in our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                We retain user data for a maximum of 2 months. After this period, older data is 
                automatically deleted. You can export your data at any time through the Settings page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                We strive to maintain high service availability, but we do not guarantee uninterrupted 
                access to TaskFlow. We may temporarily suspend the service for maintenance, updates, 
                or other operational reasons.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                TaskFlow is provided "as is" without warranties of any kind. We shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages resulting 
                from your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                We reserve the right to terminate or suspend your account at any time for violation 
                of these terms. You may also terminate your account at any time through the Settings page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                We may modify these terms at any time. We will notify users of significant changes 
                through the application. Continued use of TaskFlow after changes constitutes acceptance 
                of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                If you have questions about these Terms of Service, please contact us through 
                the Contact Support page or email us directly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}