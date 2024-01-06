const postblog = {
  postblog: {
    value: {
      author: 'Flasdfasdfa43321uffy',
      categories: '64b7ac3999ca7090203e94ac',
      title: 'New Blogs',
      excerpt: 'string',
      content: 'this is contentasdjflaksdf',
      slug: 'string',
      thumbnail: 'lkajsdlkf54535465',
      tags: ['#hello Nepal', '#hey'],
    },
  },
}
const updateblog = {
  updateblog: {
    value: {
      author: 'Flufasdfa46546544fy',
      categories: '64b7ac3999ca7090203e94ac',
      title: 'New Blogs',
      excerpt: 'string',
      content: 'this is contentasdjflaksdf',
      slug: 'string',
      thumbnail: '1a53dsf1a32s1asdfasd',
    },
  },
}

const deleteblog = {
  deleteblog: {
    value: {
      author: 'asdfajlskdf1231561',
    },
  },
}

module.exports = {
  ...postblog,
  ...updateblog,
  ...deleteblog,
}
