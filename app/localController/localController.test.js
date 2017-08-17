import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../index'
import Alarm from '../alarm/alarm.model'
import Gate from '../gate/gate.model'
import Humidity from '../humidity/humidity.model'
import Presence from '../presence/presence.model'
import Relay from '../relay/relay.model'
import Temperature from '../temperature/temperature.model'

const expect = chai.expect

chai.use(chaiHttp)

describe('Controller filtering', () => {
  beforeEach(done => {
    const setupTasks = [
      Alarm.remove({}).exec(),
      Gate.remove({}).exec(),
      Humidity.remove({}).exec(),
      Presence.remove({}).exec(),
      Relay.remove({}).exec(),
      Temperature.remove({}).exec(),
    ]

    Promise.all(setupTasks).then(() => done())
  })

  describe('GET alarm data for specific controller', () => {
    it('it should GET zero alarm data records for dummy controller', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/alarm')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some alarm data records for dummy controller', done => {
      Alarm
        .create([
          { controllerId: 'dummy-id-9876', active: false },
          { controllerId: 'dummy-id-9876', active: true },
          { controllerId: 'dummy-id-1234', active: false },
          { controllerId: 'dummy-id-1234', active: false },
          { controllerId: 'dummy-id-1234', active: true },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/controller/dummy-id-1234/alarm')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('GET gate data for specific controller', () => {
    it('it should GET zero gate data records for dummy controller', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/gate')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some gate data records for dummy controller', done => {
      Gate
        .create([
          { controllerId: 'dummy-id-9876', open: false },
          { controllerId: 'dummy-id-9876', open: true },
          { controllerId: 'dummy-id-1234', open: false },
          { controllerId: 'dummy-id-1234', open: false },
          { controllerId: 'dummy-id-1234', open: true },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/controller/dummy-id-1234/gate')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('GET humidity data for specific controller', () => {
    it('it should GET zero humidity data records for dummy controller', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/humidity')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some humidity data records for dummy controller', done => {
      Humidity
        .create([
          { controllerId: 'dummy-id-9876', humidity: 82.0 },
          { controllerId: 'dummy-id-9876', humidity: 81.5 },
          { controllerId: 'dummy-id-1234', humidity: 76.8 },
          { controllerId: 'dummy-id-1234', humidity: 77.7 },
          { controllerId: 'dummy-id-1234', humidity: 77.2 },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/controller/dummy-id-1234/humidity')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('GET presence data for specific controller', () => {
    it('it should GET zero presence data records for dummy controller', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/presence')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some presence data records for dummy controller', done => {
      Presence
        .create([
          { controllerId: 'dummy-id-9876', presence: false },
          { controllerId: 'dummy-id-9876', presence: true },
          { controllerId: 'dummy-id-1234', presence: false },
          { controllerId: 'dummy-id-1234', presence: false },
          { controllerId: 'dummy-id-1234', presence: true },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/controller/dummy-id-1234/presence')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('GET relay data for specific controller', () => {
    it('it should GET zero relay data records for dummy controller', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/relay')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some relay data records for dummy controller', done => {
      Relay
        .create([
          { controllerId: 'dummy-id-9876', name: 'relay1', open: false },
          { controllerId: 'dummy-id-9876', name: 'relay2', open: true },
          { controllerId: 'dummy-id-1234', name: 'relay3', open: false },
          { controllerId: 'dummy-id-1234', name: 'relay1', open: false },
          { controllerId: 'dummy-id-1234', name: 'relay2', open: true },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/controller/dummy-id-1234/relay')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })

  describe('GET temperature data for specific controller', () => {
    it('it should GET zero temperature data records for dummy controller', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/temperature')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
          done()
        })
    })

    it('it should GET some temperature data records for dummy controller', done => {
      Temperature
        .create([
          { controllerId: 'dummy-id-9876', temperature: 12.3 },
          { controllerId: 'dummy-id-9876', temperature: 12.4 },
          { controllerId: 'dummy-id-1234', temperature: 17.8 },
          { controllerId: 'dummy-id-1234', temperature: 17.6 },
          { controllerId: 'dummy-id-1234', temperature: 17.6 },
        ])
        .then(() => {
          chai
            .request(server)
            .get('/api/controller/dummy-id-1234/temperature')
            .end((err, res) => {
              expect(res).to.have.deep.property('status', 200)
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(3)
              done()
            })
        })
    })
  })
})
