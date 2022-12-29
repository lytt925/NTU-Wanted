import express from 'express'
// import ScoreCard from "../models/expInfo.js"


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

// const queryDB = async (type, queryString) => {
//     try {
//         const findList = await ScoreCard.find({ [type]: queryString })
//         console.log(findList)
//         return (findList)
//     } catch (e) {
//         throw new Error('something wrong')
//     }
// }

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

// router.get('/cards', async (req, res) => {
//     const { type, queryString } = req.query
//     const findList = await queryDB(type, queryString)
//     let msgList
//     if (type === 'name') {
//         msgList = findList.map(({ name, subject, score }) =>
//             `Found card with name: (${name}, ${subject}, ${score})`)
//     } else {
//         msgList = findList.map(({ name, subject, score }) =>
//             `Found card with subject: (${name}, ${subject}, ${score})`)
//     }
//     console.log(msgList)
//     res.json({ messages: msgList, message: `${type[0].toUpperCase() + type.substring(1)} (${queryString}) not found!` })

// })

// router.delete('/cards', (req, res) => {
//     deleteDB();
//     res.json({ message: 'Database cleared' })
// })

export default router