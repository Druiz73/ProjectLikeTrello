import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

//Components
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Register from "./components/Register/Register";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import SucccessLogin from "./components/SuccessLogin/SuccessLogin";
import Project from './components/Project/Project';
import DailyRoom from './components/DailyRoom/DailyRoom';
import BreadcrumbCnt from './components/BreadcrumbCnt/BreadcrumbCnt';
import LudicRoom from './components/LudicRoom/LudicRoom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import SelectOrganization from './components/SelectOrganization/SelectOrganization';
import CreateOrganization from './components/CreateOrganization/CreateOrganization';
import JoinOrganization from './components/JoinOrganization/JoinOrganization';

//States
import AuthState from "./context/auth/authState";
import NoteState from './context/notes/noteState';
import ProjectsState from './context/projects/projectsState';
import NotificationsState from './context/notifications/notificationsState';
import FileState from './context/file/fileState';
import NotesCompanyState from './context/notesCompany/notesCompanyState';
import OrganizationState from './context/organizations/organizationState';

//Utils
import authToken from "./config/authToken";

const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  return (
    <HelmetProvider>
     <OrganizationState>
        <AuthState>
          <FileState>
            <NotesCompanyState>
              <NoteState>
                <ProjectsState>
                  <NotificationsState>
                    <Router>
                      <Layout>
                        <BreadcrumbCnt>
                          <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/forgot-password' component={ForgotPassword} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/change-password/:token' component={ChangePassword} />
                            <Route exact path='/success-login' component={SucccessLogin} />
                            <PrivateRoute exact path='/dashboard/:id' component={Dashboard} />
                            <PrivateRoute exact path='/project/:id' component={Project} />
                            <PrivateRoute exact path='/daily/:id' component={DailyRoom} />
                            <PrivateRoute exact path='/organization' component={SelectOrganization} />
                            <PrivateRoute exact path='/create-organization' component={CreateOrganization} />
                            <PrivateRoute exact path="/join-organization" component={JoinOrganization} />
                            <Route exact path='/ludic' component={LudicRoom} />
                            <Route component={PageNotFound} />
                          </Switch>
                        </BreadcrumbCnt>
                      </Layout>
                    </Router>
                  </NotificationsState>
                </ProjectsState>
              </NoteState>
            </NotesCompanyState>
          </FileState>
        </AuthState>
     </OrganizationState>
    </HelmetProvider >
  );
}

export default App;
