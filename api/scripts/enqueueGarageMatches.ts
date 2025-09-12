import 'dotenv/config'
import { Client } from 'pg'

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()

  // 1) Find published products from the last hour (adjust window as needed)
  const { rows: products } = await client.query(`
    SELECT p.product_id, p.name, p.make_text, p.model_text, p.year_from, p.year_to
    FROM products p
    WHERE p.status = 'published'
      AND p.updated_at >= now() - interval '1 hour'
  `)

  for (const p of products) {
    // 2) Match against garage vehicles by make/model (ILIKE) and year overlap if provided
    const { rows: matches } = await client.query(`
      SELECT DISTINCT g.user_id
      FROM garage_vehicles gv
      JOIN garages g ON g.garage_id = gv.garage_id
      JOIN garage_prefs gp ON gp.garage_id = g.garage_id AND gp.notify_email = true
      WHERE (
        ($1::text IS NULL OR gv.make ILIKE '%' || $1 || '%')
        AND ($2::text IS NULL OR gv.model ILIKE '%' || $2 || '%')
      ) AND (
        ($3::int IS NULL OR $4::int IS NULL)
        OR (gv.year_from IS NULL AND gv.year_to IS NULL)
        OR (coalesce(gv.year_from, 0) <= coalesce($4::int, 9999)
            AND coalesce(gv.year_to, 9999) >= coalesce($3::int, 0))
      )
    `, [p.make_text, p.model_text, p.year_from, p.year_to])

    for (const m of matches) {
      await client.query(
        `INSERT INTO notify_queue (user_id, product_id, reason, scheduled_for)
         VALUES ($1, $2, 'garage_match', now())
         ON CONFLICT DO NOTHING`,
        [m.user_id, p.product_id]
      )
    }
  }

  await client.end()
  console.log('Garage match enqueue complete')
}

run().catch(async (e) => { console.error(e); process.exit(1) })
