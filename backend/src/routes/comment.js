import CommentModel from '../models/comment'

exports.GetCommentsByExpId = async (req, res) => {
    const expID = req.query.id
    const comments = await CommentModel.find({ expID })
    res.status(200).send({ message: 'success', contents: comments, });
}

exports.CreateComment = async (req, res) => {
    const body = req.body
    const { expID, name, content } = req.body;
    const newComment = new CommentModel({ expID, name, content, 'reply': [] });
    await newComment.save();
}

exports.CreateReply = async (req, res) => {
    const body = req.body
    const { expID, name, content, reply } = req.body;
    const existing = await CommentModel.findOne({ expID, name, content });
    try {
        await existing.updateOne({ 'expID': expID, 'name': name, 'content': content, 'reply': reply });
        existing.save();
    } catch (e) { throw new Error("Comment updating error: " + e); }
}