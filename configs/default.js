module.exports = {
  table: {
    header: {
      name: "STRIKE OPEN RANGE",
      metadata: {
        positions: {
          month: 0,
          optionType: 1
        }
      }
    },
    cels: {
      count: 14,
      positions: {
        strike: 0,
        bonus: 5,
        volume: 9,
        openInterest: 10
      },
      checks: {
        asNumberCells: [0]
      }
    }
  },
  months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
};