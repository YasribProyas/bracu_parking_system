const connection = require('../db'); // Ensure the correct path to the db.js file

exports.getAvailableSpaces = (req, res) => {
  const { start_time, end_time } = req.query;
  console.log(start_time, end_time);

  if (!start_time || !end_time) {
    return res.status(400).send('Start time and end time are required');
  }

  const query = `
    SELECT slot_time, A1, A2, A3, A4, A5, B1, B2, B3, B4, B5
    FROM time_slots
    WHERE slot_time >= :start_time AND slot_time < :end_time
  `;

  connection.query(query, {
    replacements: { start_time, end_time },
    type: connection.QueryTypes.SELECT
  }).then(results => {
    // Process the results to find available spaces
    // const availableSpaces = results.map(row => {
    //   const available = [];
    //   for (const [key, value] of Object.entries(row)) {
    //     if (key !== 'slot_time' && value === 0) { // 0 means false in MySQL BOOLEAN
    //       available.push(key);
    //     }
    //   }
    //   return { slot_time: row.slot_time, available };
    // });
    let availableSpaces = Object.keys(results[0]).filter(key => key !== 'slot_time' && results[0][key] === 0);

    // Find the intersection of available spaces across all rows
    results.forEach(row => {
      availableSpaces = availableSpaces.filter(space => row[space] === 0);
    });

    res.status(200).json(availableSpaces);
  }).catch(err => {
    res.status(500).send(err);
  });
};