import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    const school = await prisma.school.create({ data: { name, address } });
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSchools = async (req, res) => {
  try {
    const schools = await prisma.school.findMany({
      include: { classrooms: true, teachers: true, students: true },
    });
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSchoolById = async (req, res) => {
  try {
    const school = await prisma.school.findUnique({
      where: { id: Number(req.params.id) },
      include: { classrooms: true, teachers: true, students: true },
    });
    if (!school) return res.status(404).json({ error: "School not found" });
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    const school = await prisma.school.update({
      where: { id: Number(req.params.id) },
      data: { name, address },
    });
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSchool = async (req, res) => {
  try {
    await prisma.school.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "School deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
