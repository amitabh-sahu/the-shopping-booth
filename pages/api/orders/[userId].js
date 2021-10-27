import nc from 'next-connect';
import User from '../../../models/user';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    const user = await User.findById(req.query.userId);
    await db.disconnect();
    if (user) {
        res.status(200).send(user.orders);
    }
    else {
        res.status(404).json({ msg: 'User not found' });
    }
});

export default handler;