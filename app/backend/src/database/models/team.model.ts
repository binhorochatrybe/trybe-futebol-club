import {
  Model,
  InferAttributes, InferCreationAttributes, CreationOptional, DataTypes,
} from 'sequelize';
import db from '.';

class team extends Model<InferAttributes<team>, InferCreationAttributes<team>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

team.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  modelName: 'Team',
  timestamps: false,
  sequelize: db,
});

export default team;
