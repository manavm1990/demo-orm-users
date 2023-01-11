import { DataTypes } from "sequelize";
import sequelize from "../conn.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "User",
    underscored: true,
  }
);

await User.sync().catch((err) => {
  console.error(`Error syncing User model/table: ${err.message}`);
  process.exit(1);
});

export default User;
