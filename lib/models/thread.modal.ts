import mongoose from "mongoose";
import { Children } from "react";

const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  created_at: { type: Date, default: Date.now },
  parentID: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
