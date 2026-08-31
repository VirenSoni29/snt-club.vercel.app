import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  event: string;
  email: string;
  rollNo: string;
  name: string;
  deviceId: string;
  distanceFromVenue: number;
  rating: number;
  feedback: string;
  submittedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    event: { type: String, required: true, lowercase: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    rollNo: { type: String, required: true, uppercase: true, trim: true },
    name: { type: String, required: true },
    deviceId: { type: String, required: true, index: true },
    distanceFromVenue: { type: Number, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    feedback: { type: String, trim: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Compound Unique Indexes:
// 1. One attendance per email per event
AttendanceSchema.index({ event: 1, email: 1 }, { unique: true });
// 2. One attendance per physical device per event
AttendanceSchema.index({ event: 1, deviceId: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);
