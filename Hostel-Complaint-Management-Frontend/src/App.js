import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import OTPVerification from "./Components/login/OTPVerification";
import ChangePassword from "./Components/login/ChangePassword";
import Sidebar from "./Components/Student_Dashboard/Sidebar";
import RtSideBar from "./Components/RT_Dashboard/RT_SideBar";
import Navbar from "./Components/common/NavBar";
import StudentDashboard from "./Components/Student_Dashboard/Dashboard";
import ComplaintList from "./Components/RT_Dashboard/ComplaintList";
import ComplaintsPage from "./Components/Student_Dashboard/ComplaintTypeMenu";
import ComplaintForm from "./Components/Student_Dashboard/ComplaintForm";
import ComplaintStatusPage from "./Components/Student_Dashboard/ComplaintStatusPage";
import StatusBar from "./Components/Student_Dashboard/StatusBar";
import ProfileMenu from "./Components/Student_Dashboard/ProfileMenu";
import ProtectedRoute from "./Components/Student_Dashboard/ProtectedRoute";
import WardenSidebar from "./Components/Warden_Dashboard/Warden_Sidebar ";
import ListOfComplaints from "./Components/Warden_Dashboard/ListOfComplaints";
import RtDashboard from "./Components/RT_Dashboard/RtDashboard";
import RtGraph from "./Components/RT_Dashboard/RT_Graph";
import WardenDashboard from "./Components/Warden_Dashboard/WardenDashboard";
import EndUserList from "./Components/Warden_Dashboard/EndUserList";
import CCSideBar from "./Components/CC_Dashboard/CC_SideBar";
import HostelList from "./Components/CC_Dashboard/CC_HostelComplaintStatus";
import CCDashboard from "./Components/CC_Dashboard/CCDashboard";
import RTList from "./Components/CC_Dashboard/CC_RTAddRemove";
import WardenList from "./Components/CC_Dashboard/CC_WardenAddRemove";
import CCGraph from "./Components/CC_Dashboard/CC_GraphicalView";
import MunshiSidebar from "./Components/Munshi_Dashboard/Munshi_SideBar";
import MunshiComplaint from "./Components/Munshi_Dashboard/Munshi_Complaint";
import InfoSection from "./Components/login/InfoSection";
import LoginNavbar from "./Components/login/Login_Navbar";
import HomeBannerSection from "./Components/Home/HomeBannerSection";
// import HandlingComplaints from './Components/Home/HandlingComplaints'
import AboutUs from "./Components/About/AboutUs";
import ComplaintManagement from "./Components/About/ComplaintManagement";
import KeyFeatures from "./Components/About/KeyFeatures";
// import Overview from './Components/About/Overview';
import BestSystem from "./Components/Footer/BestSystem";
import NeedSupport from "./Components/Footer/NeedSupport";
import FooterSection from "./Components/Footer/FooterSection";
import CreateAccount from "./Components/Home/CreateAccount";
// import HomeComplaint from './Components/Home/HomeComplaint'
import KeyFeatureHome from "./Components/Home/KeyFeaturesHome";
import Login from "./Components/login/Login";
// import Services from './Components/Services/CarpenterComplaint'
// import ElectricalComplaint from './Components/Services/ElectricalComplaint'
// import InventoryComplaint from './Components/Services/InventoryComplaint'
// import MessComplaint from './Components/Services/MessComplaint'
// import PlumberComplaint from './Components/Services/PlumberComplaint'
import SASideBar from "./Components/Super_Admin Dashboard/SA_SideBar";
import SADashboard from "./Components/Super_Admin Dashboard/SA_Dashboard";
import SAHostel from "./Components/Super_Admin Dashboard/SA_Hostels";
import SAUsers from "./Components/Super_Admin Dashboard/SA_Users";
import SAMunshi from "./Components/Super_Admin Dashboard/SA_Munshi";
import SARt from "./Components/Super_Admin Dashboard/SA_RTAddRemove";
import SAWarden from "./Components/Super_Admin Dashboard/SA_WardenAddRemove";
import SAEndUser from "./Components/Super_Admin Dashboard/SA_EndUserList";
import SACC from "./Components/Super_Admin Dashboard/SA_CC";
import SAStudent from "./Components/Super_Admin Dashboard/SA_Student";
import EndUserDashboard from "./Components/EndUserDashboard/EndUserDashboard";
import EndUserSidebar from "./Components/EndUserDashboard/EndUser_Sidebar";
import ComplaintResolved from "./Components/EndUserDashboard/ComplaintResolved";
import { ToastContainer } from "react-toastify";
import MunshiDashboard from "./Components/Munshi_Dashboard/MunshiDashboard";
import CCHostels from "./Components/CC_Dashboard/CC_Hostels";


const App = () => {
  const [loggedInRegNo, setLoggedInRegNo] = useState(localStorage.getItem('registrationNo') || '');

  const [isProfileVisible, setProfileVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleProfileSidebar = () => {
    setProfileVisible((prevState) => !prevState);
  };

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          {/* Login Routes */}
          <Route
            path="/"
            element={
              <>
                <LoginNavbar />
                <HomeBannerSection />
                <CreateAccount />
                <KeyFeatureHome />
                {/* <HomeComplaint/> */}
                <NeedSupport />
                <FooterSection />
              </>
            }
          />
          <Route
            path="/aboutus"
            element={
              <>
                <AboutUs />
                <ComplaintManagement />
                <KeyFeatures />
                {/* <Overview/> */}
                <BestSystem />
                <NeedSupport />
                <FooterSection />
                <LoginNavbar />
              </>
            }
          />
          <Route
            path="/Login"
            element={
              <>
                <Login />
                <LoginNavbar />
              </>
            }
          />
          {/* <Route
            path="/services"
            element={
              <>
                <CarpenterComplaint/>
                <MessComplaint />
                <InventoryComplaint />
                <PlumberComplaint />
                <ElectricalComplaint />
                <OtherComplaint />
              </>
            }
          /> */}

          <Route 
          path="/verify-otp" 
          element={
            <>
          <OTPVerification />
          <LoginNavbar />
          </>
          } 
          />
          <Route 
          path="/change-password" 
          element={<>
                    <ChangePassword />
                    <LoginNavbar />
                    </>
          
          } />
          <Route
            path="/OTPVerification"
            element={
              <>
                <OTPVerification />
                
              </>
            }
          />

          {/* Student Dashboard Routes */}

          <Route
            path="/student-dashboard"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  <Navbar />
                  <StudentDashboard onProfileClick={toggleProfileSidebar} />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/complaints"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  <Navbar />
                  <ComplaintsPage />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/complaint-form"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  <Navbar />
                  <ComplaintForm />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
  path="/complaint-status"
  element={
    <>
      <ProtectedRoute>
        <Sidebar />
        <Navbar setSearchQuery={setSearchQuery} />
        <ComplaintStatusPage searchQuery={searchQuery} key={loggedInRegNo}/>
        <ProfileMenu isOpen={isProfileVisible} onClose={toggleProfileSidebar} />
      </ProtectedRoute>
    </>
  }
/>

          <Route
            path="/status-bar/:complaintId"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  <Navbar />
                  <StatusBar />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          {/* RT Dashboard Routes*/}

          <Route
            path="/rt-dashboard"
            element={
              <>
                <ProtectedRoute>
                  <RtSideBar />
                  <Navbar />
                  <RtDashboard onProfileClick={toggleProfileSidebar} />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/complaint-list"
            element={
              <>
                <ProtectedRoute>
                  <RtSideBar />
                  <Navbar setSearchQuery={setSearchQuery}/>
                  <ComplaintList searchQuery={searchQuery}/>
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/graphical-view"
            element={
              <>
                <ProtectedRoute>
                  <RtSideBar />
                  <Navbar />
                  <RtGraph />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          {/* Warden Dashboard Routes */}

          <Route
            path="/warden-dashboard"
            element={
              <>
                <ProtectedRoute>
                  <WardenSidebar />
                  <Navbar />
                  <WardenDashboard />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/complaints-lists"
            element={
              <>
                <ProtectedRoute>
                  <WardenSidebar />
                  <Navbar />
                  <ListOfComplaints />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/end-userlist"
            element={
              <>
                <ProtectedRoute>
                  <WardenSidebar />
                  <Navbar />
                  <EndUserList />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          {/* Munshi Dashboard */}
          <Route
            path="/Munshi-dashboard"
            element={
              <>
                <ProtectedRoute>
                  <MunshiSidebar />
                  <Navbar />
                  <MunshiDashboard />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/munshi-complaint"
            element={
              <>
                <ProtectedRoute>
                  <MunshiSidebar />
                  <Navbar />
                  <MunshiComplaint onProfileClick={toggleProfileSidebar} />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          {/* CC Dashboard */}
          <Route
            path="/CC-dashboard"
            element={
              <>
                <ProtectedRoute>
                  <CCSideBar />
                  <Navbar />
                  <CCDashboard />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/hostels-list"
            element={
              <>
                <ProtectedRoute>
                  <CCSideBar />
                  <Navbar />
                  <HostelList />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/rts-list"
            element={
              <>
                <ProtectedRoute>
                  <CCSideBar />
                  <Navbar />
                  <RTList />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/wardens-list"
            element={
              <>
                <ProtectedRoute>
                  <CCSideBar />
                  <Navbar />
                  <WardenList />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/graph-view/:name"
            element={
              <>
                <ProtectedRoute>
                  <CCSideBar />
                  <Navbar />
                  <CCGraph />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/cc-graph-view"
            element={
              <>
                <ProtectedRoute>
                  <CCSideBar />
                  <Navbar />
                  <CCHostels />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          {/* End USERS DASHBOARD */}
          <Route
            path="/enduser-dashboard"
            element={
              <>
                <ProtectedRoute>
                  <EndUserSidebar />
                  <Navbar />
                  <EndUserDashboard onProfileClick={toggleProfileSidebar} />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/endusers-listss"
            element={
              <>
                <ProtectedRoute>
                  <EndUserSidebar />
                  <Navbar />
                  <ComplaintResolved onProfileClick={toggleProfileSidebar} />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          {/* SuperAdmin Dashboard */}
          <Route
            path="/SuperAdmin-dashboard"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SADashboard onProfileClick={toggleProfileSidebar} />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/sa-hostels-list"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SAHostel />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/sa-users-list"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SAUsers />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/sa-wardens-list"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SAWarden />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/sa-rt-list"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SARt />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/sa-munshi-list"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SAMunshi />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/sa-end-users-list"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SAEndUser />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/sa-cc-list"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SACC />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/sa-students-list"
            element={
              <>
                <ProtectedRoute>
                  <SASideBar />
                  <Navbar />
                  <SAStudent />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/new_login"
            element={
              <>
                <ProtectedRoute>
                  <InfoSection />
                  <LoginNavbar />
                  <HomeBannerSection />
                  <ProfileMenu
                    isOpen={isProfileVisible}
                    onClose={toggleProfileSidebar}
                  />
                </ProtectedRoute>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
