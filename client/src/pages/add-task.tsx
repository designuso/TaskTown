import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TaskModal from "@/components/task-modal";
import Footer from "@/components/footer";

export default function AddTask() {
  const [showModal, setShowModal] = useState(true);

  const handleModalClose = (open: boolean) => {
    setShowModal(open);
    if (!open) {
      // Navigate back to dashboard when modal is closed
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back-to-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Add New Task</h1>
          <p className="text-slate-600 mt-2">Create a new task to add to your workflow.</p>
        </div>

        <TaskModal 
          open={showModal} 
          onOpenChange={handleModalClose}
        />
      </div>
      <Footer />
    </div>
  );
}