const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    interest: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    organization: { type: String, default: "", trim: true },
    designation: { type: String, default: "", trim: true },
    linkedin: { type: String, default: "", trim: true },
    about: { type: String, default: "", trim: true },
    jobId: { type: String, default: "", trim: true },
    jobTitle: { type: String, default: "", trim: true },
    jobLocation: { type: String, default: "", trim: true },
    jobLineOfService: { type: String, default: "", trim: true },
    resumeUrl: { type: String, default: "", trim: true },
    resumeName: { type: String, default: "", trim: true },
    read: { type: Boolean, default: false },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

careerApplicationSchema.index({ createdAt: -1 });
careerApplicationSchema.index({ read: 1 });

module.exports =
  mongoose.models.CareerApplication ||
  mongoose.model("CareerApplication", careerApplicationSchema);
