import chai from 'chai'
import chaiHttp from 'chai-http'
import moment from 'moment'
import server from '../index'
import Relay from './relay.model'

const expect = chai.expect

chai.use(chaiHttp)

describe('Relay data', () => {
  beforeEach(done => {
    Relay.remove({}, () => done())
  })

  describe('GET relay data', () => {
    it('it should GET zero relay data records', done => {
      chai
        .request(server)
        .get('/api/relay')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some relay data records', done => {
      Relay
        .create([
          { controllerId: 'dummy-id-1234', name: 'relay1', open: false },
          { controllerId: 'dummy-id-1234', name: 'relay2', open: false },
          { controllerId: 'dummy-id-1234', name: 'relay1', open: true },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/relay')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('GET relay data filtered by time', () => {
    beforeEach(done => {
      Relay
        .create([
          { time: moment(`2017-08-11T01:00:00Z`).toDate(), controllerId: 'dummy-id-1234', name: 'relay1', open: false },
          { time: moment(`2017-08-12T02:00:00Z`).toDate(), controllerId: 'dummy-id-1234', name: 'relay1', open: false },
          { time: moment(`2017-08-13T03:00:00Z`).toDate(), controllerId: 'dummy-id-1234', name: 'relay1', open: true },
        ])
        .then(() => done())
    })

    it('it should GET some relay data records with a lower limit', done => {
      chai
        .request(server)
        .get('/api/relay?from=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some relay data records with an upper limit', done => {
      chai
        .request(server)
        .get('/api/relay?to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some relay data records with a lower and upper limit', done => {
      chai
        .request(server)
        .get('/api/relay?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
        })
    })
  })

  describe('GET relay data filtered by name', () => {
    beforeEach(done => {
      Relay
        .create([
          { time: moment(`2017-08-11T01:00:00Z`).toDate(), controllerId: 'dummy-id-1234', name: 'relay1', open: false },
          { time: moment(`2017-08-12T02:00:00Z`).toDate(), controllerId: 'dummy-id-1234', name: 'relay2', open: false },
          { time: moment(`2017-08-13T03:00:00Z`).toDate(), controllerId: 'dummy-id-1234', name: 'relay2', open: true },
        ])
        .then(() => done())
    })

    it('it should GET some relay data records for a specific relay name', done => {
      chai
        .request(server)
        .get('/api/relay?name=relay2')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })
  })

  describe('POST relay data', () => {
    it('it should POST a new relay data record', done => {
      chai
        .request(server)
        .post('/api/relay')
        .send({ controllerId: 'dummy-id-1234', name: 'relay2', open: true })
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.include({ controllerId: 'dummy-id-1234', name: 'relay2', open: true })
          expect(res.body).to.have.property('time')
          done()
        })
    })

    it('it should POST invalid data and get an error', done => {
      chai
        .request(server)
        .post('/api/relay')
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
