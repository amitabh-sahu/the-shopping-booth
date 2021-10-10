import stripe from 'stripe';

const stripeCon = stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;
    const tranformedItems = items.map((item) => ({
        price_data: {
            currency: 'INR',
            unit_amount: item.price * 100 * 100,
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
        quantity: 1,
    }));
    const session = await stripeCon.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1Jil5wSH1Ejk0DxMH1Ny9CZV'],
        shipping_address_collection: {
            allowed_countries: ['IN']
        },
        line_items: tranformedItems,
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/payment`,
        metadata: {
            email: email,
            images: JSON.stringify(items.map((item) => item.image)),
        }
    });
    res.status(200).json(session);
};