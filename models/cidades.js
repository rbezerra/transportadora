module.exports = (sequelize, DataType) => {
	const Cidades = sequelize.define("Cidades", {
		codigo_cidade: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		UF: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		taxa: {
			type: DataType.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	}, {
		classMethods: {
			associate: (models) => {
				Cidades.hasMany(models.Fretes);
			}
		}
	});
	return Cidades;
}