
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (table) => {
		table.increments()
		table.string('login')
		table.string('password')
		table.string('token')
	})
};

exports.down = function(knex, Promise) {
};
