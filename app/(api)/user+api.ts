import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    console.log({ request, sql }, "<---postUser");

    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return new Response(JSON.stringify({ message: "Missing required fields!" }), {
        status: 400,
      });
    }

    const res = await sql`
      INSERT INTO users (
        clerk_id, 
        email, 
        name,
        created_at,
        updated_at
      ) VALUES (
        ${clerkId}, 
        ${email}, 
        ${name},
        NOW(),
        NOW()
      ) RETURNING *
    `;

    console.log({ res }, "<---resPostUser");

    return new Response(JSON.stringify({ data: res }), { status: 200 });
  } catch (error) {
    console.log(error, "<---errorInPostUser");
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
