const db = require('../db');

const Bill = {
  getAllBills: (callback) => {
    const query = 'SELECT * FROM bill_calculation';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = (sequelize, DataTypes) => {
  const BillCalculation = sequelize.define('BillCalculation', {
    Bill_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    UserID: DataTypes.INTEGER,
    Car_Number: DataTypes.STRING,
    Car_Type: DataTypes.STRING,
    Total_time: DataTypes.FLOAT,
    Total_bill: DataTypes.FLOAT
  }, {
    tableName: 'bill_calculation',
    timestamps: false
  });

  BillCalculation.associate = function(models) {
    BillCalculation.hasOne(models.Payment, { foreignKey: 'Bill_ID' });
  };

  return BillCalculation;
};



module.exports = Bill;
