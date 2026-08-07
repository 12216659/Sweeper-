import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './src/models/Service';
import Category from './src/models/Category';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sweepers';

const seedMaintenance = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Create or find category
        let category = await Category.findOne({ name: 'Home Maintenance Plans' });
        if (!category) {
            category = await Category.create({
                name: 'Home Maintenance Plans',
                description: 'Scheduled home maintenance plans for hassle-free living.',
                imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000'
            });
            console.log('Created Home Maintenance Plans category');
        }

        // Full House Deep Cleaning
        const deepCleanExists = await Service.findOne({ name: 'Full House Deep Cleaning (1500 Sq. Ft.)' });
        if (!deepCleanExists) {
            await Service.create({
                name: 'Full House Deep Cleaning (1500 Sq. Ft.)',
                description: 'Keep your home spotless with a massive deep clean. Prices are for homes up to 1500 sq. ft. Additional charges may apply for larger properties or extra services.',
                category: category._id,
                basePrice: 3899,
                durationMinutes: 300,
                isSubscription: false,
                packages: [
                    {
                        name: 'Basic Package',
                        price: 3899,
                        features: ['Deep cleaning of all rooms', 'Dusting and wiping', 'Floor scrubbing'],
                        isPopular: false
                    },
                    {
                        name: 'Premium Package',
                        price: 5199,
                        features: ['Everything in Basic', 'Sofa & Carpet shampoo', 'Kitchen chimney degreasing', 'Bathroom descaling'],
                        isPopular: true
                    }
                ]
            });
            console.log('Created Full House Deep Cleaning service');
        }

        // Monthly Maid Service
        const maidExists = await Service.findOne({ name: 'Monthly Maid Service' });
        if (!maidExists) {
            await Service.create({
                name: 'Monthly Maid Service',
                description: 'Enjoy hassle-free daily home cleaning with trained and background-verified professionals. Choose from flexible monthly plans designed to keep your home spotless.',
                category: category._id,
                basePrice: 5999, // default base
                durationMinutes: 120, // per day
                isSubscription: true,
                packages: [
                    {
                        name: 'Basic Plan',
                        price: 5999,
                        features: [
                            'Daily Brooming',
                            'Daily Mopping',
                            'Vessel Cleaning',
                            'Full House Cleaning (1 per month)',
                            'Two Paid Leave Days'
                        ],
                        isPopular: false
                    },
                    {
                        name: 'Premium Plan',
                        price: 8999,
                        features: [
                            'Daily Brooming',
                            'Daily Mopping',
                            'Vessel Cleaning',
                            'Washroom Cleaning (2 per month)',
                            'Full House Cleaning (2 per month)',
                            'Bed Making Service',
                            'No Leave Days',
                            'Priority Support'
                        ],
                        isPopular: true
                    }
                ]
            });
            console.log('Created Monthly Maid Service');
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedMaintenance();
