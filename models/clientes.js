module.exports = (sequelize, DataType) => {
	const Clientes = sequelize.define("Clientes", {
		codigo_cliente: {
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
		endereco: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		telefone: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	}, {
		classMethods: {
			associate: (models) => {
				Clientes.hasMany(models.Fretes);
			}
		}
	});
	return Clientes;
}