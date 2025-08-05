import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle, Search, BookOpen, MessageCircle, Settings, BarChart3 } from "lucide-react";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of TaskFlow",
      articles: [
        { title: "Creating your first task", content: "To create a task, click the 'Add Task' button in the sidebar or on the dashboard. Fill in the task details including title, description, due date, priority level, and category." },
        { title: "Setting up categories", content: "Categories help organize your tasks. Go to the Categories page to create custom categories like 'Work', 'Personal', 'Health', etc." },
        { title: "Understanding priority levels", content: "TaskFlow uses three priority levels: High (urgent tasks), Medium (important tasks), and Low (routine tasks). Use colors to quickly identify priority." }
      ]
    },
    {
      icon: Settings,
      title: "Account & Settings",
      description: "Manage your account preferences",
      articles: [
        { title: "Updating your profile", content: "Your profile information is managed through Replit Auth. Changes to your name, email, or profile picture should be made in your Replit account settings." },
        { title: "Managing notifications", content: "Control your notification preferences in Settings. You can enable/disable email notifications and task reminders." },
        { title: "Exporting your data", content: "Go to Settings → Data & Privacy → Export Data to download all your tasks and performance data in JSON format." }
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Understanding your productivity data",
      articles: [
        { title: "Reading performance charts", content: "The performance chart shows your daily task completion over time. Green bars indicate completed tasks, helping you identify productivity patterns." },
        { title: "Using the leaderboard", content: "The leaderboard shows top performers based on task completion rates. It's designed to motivate and encourage healthy competition." },
        { title: "Tracking your streak", content: "Your streak shows consecutive days of task completion. Maintain consistency to build productive habits." }
      ]
    }
  ];

  const faqs = [
    {
      question: "How long is my data stored?",
      answer: "TaskFlow retains your data for a maximum of 2 months. After this period, older data is automatically deleted to maintain system performance and protect your privacy. You can export your data at any time."
    },
    {
      question: "Can I use TaskFlow offline?",
      answer: "TaskFlow requires an internet connection to sync your data and access all features. However, your browser may cache some content for brief offline viewing."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account, go to Settings → Data & Privacy → Delete Account. This will permanently remove all your data from our servers."
    },
    {
      question: "Can I share tasks with team members?",
      answer: "Currently, TaskFlow is designed for individual productivity tracking. The leaderboard feature allows you to see team performance, but individual tasks remain private."
    },
    {
      question: "What happens to overdue tasks?",
      answer: "Overdue tasks are highlighted in red and continue to appear in your task list until completed or deleted. They're also factored into your productivity analytics."
    },
    {
      question: "How do I change my password?",
      answer: "Since TaskFlow uses Replit Auth, password changes must be made through your Replit account settings. Go to your Replit account to update your password."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <HelpCircle className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold text-slate-900">Help Center</h1>
            </div>
            <p className="text-slate-600 text-lg mb-6">
              Find answers to common questions and learn how to get the most out of TaskFlow
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-help-search"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/contact-support">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid="card-contact-support">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Contact Support</h3>
                <p className="text-sm text-slate-600">Get personalized help from our support team</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/privacy-policy">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid="card-privacy-policy">
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Privacy Policy</h3>
                <p className="text-sm text-slate-600">Learn about our data practices</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/terms-of-service">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid="card-terms-service">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Terms of Service</h3>
                <p className="text-sm text-slate-600">Review our terms and conditions</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Help Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} data-testid={`help-category-${index}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-slate-600">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <div key={articleIndex} className="border-l-2 border-primary/20 pl-3">
                          <h4 className="font-medium text-slate-900 text-sm">{article.title}</h4>
                          <p className="text-xs text-slate-600 mt-1">{article.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFaqs.length === 0 && searchQuery && (
                <div className="text-center py-8" data-testid="no-search-results">
                  <p className="text-slate-600">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                    className="mt-3"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}