const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
  console.log("🔍 Checking available tables in Supabase...");

  try {
    // Check if we can access any table
    const { data: tables, error } = await supabase.rpc("get_schema_tables");

    if (error) {
      console.log(
        "❌ Could not get table list via RPC, trying direct table access..."
      );

      // Try to access common tables
      const tablesToCheck = [
        "prebuilt_agents",
        "agents",
        "agent_capabilities",
        "agent_interactions",
      ];

      for (const table of tablesToCheck) {
        console.log(`\nTesting table: ${table}`);
        const { data, error: tableError } = await supabase
          .from(table)
          .select("*")
          .limit(1);

        if (tableError) {
          console.log(`❌ ${table}: ${tableError.message}`);
        } else {
          console.log(`✅ ${table}: accessible (${data.length} records shown)`);
          if (data.length > 0) {
            console.log(`   Sample record:`, Object.keys(data[0]));
          }
        }
      }
    } else {
      console.log("✅ Available tables:", tables);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

checkTables();
