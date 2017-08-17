import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../index'
import Gate from './gate.model'

const expect = chai.expect

chai.use(chaiHttp)

describe('Gate data', () => {
  beforeEach(done => {
    Gate.remove({}, () => done())
  })

  describe('GET gate data', () => {
    it('it should GET zero gate data records', done => {
      chai
        .request(server)
        .get('/api/gate')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some gate data records', done => {
      Gate
        .create([
          { controllerId: 'dummy-id-1234', open: false },
          { controllerId: 'dummy-id-1234', open: false },
          { controllerId: 'dummy-id-1234', open: true },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/gate')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('POST gate data', () => {
    it('it should POST a new gate data record', done => {
      chai
        .request(server)
        .post('/api/gate')
        .send({ controllerId: 'dummy-id-1234', open: true })
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.include({ controllerId: 'dummy-id-1234', open: true })
          expect(res.body).to.have.property('time')
          done()
        })
    })

    it('it should POST invalid data and get an error', done => {
      chai
        .request(server)
        .post('/api/gate')
        .send({})
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 500)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('code')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('details')
          done()
        })
    })
  })
})
