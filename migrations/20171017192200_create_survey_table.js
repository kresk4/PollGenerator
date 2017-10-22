
exports.up = function(knex, Promise) {
    return knex.schema.createTable('survey', (table) => {
        table.increments();
        table.string('name');
        table.timestamp('endDate');
        table.integer('countOfAnswers')
        table.integer('userId').references('users.id');
    });
};

exports.down = function(knex, Promise) {
};
