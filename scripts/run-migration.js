require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase configuration in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log("🚀 Starting prebuilt agents migration...");

    // Read the migration file
    const migrationSql = fs.readFileSync(
      "./supabase/migrations/0002_create_prebuilt_agents_tables.sql",
      "utf8"
    );

    // Split the migration into individual statements
    const statements = migrationSql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);

        const { error } = await supabase.rpc("exec_sql", { query: statement });

        if (error) {
          // Some errors are expected (like table already exists)
          if (error.message.includes("already exists")) {
            console.log(`⚠️  Skipping: ${error.message}`);
          } else {
            console.error(`❌ Error in statement ${i + 1}:`, error.message);
          }
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      }
    }

    console.log("🎉 Migration completed!");

    // Test if the tables were created
    console.log("🔍 Verifying tables...");
    const { data: agents, error: agentsError } = await supabase
      .from("prebuilt_agents")
      .select("id, name")
      .limit(1);

    if (agentsError) {
      console.error("❌ Failed to verify tables:", agentsError.message);
    } else {
      console.log(
        `✅ Tables verified! Found ${agents?.length || 0} prebuilt agents.`
      );
    }
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

runMigration();
