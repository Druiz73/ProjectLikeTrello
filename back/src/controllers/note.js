import Note from '../models/note';
import error_types from "./error_types";
import moment from "moment";

const controller = {
    add: async (req, res, next) => {
        try {
            const newNote = new Note({
                createBy: req.user._id,
                createDate: moment(),
                updateDate: moment()
            });
            const nota = await newNote.save();
            res.json({ data: nota });
        } catch (err) {
            next(err);
        }
    },
    searchById: async (req, res, next) => {
        try {
            const note = await Note.findById(req.params.id).populate([{ path: 'createBy', select: ['email'] }]);
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
            const notes = await Note.find({ active: true, createBy: req.user._id })
                .populate([{ path: 'createBy', select: ['email'] }]);
            res.send(notes);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            switch(req.body.typeUpdate){
                case "update":
                    const body = req.body;
                    body.updateDate = moment();
                    const noteUpdate = await Note.findOneAndUpdate({ _id: req.params.id }, body, { new: true });
                    res.send(noteUpdate);
                    break;
                case "updateCoordinates":
                    const noteUpdateCoordinates = await Note.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
                    res.send(noteUpdateCoordinates);
                    break;
                case "delete":
                    const noteDelete = await Note.findOne({ _id: req.params.id });
                    noteDelete.active = false;
                    await noteDelete.save();
                    res.json({ message: "Note removed" });
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
