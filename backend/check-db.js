require("dotenv").config();
const mongoose = require("mongoose");
const Diagnosis = require("./src/models/Diagnosis");

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  const results = await Diagnosis.find().sort({ createdAt: -1 });
  console.log(`Found ${results.length} diagnosis document(s):`);
  console.log(JSON.stringify(results, null, 2));
  await mongoose.disconnect();
}

main().catch(console.error);