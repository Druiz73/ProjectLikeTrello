import Role from '../models/role';


const controller = {
    add: async (req, res, next) => {
        try {
            const newRole = new Role({
                description: req.body.description,
                nivel: req.body.nivel
            });
            const role = await newRole.save();
            res.json({ data: role });
        } catch (err) {
            next(err);
        }
    },
    searchById: async (req, res, next) => {
        try {
            const role = await Role.findById(req.params.id);
              res.send(role);
        } catch (err) {
            next(err);
        }
    },
    search: async (req, res, next) => {
        try {
            const roles = await Role.find();
            res.send(roles);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const role = await Role.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.send(role);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const role = await Role.findByIdAndRemove({ _id: req.params.id });
            res.json({ message: "Role removed" });
        } catch (err) {
            next(err);
        }
    },
}

export default controller;