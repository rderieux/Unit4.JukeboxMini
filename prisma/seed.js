const { faker } = require("@faker-js/faker");
const prisma = require("../prisma");

const seed = async (numUsers = 3, numPlaylists = 5) => {
  // Loop through 3 users
  for (let i = 0; i < numUsers; i++) {
    //Use Array.from to create 5 playlists while looping through the 3 users
    const playlists = Array.from({ length: numPlaylists }, () => ({
      name: faker.company.buzzAdjective() + " " + faker.company.buzzNoun(),
      description: faker.lorem.sentence(),
    }));

    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        playlists: {
          create: playlists,
        },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
