import express from "express";
var router = express.Router();
import AuthMdw from '../middleware/custom';
import SampleController from '../controllers/sample';
import AuthController from '../controllers/auth';
import UserController from '../controllers/user';
import NoteController from '../controllers/note';
import CompanyNoteController from '../controllers/companyNote';
import ProjectController from '../controllers/project';
import RoomController from '../controllers/room'
import RoleController from '../controllers/role';
import DailyInfoController from '../controllers/dailyInfo.js';
import NotificationInfoController from '../controllers/notificationInfo';
import OrganizationController from '../controllers/organization';

import passport from 'passport';

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Organization
router.post('/organizations', AuthMdw.ensureAuthenticated, OrganizationController.add);
router.get('/organizations', AuthMdw.ensureAuthenticated, OrganizationController.searchMyOrganizations);
router.get('/organizations/:id', AuthMdw.ensureAuthenticated, OrganizationController.searchById);
router.put('/organizations/:id', AuthMdw.ensureAuthenticated, OrganizationController.update);


//Room
router.post('/addRoom',AuthMdw.ensureAuthenticated, RoomController.create);
router.put('/updateRoom/:id',AuthMdw.ensureAuthenticated, RoomController.update);
router.get('/user/Rooms',AuthMdw.ensureAuthenticated, RoomController.search);
router.get('/user/listRoomsInProject/:id',AuthMdw.ensureAuthenticated, RoomController.listRoomsInProject);
router.get('/RoombyId/:id',AuthMdw.ensureAuthenticated, RoomController.searchById);
router.get('/searchMyRooms/:id',AuthMdw.ensureAuthenticated, RoomController.searchMyRooms);
router.put('/deleteRoom/:id',AuthMdw.ensureAuthenticated, RoomController.delete);

//Authentication
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post("/recovery", AuthController.recovery);
router.get("/confirmToken/:token", AuthController.confirmToken);
router.put("/updatePassword/:token", AuthController.updatePassword);
router.get('/test', SampleController.unprotected);
router.get('/protected', AuthMdw.ensureAuthenticated, SampleController.protected);
router.get('/auth/google', passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/userinfo.profile',
'https://www.googleapis.com/auth/userinfo.email'] }));
router.get('/auth/google/callback', AuthController.loginGoogle);

//note
router.post('/notes',AuthMdw.ensureAuthenticated, NoteController.add);
router.get('/notes',AuthMdw.ensureAuthenticated, NoteController.search);
router.get('/notes/:id',AuthMdw.ensureAuthenticated, NoteController.searchById);
router.put('/notes/:id',AuthMdw.ensureAuthenticated, NoteController.update);


//companyNote
router.post('/companyNotes',AuthMdw.ensureAuthenticated, CompanyNoteController.add);
router.get('/organization/:id/companyNotes',AuthMdw.ensureAuthenticated, CompanyNoteController.search);
router.get('/companyNotes/:id',AuthMdw.ensureAuthenticated, CompanyNoteController.searchById);
router.put('/companyNotes/:id',AuthMdw.ensureAuthenticated, CompanyNoteController.update);


//project
router.post("/projects",AuthMdw.ensureAuthenticated, ProjectController.create);
router.put('/projects/:id',AuthMdw.ensureAuthenticated, ProjectController.update);
router.get('/organization/:id/projects',AuthMdw.ensureAuthenticated, ProjectController.search);
router.get('/projects/:id',AuthMdw.ensureAuthenticated, ProjectController.searchById);
router.get('/myProjects',AuthMdw.ensureAuthenticated, ProjectController.searchMyProjects);
router.get('/projectsMembers',AuthMdw.ensureAuthenticated, ProjectController.searchProjectsMembers);

//user
router.get('/users/:text',AuthMdw.ensureAuthenticated, UserController.search);

//role
router.post('/addRole',AuthMdw.ensureAuthenticated, RoleController.add);
router.get('/Roles',AuthMdw.ensureAuthenticated, RoleController.search);
router.get('/RolebyId/:id',AuthMdw.ensureAuthenticated, RoleController.searchById);
router.put('/updateRole/:id',AuthMdw.ensureAuthenticated, RoleController.update);
router.delete('/deleteRole/:id',AuthMdw.ensureAuthenticated, RoleController.delete);

//DailyInfo
router.post('/addDailyInfo',AuthMdw.ensureAuthenticated, DailyInfoController.add);
//router.get('/reportDaily/:id',AuthMdw.ensureAuthenticated, DailyInfoController.reportDaily);
router.get('/timeOfEntryByUser',AuthMdw.ensureAuthenticated, DailyInfoController.timeOfEntryByUser);
router.get('/dailyDuration/:roomId/byDate/:dateDaily',AuthMdw.ensureAuthenticated, DailyInfoController.dailyDuration);
router.get('/dailyParticipants/:roomId/byDate/:dateDaily',AuthMdw.ensureAuthenticated, DailyInfoController.reportDaily);
router.get('/dailyParticipantsActive/:roomId/byDate/:dateDaily',AuthMdw.ensureAuthenticated, DailyInfoController.reportDailyActive);
router.get('/dailyParticipantsInactive/:roomId/byDate/:dateDaily',AuthMdw.ensureAuthenticated, DailyInfoController.reportDailyNotActive);

//NotificationInfo
router.post('/addNotificationInfo',AuthMdw.ensureAuthenticated, NotificationInfoController.add);

export default router;
