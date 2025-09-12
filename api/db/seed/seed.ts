import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { roles, categories } from '../schema/index.js'

const client = new Client({ connectionString: process.env.DATABASE_URL })
const db = drizzle(client)

async function main() {
  await client.connect()
  await db.insert(roles).values([
    { roleName: 'Buyer' },
    { roleName: 'Vendor' },
    { roleName: 'Admin' },
  ]).onConflictDoNothing()

  await db.insert(categories).values([
    { name: 'Engine & Drivetrain', slug: 'engine-drivetrain' },
  ]).onConflictDoNothing()

  console.log('Seed complete')
  await client.end()
}

main().catch(async (e) => { console.error(e); await client.end(); process.exit(1) })
