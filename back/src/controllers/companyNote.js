import CompanyNote from '../models/companyNote';
import Organization from '../models/organization';
import error_types from "./error_types";
import moment from "moment";

const controller = {
    add: async (req, res, next) => {
        try {
            const organization= await Organization.findById(req.body.organization);
            const user= new String(req.user._id);
            if (organization.owner==user.toString()) {
                const newNote = new CompanyNote({
                    organization: req.body.organization,
                    createDate: moment(),
                    updateDate: moment()
                });
                const nota = await newNote.save();
                res.json({ data: nota });
            } else {
                throw new error_types.InfoError("you must have the Admin role to do this task");
            }
        } catch (err) {
            next(err);
        }
    },
    searchById: async (req, res, next) => {
        try {
                const note = await CompanyNote.findById(req.params.id).populate([{ path: 'organization', select: ['name'] }]);
                if (note.active === false) {
                    throw new error_types.InfoError(
                        "Note not found"
                    );
                } else {
                    res.send(note);
                }
        } catch (err) {
            next(err);
        }
    },
    search: async (req, res, next) => {
        try {
            const notes = await CompanyNote.find({ active: true, organization: req.params.id })
                .populate([{ path: 'organization', select: ['name'] }]);
            res.send(notes);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const organization= await Organization.findById(req.body.organization);
            const user= new String(req.user._id);
            if (organization.owner==user.toString()) {
                switch (req.body.typeUpdate) {
                    case "update":
                        const body = req.body;
                        body.updateDate = moment();
                        const noteUpdate = await CompanyNote.findOneAndUpdate({ _id: req.params.id }, body, { new: true });
                        res.send(noteUpdate);
                        break;
                    case "updateCoordinates":
                        const noteUpdateCoordinates = await CompanyNote.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
                        res.send(noteUpdateCoordinates);
                        break;
                    case "delete":
                        const noteDelete = await CompanyNote.findOne({ _id: req.params.id });
                        noteDelete.active = false;
                        await noteDelete.save();
                        res.json({ message: "Note removed" });
                        break;
                    default:
                        res.json({ message: "Debe indicar el tipo de update" });
                        break;
                }
            } else {
                throw new error_types.InfoError("you must have the Admin role to do this task");
            }
        } catch (err) {
            next(err);
        }
    }
}

export default controller;