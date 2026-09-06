const mongoose = require("mongoose");

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    enquiryType: { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true },
    source: { type: String, default: "contact", trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactSubmissionSchema.index({ createdAt: -1 });
contactSubmissionSchema.index({ read: 1 });

module.exports =
  mongoose.models.ContactSubmission ||
  mongoose.model("ContactSubmission", contactSubmissionSchema);
