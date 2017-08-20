import chai from 'chai'
import chaiHttp from 'chai-http'
import moment from 'moment'
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

  describe('GET alarm data for specific controller filtered by time', () => {
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
        .get('/api/controller/dummy-id-1234/alarm?from=2017-08-12')
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
        .get('/api/controller/dummy-id-1234/alarm?to=2017-08-12')
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
        .get('/api/controller/dummy-id-1234/alarm?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
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

  describe('GET gate data for specific controller filtered by time', () => {
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
        .get('/api/controller/dummy-id-1234/gate?from=2017-08-12')
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
        .get('/api/controller/dummy-id-1234/gate?to=2017-08-12')
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
        .get('/api/controller/dummy-id-1234/gate?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
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

  describe('GET humidity data for specific controller filtered by time', () => {
    beforeEach(done => {
      Humidity
        .create([
          { time: moment(`2017-08-11T01:00:00Z`).toDate(), controllerId: 'dummy-id-1234', humidity: 80.9 },
          { time: moment(`2017-08-12T02:00:00Z`).toDate(), controllerId: 'dummy-id-1234', humidity: 90.1 },
          { time: moment(`2017-08-13T03:00:00Z`).toDate(), controllerId: 'dummy-id-1234', humidity: 86.3 },
        ])
        .then(() => done())
    })

    it('it should GET some humidity data records with a lower limit', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/humidity?from=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some humidity data records with an upper limit', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/humidity?to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some humidity data records with a lower and upper limit', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/humidity?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
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

  describe('GET presence data for specific controller filtered by time', () => {
    beforeEach(done => {
      Presence
        .create([
          { time: moment(`2017-08-11T01:00:00Z`).toDate(), controllerId: 'dummy-id-1234', presence: false },
          { time: moment(`2017-08-12T02:00:00Z`).toDate(), controllerId: 'dummy-id-1234', presence: false },
          { time: moment(`2017-08-13T03:00:00Z`).toDate(), controllerId: 'dummy-id-1234', presence: true },
        ])
        .then(() => done())
    })

    it('it should GET some presence data records with a lower limit', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/presence?from=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some presence data records with an upper limit', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/presence?to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
        })
    })

    it('it should GET some presence data records with a lower and upper limit', done => {
      chai
        .request(server)
        .get('/api/controller/dummy-id-1234/presence?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
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

  describe('GET relay data for specific controller filtered by time', () => {
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
        .get('/api/controller/dummy-id-1234/relay?from=2017-08-12')
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
        .get('/api/controller/dummy-id-1234/relay?to=2017-08-12')
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
        .get('/api/controller/dummy-id-1234/relay?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
        })
    })
  })

  describe('GET relay data for specific controller filtered by name', () => {
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
        .get('/api/controller/dummy-id-1234/relay?name=relay2')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          done()
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

  describe('GET temperature data for specific controller filtered by time', () => {
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
        .get('/api/controller/dummy-id-1234/temperature?from=2017-08-12')
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
        .get('/api/controller/dummy-id-1234/temperature?to=2017-08-12')
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
        .get('/api/controller/dummy-id-1234/temperature?from=2017-08-12&to=2017-08-12')
        .end((err, res) => {
          expect(res).to.have.deep.property('status', 200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          done()
        })
    })
  })
})
