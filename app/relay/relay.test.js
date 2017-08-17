import chai from 'chai'
import chaiHttp from 'chai-http'
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
