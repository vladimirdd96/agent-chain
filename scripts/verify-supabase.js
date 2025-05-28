const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase configuration");
  console.log("Required environment variables:");
  console.log("- NEXT_PUBLIC_SUPABASE_URL");
  console.log("- SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifySupabase() {
  console.log("🔍 Verifying Supabase connection...");
  console.log(`URL: ${supabaseUrl}`);

  try {
    // Test basic connection
    console.log("\n1. Testing basic connection...");
    const { data, error } = await supabase
      .from("prebuilt_agents")
      .select("count(*)", { count: "exact", head: true });

    if (error) {
      console.error("❌ Connection failed:", error.message);

      if (error.message.includes('relation "prebuilt_agents" does not exist')) {
        console.log(
          "\n📋 The prebuilt_agents table does not exist. You need to create it."
        );
        console.log(
          "Run the migration script or create the table manually in Supabase."
        );
      } else if (error.message.includes("RLS")) {
        console.log("\n🔒 Row Level Security (RLS) might be blocking access.");
        console.log("Check your RLS policies in Supabase dashboard.");
      }

      return false;
    }

    console.log("✅ Connection successful!");
    console.log(`📊 Found ${data} records in prebuilt_agents table`);

    // Test data retrieval
    console.log("\n2. Testing data retrieval...");
    const { data: agents, error: fetchError } = await supabase
      .from("prebuilt_agents")
      .select("id, name, category")
      .limit(3);

    if (fetchError) {
      console.error("❌ Data fetch failed:", fetchError.message);
      return false;
    }

    console.log("✅ Data retrieval successful!");
    console.log("Sample agents:", agents);

    return true;
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    return false;
  }
}

verifySupabase().then((success) => {
  if (success) {
    console.log("\n🎉 Supabase verification completed successfully!");
  } else {
    console.log("\n🔧 Please fix the issues above and try again.");
    process.exit(1);
  }
});
