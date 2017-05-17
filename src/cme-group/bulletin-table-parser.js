const fs = require('fs');
const stream = require('stream');
const readLine = require('readline');

module.exports = (months,
  monthColPos,
  optionTypeColumnPos,
  monthWordCharCount,
  tableColumnCount,
  columnsAtNumber,
  tableName
) => {
  const tables = {
    months: [],
    optionTypes: [],
    table: {
      rows: []
    }
  };

  const split = (str) => {
    return str.replace(/ {1}[+]/g,'+').replace(/ {1}[-]/g,'-').split(' ').filter(s => s != '');
  };

  const getMonth = (splitedLine) => {
    return splitedLine[monthColPos];
  };

  const getOptionType = (line) => {
    const splitedLine = line.trim().replace(/ {2,}/g,"@").split("@");
    return splitedLine[optionTypeColumnPos];
  };

  const isTableRow = (splitedLine) => {
    if (splitedLine.length == tableColumnCount){
      for (let i = 0; i < columnsAtNumber.length; i++){
        const cellData = splitedLine[columnsAtNumber[i]];
        if (isNaN(cellData)) return false;
      }
      return true;
    }
    return false;
  };

  const isBeginSection = (splitedLine) => {
    for(let i = 0; i < months.length; i++) {
      if (splitedLine[monthColPos].includes(months[i])
        && splitedLine[monthColPos].length == monthWordCharCount) {
        return true;
      }
    }
    return false;
  };

  const addToArrIfNotExist = (value, arr) => {
    const index = arr.indexOf(value);
    return index != -1 ? index : arr.push(value);
  };

  const addToTable = (currentMonth, currentOptionType, lineArr) => {
    const currentMonthIndex = addToArrIfNotExist(currentMonth, tables.months);
    const currentOptionTypeIndex = addToArrIfNotExist(currentOptionType, tables.optionTypes);
    const row = {
      monthId: currentMonthIndex,
      optionTypeId: currentOptionTypeIndex,
      data: lineArr
    };
    tables.table.rows.push(row);
  };

  const createLineProcessor = () => {
    let currentMonth;
    let currentOptionType;
    const startProcessLine = (line) => {
      const splitedLine = split(line);
      if (splitedLine.length == 0) return;
      if (isBeginSection(splitedLine)) {
        currentMonth = getMonth(splitedLine);
        currentOptionType = getOptionType(line);
      } else if (isTableRow(splitedLine)) {
        addToTable(currentMonth, currentOptionType, splitedLine);
      }
    };
    return startProcessLine;
  };

  const parseTable = (txtFilePath) => new Promise((resolve, reject) => {
    try {
      let tableStarted = false;
      const processLine = createLineProcessor();
      const instream = fs.createReadStream(txtFilePath);
      const outstream = new stream;
      const rl = readLine.createInterface(instream, outstream);
      rl.on('line', function (line) {
          if (!tableStarted){
              if (line.includes(tableName)) {
                  tableStarted = true;
              }
          } else {
              processLine(line);
          }
      });
      rl.on('close', function () {
          return resolve(tables);
      });
    } catch (error) {
      return reject(error);
    }
});

  return {
    parseTable
  };
};
