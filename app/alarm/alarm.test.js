import chai from 'chai'
import chaiHttp from 'chai-http'
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
          { active: false },
          { active: false },
          { active: true },
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

  describe('POST alarm data', () => {
    it('it should POST a new alarm data record', done => {
      chai
        .request(server)
        .post('/api/alarm')
        .send({ active: true })
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.include({ active: true })
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
