const {Dashboard} = require('../models/Dashboard')

const postDashboard = (req, res, next) => {
    const {name, description} = req.body.data;
    const dashboard = new Dashboard({
        name,
        description,
        assigned_to: req.user.userId,
    })
    if (!name) {
        return res.status(400).send({
            message: 'Please write your name'
        })
    }
    if (!description) {
        return res.status(400).send({
            message: 'Please write your description'
        })
    }
    dashboard.save()
        .then(() => res.json({
            dashboard
        }))
        .catch(err => {
            next(err);
        });
}

async function getUserDashboards(req, res) {
    return Dashboard.find().then((result) => {
        let arr = []
        result.forEach((element) => {
            if (req.user.userId === element.assigned_to.toString()) {
                arr.push(element)
            }
        })
        res.status(200).send({
            dashboards: arr
        })
    });
}

async function getDashboardById(req, res) {
    const dashboard = await Dashboard.findById(req.params.id);
    return dashboard.save().then(() => {
        res.status(200).send({
            id: dashboard._id,
            name: dashboard.name,
            description: dashboard.description,
            created_date: dashboard.created_date,
            updatedAt: dashboard.updatedAt


        })
    });
}

async function patchDashboard(req, res) {
    const dashboard = await Dashboard.findById(req.params.id);
    dashboard.name = req.body.name
    dashboard.description = req.body.description
    return dashboard.save().then(() => {
        res.status(200).send({
            "message": `Dashboard status with id ${dashboard._id}, changed successfully`
        })
    });
}

async function deleteDashboardById(req, res) {
    return await Dashboard.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send({
                "message": "todo deleted successfully"
            });
        })
}

module.exports = {
    getUserDashboards,
    postDashboard,
    patchDashboard,
    getDashboardById,
    deleteDashboardById

}
