import nc from 'next-connect';
import bcrypt from 'bcrypt';
import User from '../../../models/user';
import { getToken } from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
    const { email, password } = req.body;
    await db.connect();
    const userExist = await User.findOne({ email });
    await db.disconnect();
    if (userExist) {
        const isPassMatch = await bcrypt.compare(password, userExist.password);
        if (isPassMatch) {
            const token = getToken(userExist);
            res.status(200).json({ token, result: { id: userExist._id, name: userExist.name, email: userExist.email } });
        }
        else {
            res.status(404).json({ msg: 'Invalid Credentials' });
        }
    }
    else {
        res.status(404).json({ msg: 'Invalid Credentials' });
    }
});

export default handler;