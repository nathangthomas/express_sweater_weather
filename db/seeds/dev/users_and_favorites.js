exports.seed = function(knex) {

  return knex('favorites').del() // delete all favorites first
    .then(() => knex('users').del()) // delete all users

    // Now that we have a clean slate, we can re-insert our user data
    .then(() => {
      return Promise.all([

        // Insert a single user, return the user ID, insert 2 favorites
        knex('users').insert({
          email: 'example@email.com', password: 'password', api_key: 'sample_api_key', id: 1
        })
        .then(user => {
          return knex('favorites').insert([
            { location: 'moab,ut', user_id: 1},
            { location: 'boulder,co', user_id: 1}


          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
