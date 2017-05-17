module.exports = (strikeCellIndex, openInterestCellIndex) => {
  const getIndex = function(arr, item){
    return arr.indexOf(item);
  };

  const getData = (table, monthIndex, optionTypeIndex) => {
    const res = [];
    for (const i = 0; i < table.table.rows.length; i++){
      const row = table.table.rows[i];
      if (row.optionTypeId == optionTypeIndex && row.monthId == monthIndex){
          res.push({strike: row.data[strikeCellIndex],
            openInterest: row.data[openInterestCellIndex].replace('+', '').replace('-', '')});
      }
    }
    return res;
  };

  const getOpenInterest = (table, month, optionType) => {
    const monthIndex = getIndex(table.months, month);
    const optionTypeIndex = getIndex(table.optionTypes, optionType);
    return getData(table, monthIndex, optionTypeIndex);
  }

  return {
    getOpenInterest
  };
};
