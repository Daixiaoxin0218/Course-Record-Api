import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();
const port: number = 3000;

app.use(express.json());

app.post("/user/list", async (req, res) => {
  const { page, size } = req.body
  const totalCount = await prisma.user.count();
  const data = await prisma.user.findMany({
    skip: (page - 1) * size, // 计算需要跳过的记录数
    take: size, // 限制返回的记录数
    include: { posts: true },
  });
  res.json({
    data: {
      data,
      total: totalCount,
      size: size,
      page: page,
      message: "获取成功",
    }

  });
});

app.post("/user/add", async (req, res) => {
  const data = await prisma.user.create({
    data: { ...req.body },
  });
  res.json({ data, message: "添加成功" });
});

app.post("/course/add", async (req, res) => {
  const data = await prisma.post.create({
    data: { ...req.body },
  });
  res.json({ data, message: "添加成功" });
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});