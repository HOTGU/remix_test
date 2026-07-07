import Container from "~/components/global/Container";
import { getDb } from "~/libs/db.server";
import type { Portfolio } from "~/schemas/portfolio.server";
import { useLoaderData } from "react-router";

export const loader = async () => {
  const db = await getDb();

  const portfolios = await db
    .collection<Portfolio>("Portfolio")
    .find()
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  return { portfolios };
};

const portfolio = () => {
  const { portfolios } = useLoaderData<typeof loader>();
  return (
    <div className="w-full h-full">
      <Container>
        <div className="w-full h-screen"></div>
      </Container>
      <div className="w-full h-screen bg-white "></div>
    </div>
  );
};

export default portfolio;
