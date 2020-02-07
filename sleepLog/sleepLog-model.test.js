const SleepLog = require('./sleepLog-model.js');
const db = require('../database/dbConfig.js');

describe('SleepLog mode', function(){

    describe('teste environment', function(){

        it('should use testing environment', function(){
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('add() a sleepLog', function(){

        beforeEach(async () => {
            await db('sleepLog').truncate();
        })

        it('Adds a new entry to the sleep log', async function(){
            
            SleepLog.add({date: '03/02/2020',timeCreated: "8:00 AM", wakeUpRating: 2, dayRating: 2, nightRating: 2, wokeup: "8:30 AM", fellAsleep: "11:00 PM", totalTimeSlept:"8:00", user_id:1})
        
            const log = await db('sleepLog');
            expect(log).toHaveLength(1);
        })

    })

    describe('remove() a sleeplog', function(){

        beforeEach(async () => {
            await db('sleepLog').truncate();
        })

        it('removes an existing entry to the sleep log', async function(){

            await SleepLog.add({ date: '03/02/2020',timeCreated: "8:00 AM", wakeUpRating: 2, dayRating: 2, nightRating: 2, wokeup: "8:30 AM", fellAsleep: "11:00 PM", totalTimeSlept:"8:00", user_id:1})
            await  SleepLog.add({ date: '03/03/2020',timeCreated: "8:00 AM", wakeUpRating: 3, dayRating: 3, nightRating: 3, wokeup: "8:30 AM", fellAsleep: "12:00 PM", totalTimeSlept:"8:30", user_id:1})
            await SleepLog.remove(1);


            const log = await db('sleepLog');
            expect(log).toHaveLength(1);
        })
    })

    describe('update() a sleepLog', function(){

        beforeEach(async () => {
            await db('sleepLog').truncate();
        })

        it('updates an existing entry in the sleep log', async function(){

            await SleepLog.add({ date: '03/02/2020', timeCreated: "8:00 AM", wakeUpRating: 2, dayRating: 2, nightRating: 2, wokeup: "8:30 AM", fellAsleep: "11:00 PM", totalTimeSlept:"8:00", user_id:1})

            const changes = {date: '03/02/2020', timeCreated: "8:00 AM", wakeUpRating: 1, dayRating: 1, nightRating: 1, wokeup: "8:30 AM", fellAsleep: "11:00 PM", totalTimeSlept:"8:00", user_id:1}

            await SleepLog.update(1,changes);

            const log =  await db('sleepLog');

            expect(log).toBeDefined();
            expect(changes.wakeUpRating).toBe(1);
        })
    })
})