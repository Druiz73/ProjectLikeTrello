import Notification from "../models/notificationInfo";


const controller = {
    add: async (req, res, next) => {
        try {
            const notification = await Notification.findOne({roomId: req.body.roomId,userId:req.user._id, dateDaily: req.body.dateDaily});
            if(notification){
                if(req.body.actionDiscard){
                    notification.actionDiscard = req.body.actionDiscard;
                    notification.hourDiscard = req.body.hourDiscard;
                }else if(req.body.actionPostpone){
                    notification.actionPostpone = req.body.actionPostpone;
                    notification.hourPostpone = req.body.hourPostpone;
                }
                notification.save();
                res.json({ data: notification });
            }else{
                const newNotification = new Notification({
                    roomId: req.body.roomId,
                    userId:req.user._id,
                    dateDaily: req.body.dateDaily,
                    actionDiscard: req.body.actionDiscard,
                    hourDiscard: req.body.hourDiscard,
                    actionPostpone: req.body.actionPostpone,
                    hourPostpone:req.body.hourPostpone
                });
                const notificationInfo = await newNotification.save();
                res.json({
                    data: notificationInfo
                });
            }
           
        } catch (err) {
            next(err);
        }
    }
  
}

export default controller;