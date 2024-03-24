export const dynamic = "force-dynamic";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.from("diary").select();

  return NextResponse.json({ data, error });
}

export async function POST(request) {
  const diaryEntry = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  // current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session.user.user_metadata.displayName;

  const { data, error } = await supabase
    .from("diary")
    .insert({ ...diaryEntry, user: user })
    .select();

  return NextResponse.json({ data, error });
}

export async function DELETE(request) {
  const props = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("diary").delete().eq("id", props.id);
  return NextResponse.json({ error });
}
