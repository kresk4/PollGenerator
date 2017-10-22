
exports.up = function(knex, Promise) {
    return knex.schema.createTable('query', (table) => {
        table.increments();
        table.integer('surveyId').references('survey.id');
        table.string('query');
    });
};

exports.down = function(knex, Promise) {
};
