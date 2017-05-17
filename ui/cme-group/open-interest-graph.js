const getCoordinates = function(dataArr, propName) {
  const coordinates = [];
  dataArr.forEach(function(item, i, dataArr){
      coordinates.push(item[propName]);
  });
  return coordinates;
};

const getTrace = function(dataArr, color, name){
  return {
      x: getCoordinates(dataArr, 'openInterest'),
      y: getCoordinates(dataArr, 'strike'),
      name: name,
      orientation: 'h',
      type: 'bar',
      marker: {
          color: color,
          width: 1
      }
  };
};

const convertDataToOpenInterestGraph = function(dataArr1, dataArr2, colorData1, colorData2, nameData1, nameData2){
  const traceData1 = getTrace(dataArr1, colorData1, nameData1);
  const traceData2 = getTrace(dataArr2, colorData2, nameData2);

  const data = [traceData1, traceData2];
  const layout = {
      title: 'OPEN INTEREST',
      barmode: 'stack'
  };

  return { data, layout }
};

module.exports = convertDataToOpenInterestGraph;
