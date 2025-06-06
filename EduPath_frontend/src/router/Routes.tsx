import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Contact from "../pages/Contact";
import Login from "../pages/user/Login";
import About from "../pages/About";
import AdminDashboard from "../pages/user/admin/AdminDashboard";
import LecturerDashboard from "../pages/user/lecturer/LecturerDashboard";
import StudentDashboard from "../pages/user/student/StudentDashboard";
import Enroll from "../pages/user/student/Enroll";
import ManageUsers from "../pages/user/admin/ManageUsers";
import ManageAccount from "../pages/user/ManageAccount";
import ManageCourses from "../pages/user/lecturer/ManageCourses";
import CourseDashboard from "../pages/user/CourseDashboard";
import AssignmentDetails from "../pages/user/AssignmentDetails";
import Unauthorized from "../pages/Unauthorized";



export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: 'about', element: <About />},
            {path: 'contact', element: <Contact />},
            {path: 'login', element: <Login />},
            {path: 'unauthorized', element: <Unauthorized />},
            // Authenticated routes
            {path: 'admin/dashboard', element: <AdminDashboard />},
            {path: 'admin/manage-users', element: <ManageUsers />},
            {path: 'lecturer/dashboard', element: <LecturerDashboard />},
            {path: 'lecturer/manage-courses', element: <ManageCourses />},
            {path: 'lecturer/course/:courseId', element: <CourseDashboard />},
            {path: 'lecturer/course/:courseId/assignment/:assignmentId', element: <AssignmentDetails />},
            {path: 'student/dashboard', element: <StudentDashboard />},
            {path: 'student/enroll', element: <Enroll />},
            {path: 'settings', element: <ManageAccount />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
]

export const router = createBrowserRouter(routes);