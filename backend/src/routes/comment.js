import CommentModel from '../models/comment'

exports.GetCommentsByExpId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const expID = req.query.id
    // console.log(restaurantId);
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant

    const comments = await CommentModel.find({ expID })
    // console.log('backend',comments);
    res.status(200).send({ message: 'success', contents: comments, });
    // console.log('backend_comments',comments);

    // NOTE USE THE FOLLOWING FORMAT. Send type should be
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
}

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    // console.log(req.body);
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
    const { expID, name, content } = req.body;
    const newComment = new CommentModel({ expID, name, content, 'reply': [] });
    await newComment.save();
    // console.log('Comment created', newComment);
}

exports.CreateReply = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    // console.log(req.body);
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
    const { expID, name, content, reply } = req.body;
    // const newComment = new CommentModel({ expID, name, content, 'reply': [] });
    // await newComment.save();
    // console.log('Comment created', newComment);
    const existing = await CommentModel.findOne({ expID, name, content });
    try {
        await existing.updateOne({ 'expID': expID, 'name': name, 'content': content, 'reply': reply });
        // const newComment = new CommentModel({ expID, name, content, reply });
        // console.log("Updated comment", existing);
        existing.save();
        // const msg = `Updating (${Name}, ${Subject}, ${Score})`
        // const card = `(${Name}, ${Subject}, ${Score})`
        // return [msg, card];
    } catch (e) { throw new Error("Comment updating error: " + e); }
}