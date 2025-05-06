import { PrismaClient } from '../generated/prisma';
import logger from '../logger';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("database connected successfully");
    logger.info('🔌 Connected to PostgreSQL database');
  } catch (error) {
    logger.error('❌ Failed to connect to PostgreSQL database');
    logger.error(error);
    process.exit(1);
  }
  finally {
    process.exit(1);
  }
};

export default prisma;