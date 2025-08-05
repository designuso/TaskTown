import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicy() {
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
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          </div>
          <p className="text-slate-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Account Information</h4>
                <p className="text-slate-600">
                  When you create an account, we collect your email address, name, and profile information 
                  provided through your authentication provider (Replit Auth). This information is used to 
                  create and manage your account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Task Data</h4>
                <p className="text-slate-600">
                  We store the tasks, categories, and performance data you create in TaskFlow. This includes 
                  task titles, descriptions, due dates, completion status, and associated metadata.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Usage Information</h4>
                <p className="text-slate-600">
                  We collect information about how you use TaskFlow, including your interaction patterns, 
                  feature usage, and performance metrics to improve our service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-slate-600">
                <li>• Provide and maintain TaskFlow services</li>
                <li>• Process and store your tasks and productivity data</li>
                <li>• Generate performance analytics and insights</li>
                <li>• Communicate with you about service updates</li>
                <li>• Improve and optimize our application</li>
                <li>• Ensure security and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                We retain your data for a maximum of 2 months per user account. After this period, 
                older data is automatically deleted to maintain system performance and protect your privacy. 
                You can export your data at any time from the Settings page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. Your data 
                is encrypted in transit and at rest using industry-standard protocols.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                TaskFlow uses Replit Auth for authentication services. Please review Replit's privacy 
                policy for information about how they handle your authentication data. We do not share 
                your task data with any third parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-slate-600">
                <li>• Access and download your data</li>
                <li>• Update or correct your information</li>
                <li>• Delete your account and associated data</li>
                <li>• Opt out of non-essential communications</li>
                <li>• Request clarification about our data practices</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us through the Contact Support page or email us directly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}