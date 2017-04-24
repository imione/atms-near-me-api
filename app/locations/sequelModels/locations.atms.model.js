const atmsModel = (sequelize, DataTypes) => {
  const atms = sequelize.define('atm', {
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: '위도',
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: '경도',
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '은행 이름',
    },
    operatingHour: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '운영 시간',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '기타 설명',
    },
  });
  return atms;
};

module.exports = atmsModel;
