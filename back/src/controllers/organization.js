import organization from '../models/organization';
import User from '../models/user';
import error_types from "./error_types";
import moment from "moment";

const controller = {
    add: async (req, res, next) => {
        try {
            let membersAll = [];
            req.body.members.forEach(element => {
                console.log(element)
                membersAll.push({ email: element })
            });
            const user = await User.findById(req.user._id);
            let userAdmin = {
                email: user.email,
                active: true,
                rol: 'Admin'
            };
            membersAll.push(userAdmin);
            let nameOrg = req.body.name;
            let emailToSend = [];
            const queryOrg = await organization.findOne({ name: nameOrg }, { active: true })
            if (queryOrg) {
                res.json({
                    message: "The Organization already exists!"
                });
            } else {
                const newOrg = new organization({
                    name: req.body.name,
                    members: membersAll,
                    createDate: moment(),
                    updateDate: moment()
                });
                const org = await newOrg.save();
                res.json({ data: org });
                if (org.members !== []) {
                    org.members.forEach(element => {
                        emailToSend.push(element.email)
                    });
                }
                if (emailToSend !== []) {
                    emailService.sendMail(emailTemplate.inviteOrganization(nameOrg), emailToSend).catch(value => {
                        console.log(value)
                    })
                }
            }
        } catch (err) {
            next(err);
        }
    },
    searchById: async (req, res, next) => {
        try {
            const org = await organization.findById(req.params.id);
            if (org.active === false) {
                throw new error_types.InfoError(
                    "organization not found"
                );
            } else {
                res.send(org);
            }
        } catch (err) {
            next(err);
        }
    },
    searchMyOrganizations: async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id);
            console.log("user", user)
            const orgs = await organization.aggregate([
                {
                    $unwind: "$members"
                },
                {
                    $match: {
                        "active": true,
                        "members.email": user.email,
                        "members.active": true
                    }
                }
            ])
            res.send(orgs);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id);
            switch (req.body.typeUpdate) {
                case "update":
                    const body = req.body;
                    body.updateDate = moment();
                    const org = await organization.findOneAndUpdate({ _id: req.params.id }, body, { new: true });
                    res.send(org);
                    break;
                case "delete":
                    const orgDelete = await organization.findOne({ _id: req.params.id });
                    orgDelete.active = false;
                    await orgDelete.save();
                    res.json({ message: "org removed" });
                    break;
                case "activeUser":
                    const orgActive = await organization.findOne({ name: req.body.name });
                    if (!orgActive) {
                        throw new error_types.InfoError(
                            "Organization not found"
                        );
                    } else {
                        const userActive = await User.findById(req.user._id);
                        const search = orgActive.members.find(member => member.email === userActive.email);
                        if (!search) {
                            throw new error_types.InfoError(
                                "Has not been invited to the organization"
                            );
                        } else {
                            search.active = true;
                            const update = orgActive.members.map(member => member.email === search.email ? search : member);
                            orgActive.members = update;
                            await orgActive.save();
                            res.json({ message: "user active" });
                        }
                    }
                    break;
                case "deletedUser"://hacer deleted logico
                    const search = await orgActive.members.find(member => member.email === userActive.email);

                    break;
                case "updateRolUser":
                    let idOrg = req.params.id;
                    const emailUserToUpdate = req.body.email;
                    const newRole = req.body.role;
                    let Org = await organization.findById({ _id: idOrg })
                    const memberToUpdate = Org.members.filter(member => member.email == emailUserToUpdate && member.active == true)
                    if (memberToUpdate.length > 0) {
                        memberToUpdate[0].rol = newRole;
                        await Org.save();
                        res.json(Org);
                    } else {
                        res.json("miembro no encontrado")
                    }
                    break;
                case "addNewMember":
                    const id = req.params.id;//id de la organizacion
                    // const idNewmember = await User.findById(req.body.idNewmember);//id nuevo miembro
                    // console.log("member new", req.body.idNewmember)
                    let newMember = req.body.member;
                    const OrgToUp = await organization.findById({ _id: id })
                    OrgToUp.members.push(newMember);
                    console.log("org find", OrgToUp);
                    await OrgToUp.save();
                    res.json(OrgToUp);

                    break;
                default:
                    res.json({ message: "Debe indicar el tipo de update" });
                    break;
            }
        } catch (err) {
            next(err);
        }
    }
}

export default controller;