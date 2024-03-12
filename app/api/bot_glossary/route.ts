import { NextResponse } from "next/server";

const glossary = [
  {
    id: 1,
    attributes: {
      name: "Accelerated Mobile Pages",
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
    },
  },
  {
    id: 2,
    attributes: {
      name: "Ad impression",
      createdAt: "2024-02-23T09:56:15.400Z",
      updatedAt: "2024-02-23T09:58:47.049Z",
      publishedAt: "2024-02-23T09:58:47.048Z",
    },
  },
  {
    id: 3,
    attributes: {
      name: "Bid request",
      createdAt: "2024-02-23T14:21:47.981Z",
      updatedAt: "2024-02-23T14:21:59.832Z",
      publishedAt: "2024-02-23T14:21:59.831Z",
    },
  },
  {
    id: 4,
    attributes: {
      name: "Ad network",
      createdAt: "2024-02-23T14:22:54.843Z",
      updatedAt: "2024-02-23T14:23:21.366Z",
      publishedAt: "2024-02-23T14:23:21.363Z",
    },
  },
];
export async function GET(req: Request) {
  try {
    return NextResponse.json(glossary);
  } catch (error) {
    console.error("Strapi Error:", error);
    throw new Error("Failed to fetch all glossaries.");
  }
}
