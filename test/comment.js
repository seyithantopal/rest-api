const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('Comments API', () => {

    // Test the POST route
    describe('POST /comments', () => {
        it('It should POST a comment', (done) => {
            const comment = {
                'post_id': 50,
                'comment': 'New Comment',
                'date': new Date().toJSON().slice(0,10).replace(/-/g,'/')
            };
            chai.request(server).post('/comments').send(comment).end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.equal('Comment created');
                done();
            });
        });
    });

    // Test the POST route
    describe('POST /comments', () => {
        it('It should NOT POST a comment', (done) => {
            const comment = {
                'post_id': 50,
                'date': new Date().toJSON().slice(0,10).replace(/-/g,'/')
            };
            chai.request(server).post('/comments').send(comment).end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });
    
    // Test the GET route
    describe('GET /comments', () => {
        it('It should GET all the comments', (done) => {
            chai.request(server).get('/comments').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

   // Test the GET route
    describe('GET /comments', () => {
        it('It should NOT GET all the comments', (done) => {
            chai.request(server).get('/comment').end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });

    // Test the GET(by id) route
    describe('GET /comments/:id', () => {
        it('It should GET a comment by ID', (done) => {
            const id = 1;
            chai.request(server).get('/comments/' + id).end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                res.body.every(i => expect(i).to.have.all.keys('id', 'post_id', 'comment', 'date'));
                done();
            });
        });
    });

    // Test the GET(by id) route
    describe('GET /comments/:id', () => {
        it('It should NOT GET a comment by ID', (done) => {
            const id = 2;
            chai.request(server).get('/comments/' + id).end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });


    // Test the PUT route
    describe('PUT /comments/:id', () => {
        it('It should PUT a comment', (done) => {
            const id = 1;
            const comment = {
                'post_id': 1,
                'comment': 'Updated Comment',
                'date': new Date().toJSON().slice(0,10).replace(/-/g,'/')
            };
            chai.request(server).put('/comments/' + id).send(comment).end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.equal('Comment updated');
                done();
            });
        });
    });
    
    // Test the PUT route
    describe('PUT /comments/:id', () => {
        it('It should NOT PUT a comment', (done) => {
            const id = 5;
            const comment = {
                'post_id': 'Updated Post_id',
                'comment': 'Updated Comment',
                'date': new Date().toJSON().slice(0,10).replace(/-/g,'/')
            };
            chai.request(server).put('/comments/' + id).send(comment).end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });
    


    // Test the DELETE route
    describe('DELETE /comments/:id', () => {
        it('It should DELETE a comment', (done) => {
            const id = 1;
            chai.request(server).delete('/comments/' + id).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    // Test the DELETE route
    describe('DELETE /comments/:id', () => {
        it('It should NOT DELETE a comment', (done) => {
            const id = 145;
            chai.request(server).delete('/comments/' + id).end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });



});