const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');


let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('Posts API', () => {

    // Test the POST route
    describe('POST /posts', () => {
        it('It should POST a post', (done) => {
            const post = {
                'title': 'New Title',
                'content': 'New Content',
                'image': 'New Image'
            };
            chai.request(server).post('/posts').send(post).end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.equal('Post created');
                done();
            });
        });
    });

    // Test the POST route
    describe('POST /posts', () => {
        it('It should NOT POST a post', (done) => {
            const post = {
                'title': 'New Title',
                'content': 'New Content'
            };
            chai.request(server).post('/posts').send(post).end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });
    
    // Test the GET route
    describe('GET /posts', () => {
        it('It should GET all the posts', (done) => {
            chai.request(server).get('/posts').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    // Test the GET route
    describe('GET /posts', () => {
        it('It should NOT GET all the posts', (done) => {
            chai.request(server).get('/post').end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });

    // Test the GET(by id) route
    describe('GET /posts/:id', () => {
        it('It should GET a post by ID', (done) => {
            const id = 1;
            chai.request(server).get('/posts/' + id).end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                res.body.every(i => expect(i).to.have.all.keys('id', 'title', 'content', 'image'));
                done();
            });
        });
    });

    // Test the GET(by id) route
    describe('GET /posts/:id', () => {
        it('It should NOT GET a post by ID', (done) => {
            const id = 2;
            chai.request(server).get('/posts/' + id).end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });
    

    // Test the PUT route
    describe('PUT /posts/:id', () => {
        it('It should PUT a post', (done) => {
            const id = 1;
            const post = {
                'title': 'Updated Title',
                'content': 'Updated Content',
                'image': 'Updated Image'
            };
            chai.request(server).put('/posts/' + id).send(post).end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.equal('Post updated');
                done();
            });
        });
    });
    
    // Test the PUT route
    describe('PUT /posts/:id', () => {
        it('It should NOT PUT a post', (done) => {
            const id = 2;
            const post = {
                'title': 'Updated Title',
                'content': 'Updated Content',
                'image': 'Updated Image'
            };
            chai.request(server).put('/posts/' + id).send(post).end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });
    


    // Test the DELETE route
    describe('DELETE /posts/:id', () => {
        it('It should DELETE a post', (done) => {
            const id = 1;
            chai.request(server).delete('/posts/' + id).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    // Test the DELETE route
    describe('DELETE /posts/:id', () => {
        it('It should NOT DELETE a post', (done) => {
            const id = 145;
            chai.request(server).delete('/posts/' + id).end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });



});