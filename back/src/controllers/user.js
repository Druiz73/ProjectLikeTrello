import User from '../models/user';

const controller = {
    search: async(req, res, next) => {
        try{
            const users = await User.find({ email: {
                '$regex': new RegExp(req.params.text, "i")
            }}).select('_id email')
            res.send(users);
        } catch (err) {
            next(err);
          }             
    }
}
 
export default controller;
