import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DataCenter from "./pages/DataCenter";
import RecordingReview from "./pages/RecordingReview";
import RecordingInspection from "./pages/RecordingInspection";
import ReportDetail from "./pages/ReportDetail";
import LogView from "./pages/LogView";
import InformedConsent from "./pages/InformedConsent";
import StudentSelection from "./pages/StudentSelection";
import VideoRecording from "./pages/VideoRecording";
import PhotoCapture from "./pages/PhotoCapture";
import NoteEditor from "./pages/NoteEditor";
import VideoPlayback from "./pages/VideoPlayback";
import LogViewer from "./pages/LogViewer";
import ToolManagement from "./pages/ToolManagement";
import EditTool from "./pages/EditTool";
import PersonalCenter from "./pages/PersonalCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-center" element={<DataCenter />} />
          <Route path="/recording-review" element={<RecordingReview />} />
          <Route
            path="/recording-inspection"
            element={<RecordingInspection />}
          />
          <Route path="/report-detail" element={<ReportDetail />} />
          <Route path="/log-view" element={<LogView />} />
          <Route path="/informed-consent" element={<InformedConsent />} />
          <Route path="/student-selection" element={<StudentSelection />} />
          <Route path="/video-recording" element={<VideoRecording />} />
          <Route path="/photo-capture" element={<PhotoCapture />} />
          <Route path="/note-editor" element={<NoteEditor />} />
          <Route path="/video-playback" element={<VideoPlayback />} />
          <Route path="/log-viewer" element={<LogViewer />} />
          <Route path="/tool-management" element={<ToolManagement />} />
          <Route path="/edit-tool/:id" element={<EditTool />} />
          <Route path="/personal-center" element={<PersonalCenter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
