import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = ({ post, author }: PostWithUser) => {
  return (
    <div className="flex gap-3 border-b border-slate-400 p-8">
      <Link href={`/@${author.username}`}>
        <Image
          className="h-14 w-14 rounded-full"
          src={author.profileImageUrl}
          width={56}
          height={56}
          alt={`@${author.username}'s profile picture`}
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex gap-1.5 text-slate-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username}`}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span>·</span>
            <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};
