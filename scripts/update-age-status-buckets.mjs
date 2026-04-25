import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Supabase environment variables are missing.");
}

const supabase = createClient(url, anonKey);

function getAgeBucketValue(age) {
  if (age == null) return null;
  if (age < 15) return 12;
  if (age < 20) return 17;
  if (age < 25) return 22;
  if (age < 30) return 27;
  if (age < 35) return 32;
  if (age < 40) return 37;
  if (age < 45) return 42;
  if (age < 50) return 47;
  if (age < 55) return 52;
  if (age < 60) return 57;
  return 60;
}

function mapStatus(status) {
  switch (status) {
    case "独身":
      return "恋人探し中";
    case "交際中":
      return "恋愛中";
    case "既婚":
      return "結婚中";
    case "離婚":
      return "恋人不要";
    default:
      return status;
  }
}

async function main() {
  const { data, error } = await supabase.from("posts").select("id, age, status");

  if (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  const updates = (data ?? []).map((post) => ({
    id: post.id,
    age: getAgeBucketValue(post.age),
    status: mapStatus(post.status),
  }));

  let updatedCount = 0;

  for (const post of updates) {
    const { error: updateError } = await supabase
      .from("posts")
      .update({
        age: post.age,
        status: post.status,
      })
      .eq("id", post.id);

    if (!updateError) {
      updatedCount += 1;
    }
  }

  console.log(
    JSON.stringify(
      {
        targetCount: updates.length,
        updatedCount,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
