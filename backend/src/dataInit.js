import Experiment from './models/experiment'
import infoData from './databackup.json'
import CommentModel from './models/comment'
import commentData from './comments.json'

const dataInit = async () => {
    await Experiment.deleteMany({})
    await Experiment.insertMany(infoData)

    await CommentModel.deleteMany({})
    await CommentModel.insertMany(commentData)
}

export { dataInit }