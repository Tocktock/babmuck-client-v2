let path = require("path");
let fs = require("fs");
let filePath = path.join(__dirname, "store.tsv");

let data = fs.readFileSync(filePath, { encoding: "utf8" });

let rows = data.split("\n");

const latitudeRange = 0.10456302418526775;
const longitudeRange = 0.09826851777279444;

// 위도 : 0.10456302418526775
// 경도 : 0.09826851777279444
// 35.239773434504016, 129.01116023978688
// 35.13521041031875, 129.10942875755967

//0 : id
//1 : id
//2 : 가게 이름
//3 : 도로명
//4 : 지번명
//5 : 전화번호

const randomCategory = ["KOREAN", "CHINESE", "JAPANESE", "WESTERN"];

const randomTel = () => {
  const tel = `051-${parseInt(Math.random() * 999) + 1}-${parseInt(
    Math.random() * 9999 + 1
  )}`;
  return tel;
};
const randomLat = () => {
  return 35.13521041031875 + Math.random() * latitudeRange;
};

const randomLon = () => {
  return 129.01116023978688 + Math.random() * longitudeRange;
};
const result = [];
rows.forEach((row) => {
  const storeData = row.split("\t");
  const supplierName = storeData[2];
  const location = storeData[3] !== "" ? storeData[3] : storeData[4];
  const tel = storeData[5] !== "" ? storeData[5] : randomTel();
  const latitude = storeData[7] === "" ? randomLat() : storeData[7];
  const longitude = storeData[8] === "" ? randomLon() : storeData[8];

  const storeCategory = randomCategory[parseInt(Math.random() * 4)];
  if (result.length > 500) return;
  result.push({
    supplierName,
    location,
    contactInfo: tel,
    category: storeCategory,
    latitude,
    longitude,
  });
});
fs.writeFileSync("store.json", JSON.stringify(result));
