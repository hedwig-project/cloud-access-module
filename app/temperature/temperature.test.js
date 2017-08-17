import chai from 'chai'
import chaiHttp from 'chai-http'
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
