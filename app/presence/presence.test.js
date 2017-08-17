import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../index'
import Presence from './presence.model'

const expect = chai.expect

chai.use(chaiHttp)

describe('Presence data', () => {
  beforeEach(done => {
    Presence.remove({}, () => done())
  })

  describe('GET presence data', () => {
    it('it should GET zero presence data records', done => {
      chai
        .request(server)
        .get('/api/presence')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some presence data records', done => {
      Presence
        .create([
          { controllerId: 'dummy-id-1234', presence: 100 },
          { controllerId: 'dummy-id-1234', presence: 150 },
          { controllerId: 'dummy-id-1234', presence: 600 },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/presence')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('POST presence data', () => {
    it('it should POST a new presence data record', done => {
      chai
        .request(server)
        .post('/api/presence')
        .send({ controllerId: 'dummy-id-1234', presence: 600 })
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.include({ controllerId: 'dummy-id-1234', presence: 600 })
          expect(res.body).to.have.property('time')
          done()
        })
    })
  })

  it('it should POST invalid data and get an error', done => {
    chai
      .request(server)
      .post('/api/presence')
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
