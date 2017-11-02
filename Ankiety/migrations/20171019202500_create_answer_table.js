
exports.up = function(knex, Promise) {
    return knex.schema.createTable('answer', (table) => {
        table.increments();
        table.integer('queryId').references('query.id');
        table.string('answer');
        table.integer('answerCount').default(0);
    });
};

exports.down = function(knex, Promise) {
};
