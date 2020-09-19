import Project from "../models/projects";
import error_types from "./error_types";
import emailService from "../service/email-service";
import User from "../models/user";
import emailTemplate from "../emailTemplates/emailTemplates";
import moment from "moment";
import Room from "../models/room";

const controller = {
  create: async (req, res, next) => {
    try {
      let query = await Project.findOne({ $and: [{ title: req.body.title, active: true, organization:req.body.organization }] });
      if (query) {
        res.json({ message: "The project already exists" });
      } else {
        const user = await User.find({
          _id: req.body.members
        });
        req.body.members.push(req.user._id);
        const newProject = new Project({
          title: req.body.title,
          description: req.body.description,
          owner: req.user._id,
          members: req.body.members,
          organization: req.body.organization,
          createDate: moment()
        });
        const project = await newProject.save();
        var emailToSend = [];
        user.forEach((element) => {
          emailToSend.push(element.email);
        });
        if (emailToSend !== []) {
          emailService.sendMail(emailTemplate.inviteProject(project.title), emailToSend).catch(value => {
            console.log(value)
          })
        }
        res.send(project)
      }
    } catch (err) {
      next(err);
    }
  },
  searchById: async (req, res, next) => {
    try {
      const project = await Project.findById(req.params.id)
        .populate([{
          path: 'owner',
          select: ['email']
        }, {
          path: 'members',
          select: ['email']
        }]);
      if (project.active === false) {
        throw new error_types.InfoError('Project not found');
      } else {
        res.send(project);
      }
    } catch (err) {
      next(err);
    }
  },
  search: async (req, res, next) => {
    try {
      const projects = await Project.find({active: true,organization:req.params.id,$or: [{owner: req.user._id}, {members: req.user._id}]})
        .populate([{
          path: 'owner',
          select: ['email']
        }, {
          path: 'members',
          select: ['email']
        }])
        .select('-active -createDate -__v');
      res.send(projects);

    } catch (err) {
      next(err);
    }
  },
  searchMyProjects: async (req, res, next) => {
    try {
      const projects = await Project.find({
        active: true,
        owner: req.user._id
      })
        .populate([{
          path: 'owner',
          select: ['email']
        }, {
          path: 'members',
          select: ['email']
        }])
        .select('-active -createDate -__v');
      res.send(projects);
    } catch (err) {
      next(err);
    }
  },
  searchProjectsMembers: async (req, res, next) => {
    try {
      const projects = await Project.find({
        active: true,
        members: req.user._id
      })
        .populate([{
          path: 'members',
          select: ['email']
        }, {
          path: 'members',
          select: ['email']
        }])
        .select('-active -createDate -__v');
      res.send(projects);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      switch (req.body.typeUpdate) {
            case "update":
                  const projectSearch = await Project.findOne({ _id: req.params.id });
                  if (projectSearch.owner == req.body.idUser) {
                    const project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body.data, { new: true });
                    res.send(project);
                  } else {
                    res.json({ message: "Only the owner can Update the Project" });
                  }
                  break;
            case "delete":
                  const project = await Project.findOne({ _id: req.params.id });
                  const room = await Room.find({ projectId: req.params.id })
                  room.map(element => {
                    element.active = false;
                    element.deleted = Date.now();
                    element.userDelete = req.body.idUser
                  })
                  if (!project.active) {
                    res.json({ message: "The Project has already been removed" });
                    if (room.length > 0) {
                      room.map(element => {
                        Room.findOneAndUpdate({ _id: element._id }, element).then((err, res) => {
                          if (err) { console.log(err) }
                          else { console.log(res) }
                        });
                      })
                    }
                  } else {
                    if (project.owner == req.body.idUser) {
                      project.active = false;
                      await project.save();
                      res.json({ message: "Project removed" });
                      if (room.length > 0) {
                        room.map(element => {
                          Room.findByIdAndUpdate({ _id: element._id }, element).then((res) => {
                            console.log(res)
                          });
                        })
                      }
                    } else {
                      res.json({message: "Only the owner can delete the Project"});
                    }
                  }
                  break;
            case "leaveProject":
              const reserchProject = await Project.findOne({ _id: req.params.id });
              if (reserchProject.owner == req.body.idUser) {
                reserchProject.owner= reserchProject.members[0];
                reserchProject.members.remove(req.body.idUser);
                await reserchProject.save();
                res.json({ message: "User removed" });
              } else {
                reserchProject.members.remove(req.body.idUser);
                await reserchProject.save();
                res.json({ message: "User removed" });
              }
              break;
            default:
                res.json({ message: "Debe indicar el tipo de update" });
                break;
      }
    } catch (err) {
      next(err);
    }
  }
};

export default controller;