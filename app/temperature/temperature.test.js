import chai from 'chai'
import chaiHttp from 'chai-http'
import moment from 'moment'
import server from '../index'
import Temperature from './temperature.model'

const expect = chai.expect

chai.use(chaiHttp)

describe('Temperature data', () => {
  beforeEach(done => {
    Temperature.remove({}, () => done())
  })

  describe('GET temperature data', () => {
    it('it should GET zero temperature data records', done => {
      chai
        .request(server)
        .get('/api/temperature')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some temperature data records', done => {
      Temperature
        .create([
          { controllerId: 'dummy-id-1234', temperature: 25.3 },
          { controllerId: 'dummy-id-1234', temperature: 25.5 },
          { controllerId: 'dummy-id-1234', temperature: 24.9 },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/temperature')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('GET temperature data filtered by time', () => {
    beforeEach(done => {
      Temperature
        .create([
          { time: moment(`2017-08-11T01:00:00Z`).toDate(), controllerId: 'dummy-id-1234', temperature: 23.2 },
          { time: moment(`2017-08-12T02:00:00Z`).toDate(), controllerId: 'dummy-id-1234', temperature: 22.9 },
          { time: moment(`2017-08-13T03:00:00Z`).toDate(), controllerId: 'dummy-id-1234', temperature: 23.1 },
        ])
        .then(() => done())
    })

    it('it should GET some temperature data records with a lower limit', done => {
      chai
        .request(server)
        .get('/api/temperature?from=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some temperature data records with an upper limit', done => {
      chai
        .request(server)
        .get('/api/temperature?to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some temperature data records with a lower and upper limit', done => {
      chai
        .request(server)
        .get('/api/temperature?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
        })
    })
  })

  describe('POST temperature data', () => {
    it('it should POST a new temperature data record', done => {
      chai
        .request(server)
        .post('/api/temperature')
        .send({ controllerId: 'dummy-id-1234', temperature: 27.8 })
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.include({ controllerId: 'dummy-id-1234', temperature: 27.8 })
          expect(res.body).to.have.property('time')
          done()
        })
    })

    it('it should POST invalid data and get an error', done => {
      chai
        .request(server)
        .post('/api/temperature')
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
