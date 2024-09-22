const db = require('../db');

const Reviewe = {
  getAllReviewes: (callback) => {
    const query = 'SELECT * FROM review';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    RRNo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Rating: {
      type: DataTypes.TINYINT,
      validate: {
        min: 0,
        max: 5
      }
    },
    Type: {
      type: DataTypes.ENUM('feedback', 'complaint', 'suggestion'),
      allowNull: false
    },
    Feedback: {
      type: DataTypes.STRING(255), // Limit feedback to 255 characters (~60 words)
      validate: {
        len: [0, 255] // Ensures the feedback is no more than 255 characters
      }
    }
  }, {
    tableName: 'review', // The table name in your database
    timestamps: false // If you're not using createdAt/updatedAt timestamps
  });

  return Review;
};

module.exports = Reviewe;