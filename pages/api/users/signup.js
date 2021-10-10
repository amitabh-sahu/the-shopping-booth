import nc from 'next-connect';
import bcrypt from 'bcrypt';
import User from '../../../models/user';
import { getToken } from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    await db.connect();
    const userExist = await User.findOne({ email });
    await db.disconnect();
    if (userExist) {
        res.status(400).json({ msg: 'This email is already exist' });
    }
    else {
        if (password === confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 12);
            await db.connect();
            const newUser = new User({ name: `${firstName} ${lastName}`, email, password: hashedPassword });
            const user = await newUser.save();
            await db.disconnect();
            const token = getToken(user);
            res.status(200).json({ token, result: { id: user._id, name: user.name, email: user.email } });
        }
        else {
            res.status(400).json({ msg: "Password didn't match" });
        }
    }
});

export default handler;