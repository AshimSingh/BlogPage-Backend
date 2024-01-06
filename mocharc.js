
module.exports ={
    require:['./test/setup.js','./test/userFixture.js'],
    extension: ['js', 'cjs', 'mjs'],
    // spec:[ './test/**/*.js'] ,
    timeout: '8000', // same as "timeout: '5s'"
    // ignore: ['test/user.test.js','test/blog.test.js','test/category.test.js']
    ignore:['test/category.test.js','test/user.test.js','test/blog.test.js','test/media.test.js']
}