import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  version: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const version = fs.readFileSync("version").toString();
  res.status(200).json({ version });
}
