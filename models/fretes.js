module.exports = (sequelize, DataType) => {
	const Fretes = sequelize.define("Fretes", {
		codigo_frete: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		descricao: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		peso: {
			type: DataType.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		valor: {
			type: DataType.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	},{
		classMethods: {
			associate: (models) => {
				Fretes.belongsTo(models.Clientes);
				Fretes.belongsTo(models.Cidades);
			}
		}
	});
	return Fretes;
}