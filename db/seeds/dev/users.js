exports.seed = function(knex) {
  return knex('favorites').del() // delete all favorites first
    .then(() => knex('users').del()) // delete all users

    .then(() => {
      return Promise.all([

        knex('users').insert([
          { id: 1, api_key: 'abcd'},
          { id: 2, api_key: 'abcdef'}
        ])
        .then(user => {
          return knex('favorites').insert([
            { location: 'denver,co', user_id: 1 },
            { location: 'miami,fl', user_id: 2 },
            { location: 'denver,co', user_id: 2 }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
