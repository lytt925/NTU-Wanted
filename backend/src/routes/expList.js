import express from 'express'
import ExperimentModel from '../models/experiment'


const router = express.Router()

// const saveScoreCard = async (name, subject, score) => {
//     const existing = await ScoreCard.findOne({ name, subject });
//     if (existing) {
//         console.log(`${name}'s ${subject} score exist!`)
//         await ScoreCard.deleteOne({ name, subject });
//         const newScoreCard = new ScoreCard({ name, subject, score });
//         console.log("Updated ScoreCard", newScoreCard);
//         await newScoreCard.save();
//         return (`Updating (${name}, ${subject}, ${score})`)
//     }

//     try {
//         const newScoreCard = new ScoreCard({ name, subject, score });
//         console.log("Created ScoreCard", newScoreCard);
//         await newScoreCard.save();
//         return (`Adding (${name}, ${subject}, ${score})`)
//     } catch (e) {
//         throw new Error("ScoreCard creation error: " + e);
//     }
// }

const searchExp =
    async (searchName, locationTagsSelected, timeRange, rewardTagsSelected, typeTagsSelected) => {
        try {
            const findList = await ExperimentModel.find({});
            console.log('findList', findList)
            return findList
        } catch (e) {
            throw new Error('something wrong')
        }
    }

// const deleteDB = async () => {
//     try {
//         await ScoreCard.deleteMany({});
//         console.log("Database deleted")
//     } catch (e) {
//         throw new Error("Database deletion failed");
//     }
// };

// router.post('/card', async (req, res) => {
//     console.log('Post card')
//     const { name, subject, score } = req.body
//     console.log(name, subject, score)
//     const msg = await saveScoreCard(name, subject, score)
//     res.send({ message: msg, card: msg })
// })

router.get('/getExpList', async (req, res) => {
    const {
        searchName,
        locationTagsSelected,
        timeRange,
        rewardTagsSelected,
        typeTagsSelected,
    } = req.query
    console.log('reward', rewardTagsSelected)
    const findList = await searchExp(searchName, locationTagsSelected, timeRange, rewardTagsSelected, typeTagsSelected,)
    res.status(200).send({ message: 'success', contents: findList, });
})

// router.delete('/cards', (req, res) => {
//     deleteDB();
//     res.json({ message: 'Database cleared' })
// })
export default router