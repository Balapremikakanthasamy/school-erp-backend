import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
await prisma.student.deleteMany();
await prisma.classroom.deleteMany();
await prisma.teacher.deleteMany();
await prisma.user.deleteMany();
await prisma.school.deleteMany();

async function main() {
  // 1) School
  const school = await prisma.school.upsert({
  where: { code: "UAB" },
  update: {}, // nothing to update now
  create: {
    name: "UAB International School",
    code: "UAB",
    address: "Chennai",
  },
});


  // 2) Teacher
  const teacher = await prisma.teacher.create({
    data: {
      name: "Ms. Ananya",
      email: "ananya@uab.test",
      phone: "9999900011",
      schoolId: school.id,
    },
  });

  // 3) Classroom
  const classroom = await prisma.classroom.create({
    data: {
      name: "10-A",
      grade: 10,
      section: "A",
      schoolId: school.id,
      classTeacherId: teacher.id,
    },
  });

  // 4) Students
  await prisma.student.createMany({
    data: [
      {
        name: "Arjun",
        admissionNo: "ADM1001",
        schoolId: school.id,
        classroomId: classroom.id,
        gender: "M",
        parentPhone: "9999900001",
      },
      {
        name: "Meera",
        admissionNo: "ADM1002",
        schoolId: school.id,
        classroomId: classroom.id,
        gender: "F",
        parentPhone: "9999900002",
      },
    ],
  });

  console.log("✅ Seeded school, teacher, classroom, students");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
