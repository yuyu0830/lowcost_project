var db = require("./dbconnection");

const getDBResult = (queryStr) => {
  return new Promise((resolve, reject) => {
    db.query(queryStr, function (error, result, field) {
      resolve(result);
    });
  });
};

async function searchCard(card) {
  let queryStr = `SELECT * FROM card_data WHERE pack_code = '${card.pack_code}' AND rare = '${card.rare}' AND shop = '${card.shop}'`;
  var result = await getDBResult(queryStr);
  return result;
}

function insertCard(card) {
  console.log(`insert ${card.name}`);
  let queryStr = `INSERT INTO card_data(name, pack_code, rare, price, is_soldout, shop, img, source_url) VALUES(?,?,?,?,?,?,?,?)`;
  db.query(queryStr, [
    card.name,
    card.pack_code,
    card.rare,
    card.price,
    card.is_soldout,
    card.shop,
    card.img,
    card.source_url,
  ]);
  return 0;
}

async function updateCard(card, result) {
  updateNeeded = await comparePriceAndis_Soldout(card, result);
  if (updateNeeded) {
    db.query(
      `UPDATE card_data SET price=?, is_soldout=? WHERE pack_code = '${card.pack_code}' AND rare = '${card.rare}' AND shop = '${card.shop}'`,
      [card.price, card.is_soldout]
    );
    console.log(`update ${card.name}`);
  } else {
    console.log(`not update ${card.name}`);
  }
  return 0;
}

function comparePriceAndis_Soldout(card, result) {
  var is_restocked;
  var is_Changed;
  let dbData = result[0];
  if (!(dbData.price == card.price && dbData.is_soldout == card.is_soldout)) {
    is_Changed = 1;
    if (dbData.is_soldout == "true" && card.is_soldout == "false") {
      is_restocked = 1;
    }
  }

  if (is_restocked) {
    addToRestocklist(card.name);
  }
  return is_Changed;
}

function addToRestocklist(restockedCard) {
  db.query(`INSERT INTO restock_list (name, restocked_date) VALUES (?,NOW())`, [
    restockedCard,
  ]);
  console.log(`add ${restockedCard} to list`);
  return 0;
}

async function dbProcess(datalist) {
  for (const card of datalist) {
    searchResult = await searchCard(card);

    if (searchResult.length === 0) {
      insertCard(card);
    } else {
      updateCard(card, searchResult);
    }
  }
  return 0;
}

exports.dbProcess = dbProcess;