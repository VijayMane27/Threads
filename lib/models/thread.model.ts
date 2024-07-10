import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  created_at: { type: Date, default: Date.now },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" }, // Update here
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
