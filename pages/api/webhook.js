import stripe from 'stripe';
import { buffer } from 'micro';
import User from '../../models/user';
import db from '../../utils/db';

const stripeCon = stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    const order = {
        orderId: session.id,
        name: session.shipping.name,
        address: session.shipping.address,
        status: session.payment_status,
        amount: {
            subtotal: session.amount_subtotal / 100,
            discount: session.total_details.amount_discount / 100,
            shipping: session.total_details.amount_shipping / 100,
            tax: session.total_details.amount_tax / 100,
            total: session.amount_total / 100,
        },
        itemsImg: JSON.parse(session.metadata.images),
        orderDate: new Date(),
    };
    await db.connect();
    const user = await User.findById(session.metadata.userId);
    user.orders.push(order);
    await User.findByIdAndUpdate(session.metadata.userId, user, { new: true });
    await db.disconnect();
};

const webhookHandler = async (request, response) => {
    if (request.method === 'POST') {
        const payload = (await buffer(request)).toString();
        const sig = await request.headers['stripe-signature'];
        let event;
        try {
            event = stripeCon.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                fulfillOrder(session);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        response.status(200).send('Webhook');
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

export default webhookHandler;