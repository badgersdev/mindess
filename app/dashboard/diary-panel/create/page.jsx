import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DiaryForm from "./DiaryForm";

export const dynamic = "force-dynamic";

const today = new Date().toLocaleDateString();

const DiaryPanel = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: session } = await supabase.auth.getSession();

  const currentUser = session.session.user.user_metadata.displayName;

  const { data: diary, error } = await supabase
    .from("diary")
    .select()
    .eq("user", currentUser);

  const todayEntries = diary.find((entry) => {
    return new Date(entry.created_at).toLocaleDateString() === today;
  });

  console.log(todayEntries);
  return (
    <div className="my-auto h-screen">
      <DiaryForm todayEntries={todayEntries} error={error} />
    </div>
  );
};

export default DiaryPanel;
