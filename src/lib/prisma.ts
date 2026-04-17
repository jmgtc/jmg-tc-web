import { PrismaClient } from '@prisma/client'

// Implementación de Singleton con inicialización perezosa (Lazy)
// Esto evita que Prisma intente conectar o validar env vars durante el build de Next.js
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Exportamos una función o un getter para asegurar que no se instancie en el "top-level"
const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
