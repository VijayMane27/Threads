"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.modal";
import User from "../models/user.model";
import { connectToDB } from "../mongooes";

interface params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: params) {
  try {
    connectToDB();

    const createThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // update user model

    await User.findByIdAndUpdate(author, {
      $push: {
        threads: createThread._id,
      },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new error(`error crearting Thread: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // calculate no.of postes to skip

  const skipAmount = (pageNumber - 1) * pageSize;

  // fetch the post that have no parents(top-level thread)
  const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({
      createdAt: "desc",
    })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postQuery.exec();

  const isNext = totalPostCount > skipAmount + posts.length;

  return { posts, isNext };
}
