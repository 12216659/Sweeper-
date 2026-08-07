import { Request, Response, NextFunction } from 'express';
import Service from '../models/Service';
import { AppError } from '../utils/AppError';

export const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const services = await Service.find({ isActive: true });
        res.status(200).json({
            status: 'success',
            results: services.length,
            data: { services }
        });
    } catch (error) {
        next(error);
    }
};

export const getServiceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return next(new AppError('No service found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: { service }
        });
    } catch (error) {
        next(error);
    }
};

export const updateService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!service) {
            return next(new AppError('No service found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { service }
        });
    } catch (error) {
        next(error);
    }
};

export const seedServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Wipe existing services for this phase to ensure clean 26 services
        await Service.deleteMany({});

        const seedData = [
            { name: 'House Cleaning', description: 'Comprehensive house cleaning for a fresh and tidy home.', basePrice: 80, durationMinutes: 120, includedItems: ['Dusting', 'Vacuuming', 'Mopping', 'Surface Wipe Down'], iconUrl: 'Home' },
            { name: 'Deep Cleaning', description: 'Intensive top-to-bottom cleaning for long-lasting freshness.', basePrice: 150, durationMinutes: 240, includedItems: ['Baseboards', 'Inside Appliances', 'Deep Scrub', 'Windows'], iconUrl: 'Sparkles' },
            { name: 'Bathroom Cleaning', description: 'Deep sanitization and scale removal for bathrooms.', basePrice: 40, durationMinutes: 60, includedItems: ['Toilet Scrub', 'Shower/Tub Descaling', 'Mirror Polish', 'Floor Disinfection'], iconUrl: 'Bath' },
            { name: 'Kitchen Cleaning', description: 'Degreasing and deep cleaning of all kitchen surfaces.', basePrice: 50, durationMinutes: 90, includedItems: ['Stovetop Degreasing', 'Sink Scrub', 'Countertop Polish', 'Cabinet Exterior'], iconUrl: 'ChefHat' },
            { name: 'Sofa Cleaning', description: 'Professional upholstery cleaning and stain removal.', basePrice: 60, durationMinutes: 90, includedItems: ['Vacuuming', 'Stain Pre-treatment', 'Steam Extraction', 'Deodorizing'], iconUrl: 'Armchair' },
            { name: 'Carpet Cleaning', description: 'Deep carpet shampooing to remove dirt and allergens.', basePrice: 90, durationMinutes: 120, includedItems: ['Dry Vacuum', 'Shampoo Scrub', 'Water Extraction', 'Odor Neutralizer'], iconUrl: 'Rows' },
            { name: 'Mattress Cleaning', description: 'Eliminate dust mites and stains from your mattress.', basePrice: 70, durationMinutes: 90, includedItems: ['UV Sanitization', 'Dry Vacuuming', 'Stain Removal', 'Steam Cleaning'], iconUrl: 'BedDouble' },
            { name: 'Office Cleaning', description: 'Maintain a professional and clean workspace.', basePrice: 120, durationMinutes: 180, includedItems: ['Desk Dusting', 'Trash Removal', 'Common Area Cleaning', 'Restroom Sanitization'], iconUrl: 'Briefcase' },
            { name: 'Commercial Cleaning', description: 'Heavy-duty cleaning for commercial and retail spaces.', basePrice: 250, durationMinutes: 360, includedItems: ['Floor Scrubbing', 'Window Cleaning', 'Restroom Deep Clean', 'Trash Disposal'], iconUrl: 'Building2' },
            { name: 'Apartment Cleaning', description: 'Tailored cleaning for apartments and condos.', basePrice: 70, durationMinutes: 120, includedItems: ['Living Area Dusting', 'Kitchen Cleanup', 'Bathroom Scrub', 'Floor Mopping'], iconUrl: 'Building' },
            { name: 'Villa Cleaning', description: 'Comprehensive cleaning for large villas and estates.', basePrice: 300, durationMinutes: 480, includedItems: ['Multi-level Cleaning', 'Balcony Wash', 'Deep Dusting', 'Full Floor Care'], iconUrl: 'Home' },
            { name: 'Glass Cleaning', description: 'Streak-free cleaning for all glass surfaces and partitions.', basePrice: 45, durationMinutes: 60, includedItems: ['Interior Glass', 'Exterior Glass', 'Mirror Polish', 'Streak-Free Finish'], iconUrl: 'Maximize' },
            { name: 'Window Cleaning', description: 'Professional window washing for a crystal clear view.', basePrice: 60, durationMinutes: 90, includedItems: ['Window Panes', 'Window Sills', 'Screen Cleaning', 'Track Vacuuming'], iconUrl: 'Maximize' },
            { name: 'Water Tank Cleaning', description: 'Hygienic cleaning of residential water tanks.', basePrice: 100, durationMinutes: 120, includedItems: ['Draining', 'Sludge Removal', 'Scrubbing', 'Anti-bacterial Spray'], iconUrl: 'Droplets' },
            { name: 'Fan Cleaning', description: 'Detailed dusting and wiping of ceiling and exhaust fans.', basePrice: 20, durationMinutes: 30, includedItems: ['Blade Dusting', 'Motor Exterior Wipe', 'Canopy Cleaning', 'Dry Wiping'], iconUrl: 'Wind' },
            { name: 'AC Cleaning', description: 'AC filter and duct cleaning for better air quality.', basePrice: 80, durationMinutes: 90, includedItems: ['Filter Wash', 'Coil Cleaning', 'Drain Unclogging', 'Gas Check'], iconUrl: 'Fan' },
            { name: 'Pest Control', description: 'Effective pest eradication and prevention services.', basePrice: 120, durationMinutes: 120, includedItems: ['Inspection', 'Chemical Spray', 'Gel Baiting', 'Prevention Advice'], iconUrl: 'Bug' },
            { name: 'Laundry', description: 'Professional washing, drying, and folding of clothes.', basePrice: 30, durationMinutes: 60, includedItems: ['Washing', 'Fabric Softener', 'Drying', 'Folding'], iconUrl: 'Shirt' },
            { name: 'Dish Washing', description: 'Thorough cleaning of all dishes, pots, and pans.', basePrice: 25, durationMinutes: 45, includedItems: ['Scrubbing', 'Rinsing', 'Drying', 'Putting Away'], iconUrl: 'Utensils' },
            { name: 'Home Helper', description: 'General assistance with daily household chores.', basePrice: 40, durationMinutes: 120, includedItems: ['Organizing', 'Light Cleaning', 'Errands', 'Tidying Up'], iconUrl: 'UserCheck' },
            { name: 'Babysitter', description: 'Trusted and vetted childcare professionals.', basePrice: 60, durationMinutes: 240, includedItems: ['Child Care', 'Feeding', 'Playtime', 'Putting to Bed'], iconUrl: 'Baby' },
            { name: 'Cook', description: 'Professional chef for home-cooked meals.', basePrice: 80, durationMinutes: 180, includedItems: ['Meal Prep', 'Cooking', 'Kitchen Cleanup', 'Menu Planning'], iconUrl: 'ChefHat' },
            { name: 'Driver', description: 'Professional and safe driving services.', basePrice: 50, durationMinutes: 240, includedItems: ['Safe Driving', 'Vehicle Maintenance', 'Errands', 'School Drops'], iconUrl: 'Car' },
            { name: 'Gardener', description: 'Expert garden maintenance and landscaping.', basePrice: 60, durationMinutes: 120, includedItems: ['Lawn Mowing', 'Weeding', 'Watering', 'Pruning'], iconUrl: 'Flower2' },
            { name: 'Elder Care', description: 'Compassionate care and assistance for the elderly.', basePrice: 70, durationMinutes: 240, includedItems: ['Companionship', 'Medication Reminders', 'Mobility Assist', 'Light Meals'], iconUrl: 'Heart' },
            { name: 'Customized Packages', description: 'Build your own cleaning package tailored to your needs.', basePrice: 100, durationMinutes: 180, includedItems: ['Flexible Tasks', 'Priority Support', 'Custom Schedule', 'Dedicated Cleaner'], iconUrl: 'Settings' }
        ];

        const services = await Service.insertMany(seedData);
        res.status(201).json({
            status: 'success',
            message: '26 Services seeded successfully',
            data: { services }
        });
    } catch (error) {
        next(error);
    }
};
