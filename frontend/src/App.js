import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy imports
const Homepage = lazy(() => import("./components/Homepage"));
const SignIn = lazy(() => import("./components/SignIn"));
const SignUp = lazy(() => import("./components/SignUp"));
const UserDash = lazy(() => import("./components/UserDash"));
const CreateTicket = lazy(() => import("./components/CreateTicket"));
const ViewMyTickets = lazy(() => import("./components/ViewMyTickets"));
const TicketDetails = lazy(() => import("./components/TicketDetails"));
const AdminDash = lazy(() => import("./components/AdminDash"));
const ViewEmployeeTickets = lazy(() =>
  import("./components/ViewEmployeeTickets")
);
const EmployeeTicketDetails = lazy(() =>
  import("./components/EmployeeTicketDetails")
);

// Optional: You can create or import a loader component
const Loader = () => <div>Loading...</div>;

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userpage/:userId" element={<UserDash />} />
          <Route path="/employeepage/:userId" element={<AdminDash />} />
          <Route
            path="/userpage/:userId/create-ticket"
            element={<CreateTicket />}
          />
          <Route
            path="/userpage/:userId/view-tickets"
            element={<ViewMyTickets />}
          />
          <Route
            path="/userpage/:userId/view-tickets/:ticketId/details"
            element={<TicketDetails />}
          />
          <Route
            path="/employeepage/:userId/view-tickets"
            element={<ViewEmployeeTickets />}
          />
          <Route
            path="/employeepage/:userId/view-tickets/:ticketId/details"
            element={<EmployeeTicketDetails />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
