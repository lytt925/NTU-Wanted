import Experiment from './models/experiment'
import infoData from './data.json'

const dataInit = async () => {
    await Experiment.deleteMany({})
    await Experiment.insertMany(infoData)
}

export { dataInit }