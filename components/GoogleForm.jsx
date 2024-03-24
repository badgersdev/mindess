// "use client";
// import { createClient } from "@supabase/supabase-js";

// const GoogleForm = () => {
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const supabase = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//     );

//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: `${location.origin}/api/auth/v1/callback`,
//       },
//     });
//   };

//   console.log(data);
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <button type="submit">SignIn with Google</button>
//       </form>
//     </div>
//   );
// };

// export default GoogleForm;
