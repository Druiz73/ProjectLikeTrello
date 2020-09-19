import Daily from "../models/dailyInfo";
import Room from "../models/room";
import moment from "moment";
import error_types from "./error_types";


const controller = {
    add: async (req, res, next) => {
        try {
            const newDaily = new Daily({
                roomId: req.body.roomId,
                dateDaily: moment().format("MMM Do YY"),
                initDaily: req.body.initDaily,
                finishDaily: req.body.finishDaily,
                participantsDaily: req.body.participantsDaily
            });
            const daily = await newDaily.save();
            res.json({
                data: daily
            });
        } catch (err) {
            next(err);
        }
    },
    // entre fecha, de participantes
    reportDailybyDate: async (req, res, next) => {
        const dateInit = req.body.dateInit; // ejemplo: '2019/03/26'
        const dateEnd = req.body.dateEnd;
        const query = await Daily.find({
            roomId: req.params.id
        }, {
            $and: [{
                fecha: {
                    $gte: new Date(dateInit)
                }
            },
            {
                fecha: {
                    $lt: new Date(dateEnd)
                }
            }
            ]
        })
            .select("checked");
        let report = [];
        if (query.length > 0) {
            query.map(element => {
                if (element.checked === "yes") {
                    report.push(element)
                }
            })
            let percent = (report.length * 100) / query.length;
            let data = {
                "Colaboradores_en_Total": query.length,
                "Colaboradores_que_Participaron": report.length,
                "Porcentaje_de_Participacion": parseInt(percent)
            }
            res.json({
                data
            })
        } else {
            res.json({
                message: "no se encontro datos dentro de las fechas enviadas"
            })
        }
    },
    reportDaily: async (req, res, next) => {
        try {
            const dailyInfo = await Daily.findOne({ roomId: req.params.roomId, dateDaily: req.params.dateDaily });
            if (dailyInfo) {
                const lengthparticipant = dailyInfo.participantsDaily.length;
                const room = await Room.findOne({ _id: req.params.roomId });
                const lengthmembers = room.members.length;
                const porcentage = (lengthparticipant * 100) / lengthmembers;
                let data = {
                    "Total Participantes Invitados": lengthmembers,
                    "Total Participantes que se unieron": lengthparticipant,
                    "Porcentaje de Participación": porcentage.toFixed(2) + "%"
                }
                res.json({ data });
            } else {
                throw new error_types.InfoError("Not daily found with that data.");
            }
        } catch (err) {
            next(err);
        }
    },
    reportDailyActive: async (req, res, next) => {
        try {
            const dailyInfo = await Daily.findOne({ roomId: req.params.roomId, dateDaily: req.params.dateDaily });
            if (dailyInfo) {
                const lengthparticipant = dailyInfo.participantsDaily.length;
                let report = [];
                if (lengthparticipant > 0) {
                    dailyInfo.participantsDaily.map(element => {
                        if (element.checked === "yes") {
                            report.push(element)
                        }
                    })
                    const porcentage = (report.length * 100) / lengthparticipant;
                    let data = {
                        "Total Participantes Daily": lengthparticipant,
                        "Total Participantes activos": report.length,
                        "Porcentaje de Participación activa": porcentage.toFixed(2) + "%"
                    }
                    res.json({ data });
                } else {
                    res.json({
                        message: "Not data found"
                    })
                }
            } else {
                throw new error_types.InfoError("Not daily found with that data.");
            }
        } catch (err) {
            next(err);
        }
    },
    reportDailyNotActive: async (req, res, next) => {
        try {
            const dailyInfo = await Daily.findOne({ roomId: req.params.roomId, dateDaily: req.params.dateDaily });
            if (dailyInfo) {
                const lengthparticipant = dailyInfo.participantsDaily.length;
                let report = [];
                if (lengthparticipant > 0) {
                    dailyInfo.participantsDaily.map(element => {
                        if (element.checked === "") {
                            report.push(element)
                        }
                    })
                    const porcentage = (report.length * 100) / lengthparticipant;
                    let data = {
                        "Total Participantes Daily": lengthparticipant,
                        "Total Participantes inactivos": report.length,
                        "Porcentaje de Participación inactiva": porcentage.toFixed(2) + "%"
                    }
                    res.json({ data });
                } else {
                    res.json({
                        message: "Not data found"
                    })
                }
            } else {
                throw new error_types.InfoError("Not daily found with that data.");
            }
        } catch (err) {
            next(err);
        }
    },
    timeOfEntryByUser: async (req, res, next) => {
        try {
            const query = await Daily.findOne({ roomId: req.body.roomId, dateDaily: req.body.dateDaily });
            if (query) {
                const participant = query.participantsDaily.find(participant => participant.userId === req.body.userId);
                if (!participant) {
                    throw new error_types.InfoError("The user did not participate in the daily");
                } else {
                    const timeOfEntry = moment(participant.timeofentry);
                    const initDaily = moment(query.initDaily)
                    if (timeOfEntry.isBefore(initDaily)) {
                        const diff = initDaily.subtract(timeOfEntry);
                        res.json({ result: "El usuario ingreso " + diff.minutes() + " minutos antes que comenzó la Daily" });
                    } else {
                        const diff = timeOfEntry.subtract(initDaily);
                        if (diff.minutes() === 0) {
                            res.json({ result: "El usuario ingreso puntual a la Daily" });
                        } else {
                            res.json({ result: "El usuario ingreso " + diff.minutes() + " minutos después que comenzó la Daily" });
                        }
                    }
                }
            } else {
                throw new error_types.InfoError("Not daily found with that data.");
            }

        } catch (err) {
            next(err);
        }
    },
    dailyDuration: async (req, res, next) => {
        try {
            const query = await Daily.findOne({ roomId: req.params.roomId, dateDaily: req.params.dateDaily });
            if (query) {
                const init = moment(query.initDaily);
                const finish = moment(query.finishDaily);
                const diff = finish.subtract(init);
                res.json({ result: "La Daily duró: " + diff.minutes() + " minutos" });
            } else {
                throw new error_types.InfoError("Not daily found with that data.");
            }
        } catch (err) {
            next(err);
        }
    }
}

export default controller;