import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../index'
import Humidity from './humidity.model'

const expect = chai.expect

chai.use(chaiHttp)

describe('Humidity data', () => {
  beforeEach(done => {
    Humidity.remove({}, () => done())
  })

  describe('GET humidity data', () => {
    it('it should GET zero humidity data records', done => {
      chai
        .request(server)
        .get('/api/humidity')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some humidity data records', done => {
      Humidity
        .create([
          { controllerId: 'dummy-id-1234', humidity: 80.7 },
          { controllerId: 'dummy-id-1234', humidity: 78.9 },
          { controllerId: 'dummy-id-1234', humidity: 79.1 },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/humidity')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('POST humidity data', () => {
    it('it should POST a new humidity data record', done => {
      chai
        .request(server)
        .post('/api/humidity')
        .send({ controllerId: 'dummy-id-1234', humidity: 77.8 })
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.include({ controllerId: 'dummy-id-1234', humidity: 77.8 })
          expect(res.body).to.have.property('time')
          done()
        })
    })

    it('it should POST invalid data and get an error', done => {
      chai
        .request(server)
        .post('/api/humidity')
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
