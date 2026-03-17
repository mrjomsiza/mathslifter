import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import LandingPage from "./pages/public/LandingPage";
import SignInPage from "./pages/public/SignInPage";
import SignUpPage from "./pages/public/SignUpPage";
import TutorDashboardPage from "./pages/tutor/TutorDashboardPage";
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import WeeklyPlanPage from "./pages/student/WeeklyPlanPage";
import StudentExercisesPage from "./pages/student/StudentExercisesPage";
import SubmissionsPage from "./pages/student/SubmissionsPage";
import PeerReviewPage from "./pages/student/PeerReviewPage";
import ProgressPage from "./pages/shared/ProgressPage";
import ProfileSettingsPage from "./pages/shared/ProfileSettingsPage";
import TutorStudentsPage from "./pages/tutor/TutorStudentsPage";
import TutorStudentDetailPage from "./pages/tutor/TutorStudentDetailPage";
import TutorProgramPage from "./pages/tutor/TutorProgramPage";
import AppShell from "./components/layout/AppShell";

function ProtectedRoute({ children }) {
  const { loading, currentUser } = useAuth();

  if (loading) return <div className="p-6 text-slate-100">Loading...</div>;
  if (!currentUser) return <Navigate to="/signin" replace />;
  return children;
}

function RoleRoute({ expectedRole, children }) {
  const { loading, userProfile } = useAuth();

  if (loading) return <div className="p-6 text-slate-100">Loading...</div>;
  if (!userProfile) return <Navigate to="/signup" replace />;

  if (userProfile.role !== expectedRole) {
    return <Navigate to={userProfile.role === "tutor" ? "/tutor" : "/student"} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route
        path="/tutor"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="tutor">
              <AppShell title="Tutor Dashboard">
                <TutorDashboardPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tutor/students"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="tutor">
              <AppShell title="Tutor Students">
                <TutorStudentsPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tutor/students/:studentId"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="tutor">
              <AppShell title="Student Detail">
                <TutorStudentDetailPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tutor/programs"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="tutor">
              <AppShell title="Program Generation">
                <TutorProgramPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="student">
              <AppShell title="Student Dashboard">
                <StudentDashboardPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/weekly-plan"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="student">
              <AppShell title="Weekly Plan">
                <WeeklyPlanPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/exercises"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="student">
              <AppShell title="Daily Exercises">
                <StudentExercisesPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/submissions"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="student">
              <AppShell title="Submissions">
                <SubmissionsPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/peer-review"
        element={
          <ProtectedRoute>
            <RoleRoute expectedRole="student">
              <AppShell title="Peer Review">
                <PeerReviewPage />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <AppShell title="Progress">
              <ProgressPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppShell title="Settings">
              <ProfileSettingsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
