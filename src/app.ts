import express from "express";
import { PrismaClient } from "@prisma/client";
import { convertCourseValuesToNumbers } from "./method";
const prisma = new PrismaClient();
const app = express();
const port: number = 3000;

app.use(express.json());

// 查询列表
app.post("/user/list", async (req, res) => {
  const { page, size } = req.body;
  try {
    const totalCount = await prisma.user.count();
    const data = await prisma.user.findMany({
      skip: (page - 1) * size, // 计算需要跳过的记录数
      take: size, // 限制返回的记录数
      include: { posts: true },
      orderBy: { createdAt: "desc" },
      where: { name: { contains: String(req.body.name) } },
    });
    res.json({
      data: {
        data,
        total: totalCount,
        size: size,
        page: page,
        message: "获取成功",
      },
    });
  } catch (error) {
    return res.status(400).json({ data: { status: 400, message: "获取失败" } });
  }
});

// 用户新增
app.post("/user/add", async (req, res) => {
  try {
    const data = await prisma.user.create({
      data: { ...req.body },
    });
    res.json({ data: { data, message: "添加成功" } });
  } catch (error) {
    return res.status(400).json({ data: { status: 400, message: "添加失败" } });
  }
});

// 用户删除
app.post("/user/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.post.deleteMany({
      where: { authorId: Number(id) },
    });
    const data = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ data: { data, message: "删除成功" } });
  } catch (error) {
    return res.status(400).json({ data: { status: 400, message: "删除失败" } });
  }
});

// 用户更新
app.post("/user/update", async (req, res) => {
  const { id, name, phone, sex } = req.body;
  try {
    const data = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, phone, sex },
    });
    res.json({ data: { data, message: "修改成功" } });
  } catch (error) {
    return res.status(400).json({ data: { status: 400, message: "修改失败" } });
  }
});

// 课程新增
app.post("/course/add", async (req, res) => {
  const courseData = convertCourseValuesToNumbers(req.body);
  try {
    const data = await prisma.post.create({
      data: { ...courseData },
    });
    res.json({ data: { data, message: "添加成功" } });
  } catch (error) {
    return res.status(400).json({ data: { status: 400, message: "添加失败" } });
  }
});

// 课程更新
app.post("/course/update", async (req, res) => {
  const { id } = req.body;
  const courseData = convertCourseValuesToNumbers(req.body);
  try {
    const data = await prisma.post.update({
      where: { id: Number(id) },
      data: { ...courseData },
    });
    res.json({ data: { data, message: "修改成功" } });
  } catch (error) {
    return res.status(400).json({ data: { status: 400, message: "修改失败" } });
  }
});

// 课程删除
app.post("/course/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const data = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ data: { data, message: "删除成功" } });
  } catch (error) {
    return res.status(400).json({ data: { status: 400, message: "删除失败" } });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
