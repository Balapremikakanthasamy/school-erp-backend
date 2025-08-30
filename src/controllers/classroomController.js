import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Create Classroom
export const createClassroom = async (req, res) => {
  try {
    const { name, grade, section, schoolId, classTeacherId } = req.body;

    const classroom = await prisma.classroom.create({
      data: {
        name,
        grade,
        section,
        schoolId,
        classTeacherId,
      },
    });

    res.json(classroom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Classrooms (optionally filter by schoolId)
export const getClassrooms = async (req, res) => {
  try {
    const { schoolId } = req.query;

    const classrooms = await prisma.classroom.findMany({
      where: schoolId ? { schoolId: Number(schoolId) } : {},
      include: {
        classTeacher: true,
        students: true,
      },
    });

    res.json(classrooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single Classroom by ID
export const getClassroomById = async (req, res) => {
  try {
    const { id } = req.params;

    const classroom = await prisma.classroom.findUnique({
      where: { id: Number(id) },
      include: {
        classTeacher: true,
        students: true,
        school: true,
      },
    });

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    res.json(classroom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Classroom
export const updateClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, grade, section, classTeacherId } = req.body;

    const classroom = await prisma.classroom.update({
      where: { id: Number(id) },
      data: {
        name,
        grade,
        section,
        classTeacherId,
      },
    });

    res.json(classroom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Classroom
export const deleteClassroom = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.classroom.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Classroom deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
