import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../App.jsx';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute.jsx';
import { GuestRoute } from '../components/ProtectedRoute/GuestRoute.jsx';
import { LoginPage } from '../pages/LoginPage/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage/SignupPage.jsx';
import { DashboardPage } from '../pages/DashboardPage/DashboardPage.jsx';
import { CoursePage } from '../pages/CoursePage/CoursePage.jsx';
import { LessonPage } from '../pages/LessonPage/LessonPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage.jsx';
import { RouteError } from '../pages/NotFoundPage/RouteError.jsx';

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        element: <GuestRoute />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'courses/:trackId', element: <CoursePage /> },
          { path: 'courses/:trackId/lessons/:lessonId', element: <LessonPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
