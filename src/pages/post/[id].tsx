import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "~/components/layout";
import { api } from "~/utils/api";

import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { PostView } from "~/components/postview";

dayjs.extend(relativeTime);

const SinglePostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data } = api.posts.getById.useQuery({
    postId,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const ssg = generateSSGHelper();

  const postId = ctx.params?.id;

  if (typeof postId !== "string") throw new Error("No post id");

  await ssg.posts.getById.prefetch({ postId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      postId,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SinglePostPage;
