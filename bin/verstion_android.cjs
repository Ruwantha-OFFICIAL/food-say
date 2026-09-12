const packageJson = require('../package.json');
const fs = require('fs').promises;

const v = packageJson.version;
const vc = packageJson.versioncode;

async function versionControll() {
  try {
    let build = await fs.readFile("../android/app/build.gradle", "utf8");
    
    build = build.replace("1", vc)
    build = build.replace("1.0", v)
    const fileHadler = await fs.open("../android/app/build.gradle", "w");

    await fileHadler.write(build)
    console.log("VERSION=",v)
    //consold.log("version Controlled 🔖")
  } catch (err) {
    console.error(err.message);
  }
}

versionControll();
