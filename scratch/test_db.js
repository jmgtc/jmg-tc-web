const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  console.log("--- TEST DE CONTACTO ---");
  try {
    const msg = await prisma.contactMessage.create({
      data: {
        name: "Test Robot",
        email: "test@jmg-tc.com",
        service: "Diagnóstico",
        message: "Probando conexión desde script"
      }
    });
    console.log("✅ ÉXITO: Mensaje guardado con ID:", msg.id);
  } catch (err) {
    console.error("❌ ERROR EN PRISMA:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
