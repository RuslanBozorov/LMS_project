import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import 'dotenv/config';


const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/lms-db';

const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter: adapter,
});

async function main() {
  console.log('🌱 Seeding admin user to database...');
  console.log('📡 Database URL:', dbUrl);

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.users.upsert({
    where: { phone: '901234567' },
    update: {
      password: hashedPassword,
      role: UserRole.ADMIN,
      fullname: 'Super Admin',
    },
    create: {
      phone: '901234567',
      password: hashedPassword,
      role: UserRole.ADMIN,
      fullname: 'Super Admin',
    },
  });

  console.log(`✅ Admin created/updated: ${admin.phone} (${admin.role})`);
  console.log('📝 Login credentials:');
  console.log('   Phone: 901234567');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
