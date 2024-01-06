const postUser = {
  postUser: {
    value: {
      firstname: 'John',
      lastname: 'Doe',
      aboutme: 'About me content',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
      slug: 'john-doe',
    },
  },
}

const updateUser = {
  updateUser: {
    value: {
      firstname: 'Updated',
      lastname: 'User',
      aboutme: 'Updated about me content',
      email: 'updated.user@example.com',
      slug: 'updated-user',
    },
  },
}

const deleteUser = {
  deleteUser: {
    value: {},
  },
}

module.exports = {
  ...postUser,
  ...updateUser,
  ...deleteUser,
}
