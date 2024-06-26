import Notifaction from '../models/Notification.js'

class Controller {
  get = (req, res, next) => 
    Notifaction.find({...req.query, user : req.user._id}).sort({createdAt : -1})
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  deleteById = (req, res, next) => 
    Notifaction.findById(req.params.id)
      .then(val => {
        if(val.user == req.user._id) return val.deleteOne()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

export default new Controller()