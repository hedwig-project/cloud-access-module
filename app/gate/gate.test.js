import chai from 'chai'
import chaiHttp from 'chai-http'
import moment from 'moment'
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

  describe('GET gate data filtered by time', () => {
    beforeEach(done => {
      Gate
        .create([
          { time: moment(`2017-08-11T01:00:00Z`).toDate(), controllerId: 'dummy-id-1234', open: false },
          { time: moment(`2017-08-12T02:00:00Z`).toDate(), controllerId: 'dummy-id-1234', open: false },
          { time: moment(`2017-08-13T03:00:00Z`).toDate(), controllerId: 'dummy-id-1234', open: true },
        ])
        .then(() => done())
    })

    it('it should GET some gate data records with a lower limit', done => {
      chai
        .request(server)
        .get('/api/gate?from=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some gate data records with an upper limit', done => {
      chai
        .request(server)
        .get('/api/gate?to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some gate data records with a lower and upper limit', done => {
      chai
        .request(server)
        .get('/api/gate?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
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
