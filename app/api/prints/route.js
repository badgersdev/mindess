export const dynamic = "force-dynamic";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.from("prints").select("*").range(0, 9);

  return NextResponse.json({ data, error });
}

export async function POST(request) {
  const print = await request.json();
  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies });

  // current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session.user.user_metadata.displayName;
  // insert data

  const { data, error } = await supabase
    .from("prints")
    .insert({ ...print, user: user })
    .select();

  return NextResponse.json({ data, error });
}

export async function PATCH(request) {
  const req = await request.json();
  console.log(req);

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase
    .from("prints")
    .update({ isFavourite: !req.isFav })
    .eq("id", req.id)
    .select();

  return NextResponse.json({ data, error });
}

export async function DELETE(request) {
  const props = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("prints").delete().eq("id", props.id);
  return NextResponse.json({ error });
}
