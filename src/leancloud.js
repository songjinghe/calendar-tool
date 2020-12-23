/* eslint-disable*/
import LC from 'leancloud-storage'
// import LC from 'leancloud-storage/live-query'

const {
  Query,
  User
} = LC;

LC.init({
  appId: "7pe89m0dJEfhAxwmc5SX6Pzy-gzGzoHsz",
  appKey: "e8q6rpNSHqVrqOPirdlPJWcr",
  serverURL: "https://api.water-crystal.org"
});

localStorage.setItem('debug', 'leancloud*');

const Karma = LC.Object.extend('Karma')

export default {
  async getKarmaByTimeRange(timeStart, timeEnd){
    const query = new LC.Query('Karma');
    query.lessThanOrEqualTo('tbegin', timeEnd)
    query.greaterThanOrEqualTo('tend', timeStart)
    query.descending('tbegin')
    return (await query.find()).map(c=> {return {
      id: c.id,
      title: c.get('title'),
      tbegin: c.get('tbegin'),
      tend: c.get('tend'),
      labels: c.get('labels'),
      updatedAt: c.updatedAt,
      createdAt: c.createdAt
    }})
  },
  async createKarma(timeStart, timeEnd, title, labels){
    // console.log(name, parent_id, uid)
    const c = new Karma()
    c.set('tbegin', timeStart)
    c.set('tend', timeEnd)
    c.set('title', title)
    if(labels.length){
      c.set('labels', labels)
    }
    await c.save()
    return c.id
  },
  async updateKarma(id, timeStart, timeEnd, title, labels){
    const c = LC.Object.createWithoutData('Karma', id)
    c.set('title', title)
    c.set('tbegin', timeStart)
    c.set('tend', timeEnd)
    if(labels.length){
      c.set('labels', labels)
    }
    return c.save()
  },
  async deleteKarma(id){
    await LC.Object.createWithoutData('Karma', id).destroy()
  }
}