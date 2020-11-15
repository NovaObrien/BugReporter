import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema({
  closed: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: 'No Description Available'
  },
  title: {
    type: String,
    required: true
  },
  reportedBy: {
    type: String,
    required: true,
    ref: 'Profile'

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

export default Bug
