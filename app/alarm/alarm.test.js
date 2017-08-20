import chai from 'chai'
import chaiHttp from 'chai-http'
import moment from 'moment'
import server from '../index'
import Alarm from './alarm.model'

const expect = chai.expect

chai.use(chaiHttp)

describe('Alarm data', () => {
  beforeEach(done => {
    Alarm.remove({}, () => done())
  })

  describe('GET alarm data', () => {
    it('it should GET zero alarm data records', done => {
      chai
        .request(server)
        .get('/api/alarm')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some alarm data records', done => {
      Alarm
        .create([
          { controllerId: 'dummy-id-1234', active: false },
          { controllerId: 'dummy-id-1234', active: false },
          { controllerId: 'dummy-id-1234', active: true },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/alarm')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('GET alarm data filtered by time', () => {
    beforeEach(done => {
      Alarm
        .create([
          { time: moment(`2017-08-11T01:00:00Z`).toDate(), controllerId: 'dummy-id-1234', active: false },
          { time: moment(`2017-08-12T02:00:00Z`).toDate(), controllerId: 'dummy-id-1234', active: false },
          { time: moment(`2017-08-13T03:00:00Z`).toDate(), controllerId: 'dummy-id-1234', active: true },
        ])
        .then(() => done())
    })

    it('it should GET some alarm data records with a lower limit', done => {
      chai
        .request(server)
        .get('/api/alarm?from=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some alarm data records with an upper limit', done => {
      chai
        .request(server)
        .get('/api/alarm?to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some alarm data records with a lower and upper limit', done => {
      chai
        .request(server)
        .get('/api/alarm?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
        })
    })
  })

  describe('POST alarm data', () => {
    it('it should POST a new alarm data record', done => {
      chai
        .request(server)
        .post('/api/alarm')
        .send({ controllerId: 'dummy-id-1234', active: true })
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.include({ controllerId: 'dummy-id-1234', active: true })
          expect(res.body).to.have.property('timeSinceLastChange')
          expect(res.body).to.have.property('time')
          done()
        })
    })

    it('it should POST invalid data and get an error', done => {
      chai
        .request(server)
        .post('/api/alarm')
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
