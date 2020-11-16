import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema({
  closed: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'Open'
  },
  description: {
    type: String,
    default: 'No Description Available'
  },
  createdBy: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true,
    ref: 'Profile'
  },
  closedBy: {
    type: String
  },
  closedDate: {
    type: Date

  }
}, { timestamps: true, toJSON: { virtuals: true } })

Bug.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
// Bug.virtual('reported', {
//   localField: 'reportedBy',
//   ref: 'Profile',
//   foreignField: 'name',
//   justOne: true
// })

export default Bug
