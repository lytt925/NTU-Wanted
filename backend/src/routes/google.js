import dotenv from 'dotenv-defaults'
dotenv.config();

exports.getKey = async (req, res) => {
    // console.log(process.env.GOOGLE_KEY)
    res.status(200).send(process.env.GOOGLE_KEY);

}