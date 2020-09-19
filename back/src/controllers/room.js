import Room from '../models/room';
import Project from '../models/projects';
import moment from "moment";
import emailService from "../service/email-service";
import emailTemplate from "../emailTemplates/emailTemplates";
import User from "../models/user";

const controller = {
    create: async (req, res, next) => {
        try {
            if (req.body.dayOfDaily.length == 0) {
                res.json({
                    message: "days of the meeting can not be empty"
                });
            } else {
                function bara(length) {
                    var result = '';
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                }
                let thisNameRoom = '';
                if (req.body.nameRoom == '') {
                    let random = bara(8);
                    const query = await Project.findOne({ active: true, _id: req.body.projectId });
                    thisNameRoom = 'PROJECT: ' + query.title + '. ' + 'DAILY ROOM: ' + random;
                } else {
                    thisNameRoom = req.body.nameRoom;
                }
                let queryRoom = await Room.findOne({ nameRoom: thisNameRoom, projectId: req.body.projectId, active: true });
                if (queryRoom) {
                    res.json({
                        message: "The Room already exists!"
                    });
                } else {
                    const user = await User.find({
                        _id: req.body.members
                    })
                    const newRoom = new Room({
                        nameRoom: thisNameRoom,
                        createBy: req.user._id,
                        typeRoom: req.body.typeRoom,
                        createDate: moment().format('LLLL'),
                        active: req.body.active,
                        members: req.body.members,
                        dayOfDaily: req.body.dayOfDaily,
                        timeZone: req.body.timeZone,
                        projectId: req.body.projectId,
                        initHourOfDaily: req.body.initHourOfDaily,
                        link: req.body.link
                    });
                    newRoom.members.push(newRoom.createBy);
                    const room = await newRoom.save();
                    var emailToSend = [];
                    user.forEach((element) => {
                        emailToSend.push(element.email);
                    });
                    if (emailToSend !== []) {
                        emailService.sendMail(emailTemplate.inviteRoom(room.nameRoom), emailToSend).catch(value => {
                            console.log(value)
                        })
                    }
                    res.send(room);
                }
            }
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const body = req.body;
            body.updateDate = moment().format('LLLL');
            const room = await Room.findOneAndUpdate({
                _id: req.params.id
            }, body, {
                new: true
            });
            res.send(room);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const room = await Room.findOne({ _id: req.params.id });
            const project = await Project.findOne({ _id: room.projectId });
            const user= new String(req.user._id);
            if (room.createBy == user.toString() || project.owner == user.toString()) {
                room.active = false;
                room.deleted = moment().format('LLLL');
                room.save();
                res.json({message: "Room removed"});
            } else {
                res.json({ message: "Only the Admin or Creator can delete the room" });
            }
        } catch (err) {
            next(err);
        }
    },
    search: async (req, res, next) => {
        try {
            const room = await Room.find({
                active: true,
                createBy: req.user._id
            })
                .populate([{
                    path: 'createBy',
                    select: ['nameRoom']
                }]);
            res.send(room);
        } catch (err) {
            next(err);
        }
    },
    listRoomsInProject: async (req, res, next) => {
        try {
            const projectsRooms = await Room.find({
                active: true,
                projectId: req.params.id
            })
                .populate([{
                    path: 'projectId',
                    select: ['title', 'description']
                }])
                .populate([{
                    path: 'members',
                    select: ['email']
                }])
                .select('-active -createDate -__v');
            res.send(projectsRooms);
        } catch (err) {
            next(err);
        }
    },
    searchById: async (req, res, next) => {
        try {
            const room = await Room.findById(req.params.id)
                .populate([{
                    path: 'projectId',
                    select: ['title', 'description']
                }])
                .populate([{
                    path: 'members',
                    select: ['email']
                }])
            if (room.active === false) {
                throw new error_types.InfoError(
                    "room not found"
                );
            } else {
                res.send(room);
            }
        } catch (err) {
            next(err);
        }
    },
    searchMyRooms: async (req, res, next) => {
        try {
            const room = await Room.find({
                active: true,
                members: req.user._id
            })
                .select('nameRoom nameRoom dayOfDaily initHourOfDaily');
            let roomToday = [];
            room.map(element => {
                if (element.dayOfDaily.includes(moment().day())) {
                    roomToday.push(element);
                }
            });
            res.send(roomToday);
        } catch (err) {
            next(err);
        }
    }
}

export default controller;