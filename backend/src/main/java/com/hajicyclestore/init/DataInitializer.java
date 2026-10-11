package com.hajicyclestore.init;

import com.hajicyclestore.model.AdminUser;
import com.hajicyclestore.model.Product;
import com.hajicyclestore.repository.AdminUserRepository;
import com.hajicyclestore.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final AdminUserRepository adminUserRepository;

    public DataInitializer(ProductRepository productRepository, AdminUserRepository adminUserRepository) {
        this.productRepository = productRepository;
        this.adminUserRepository = adminUserRepository;
    }

    @Override
    public void run(String... args) {
        // Seed the 2 Admin accounts if not present
        if (adminUserRepository.count() == 0) {
            AdminUser admin1 = new AdminUser(null, "admin1", "haji@123", "Haji Mohammad (Store Owner)", "OWNER_ADMIN");
            AdminUser admin2 = new AdminUser(null, "admin2", "cycle@123", "Store Manager (Kolhui Branch)", "STORE_MANAGER");
            adminUserRepository.save(admin1);
            adminUserRepository.save(admin2);
            System.out.println(">>> Initialized 2 Admin users: admin1 (haji@123) and admin2 (cycle@123)");
        }
        if (productRepository.count() == 0) {
            List<Product> initialProducts = Arrays.asList(
                // 1. Ranger Cycles (Falls under both Cycle and Ranger cycle)
                new Product(null, "Hero Sprint Pro Ranger MTB 29T (21-Speed)", 12499.0, 14999.0,
                    "High-tensile alloy frame, dual disc brakes, front suspension fork with lockout, 21-speed Shimano gears. Perfect for rough terrains and daily commuting.",
                    "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80",
                    true, 8, "Hero", Arrays.asList("Cycle", "Ranger cycle")),

                new Product(null, "Leader Scout 26T MTB Ranger Mountain Cycle", 6999.0, 8499.0,
                    "Rugged steel frame, front suspension, powerful V-brakes, fast-rolling wide knobby tyres. Built tough for Indian road conditions.",
                    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
                    true, 12, "Leader", Arrays.asList("Cycle", "Ranger cycle")),

                new Product(null, "Firefox Target 29 D Ranger Edition", 17800.0, 20500.0,
                    "Premium aluminum alloy hardtail bike with Zoom front suspension, mechanical dual disc brakes, and wide riser handlebars for ultimate mountain control.",
                    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80",
                    true, 5, "Firefox", Arrays.asList("Cycle", "Ranger cycle")),

                // 2. Standard Cycle (Regular Cycle)
                new Product(null, "Hero Jet Gold 28T Heavy Duty Roadster", 4850.0, 5400.0,
                    "The legendary Indian roadster bicycle. Full steel lugged frame, heavy-duty carrier, side stand, full chain cover and spring leather saddle.",
                    "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80",
                    true, 15, "Hero", Arrays.asList("Cycle")),

                new Product(null, "Atlas Goldline Super Heavy Roadster 28T", 5100.0, 5650.0,
                    "Classic Indian road workhorse. Reinforced frame structure with rear heavy luggage rack, traditional rod brakes, and durable chrome rims.",
                    "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=800&q=80",
                    true, 9, "Atlas", Arrays.asList("Cycle")),

                // 3. Kids Cycle
                new Product(null, "Hero Blast 16T Kids Sports Bicycle", 3799.0, 4499.0,
                    "Vibrant red sports frame with heavy-duty training wheels, front basket, safety chain cover, and anti-skid pedals. Suitable for ages 4 to 7 years.",
                    "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80",
                    true, 14, "Hero", Arrays.asList("Cycle", "Kids cycle")),

                new Product(null, "BSA Champ 20T Junior BMX Cycle", 4950.0, 5800.0,
                    "Sturdy junior bike with attractive sports graphics, water bottle holder, mudguards, and easy-reach brake levers. Designed for kids aged 7 to 11.",
                    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
                    true, 7, "BSA", Arrays.asList("Cycle", "Kids cycle")),

                // 4. Ladies Cycle
                new Product(null, "Hero Miss India 26T Elegant City Cycle", 5899.0, 6799.0,
                    "Step-through ergonomic frame designed for women, front dress guard, spacious woven wire basket, comfortable cushioned saddle, and bell.",
                    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
                    true, 10, "Hero", Arrays.asList("Cycle", "Ladies cycle")),

                new Product(null, "Hercules Diva 26T Comfort Ladies Bicycle", 6250.0, 7150.0,
                    "Stylish pastel metallic finish, curved handlebars for upright riding posture, sturdy rear carrier, mudguards, and smooth caliper brakes.",
                    "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80",
                    true, 6, "Hercules", Arrays.asList("Cycle", "Ladies cycle")),

                // 5. Cycle Tubes
                new Product(null, "Ralco 26 x 2.125 High Durability MTB Cycle Tube", 180.0, 220.0,
                    "100% Butyl rubber inner tube with American Schrader valve. High puncture resistance and superior air retention for mountain and ranger cycles.",
                    "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80",
                    true, 40, "Ralco", Arrays.asList("Cycle tubes")),

                new Product(null, "Metro 28 x 1.5 Heavy Duty Roadster Cycle Tube", 140.0, 175.0,
                    "Specially vulcanized rubber tube for standard 28-inch bicycles with Dunlop woods valve. Reliable for high load and village road use.",
                    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
                    true, 60, "Metro", Arrays.asList("Cycle tubes")),

                new Product(null, "Ralson Butyl Cycle Tube 20T / 24T", 150.0, 190.0,
                    "Seamless molded butyl tube with airtight brass valve. Perfect fit for kids and junior bicycles.",
                    "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80",
                    true, 35, "Ralson", Arrays.asList("Cycle tubes")),

                // 6. Cycle Parts
                new Product(null, "Shimano Tourney TY300 6/7-Speed Rear Derailleur", 890.0, 1100.0,
                    "Genuine Shimano SIS index shifting rear derailleur. Direct attachment bracket type, smooth gear switching for all geared cycles.",
                    "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80",
                    true, 18, "Shimano", Arrays.asList("Cycle parts")),

                new Product(null, "Heavy Duty Cycle Pedals (Pair) with Night Reflectors", 220.0, 280.0,
                    "High-impact resin body with 9/16 inch axle, sealed ball bearings, non-slip grip studs, and embedded amber night reflectors.",
                    "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80",
                    true, 25, "Haji Genuine", Arrays.asList("Cycle parts")),

                new Product(null, "KMC Heavy Duty Single Speed Bicycle Chain", 260.0, 320.0,
                    "114-link rust-resistant high tensile steel chain with quick connecting link. Ideal for standard roadsters and single-speed ranger cycles.",
                    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
                    true, 30, "KMC", Arrays.asList("Cycle parts")),

                new Product(null, "Mechanical Disc Brake Caliper & Rotor Kit (160mm)", 650.0, 850.0,
                    "Front & rear dual piston disc brake set with stainless steel 160mm wavy rotors and heat dissipation ceramic brake pads.",
                    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80",
                    true, 15, "Zoom", Arrays.asList("Cycle parts")),

                // 7. Tubes for bikes and other vehicles
                new Product(null, "MRF 90/90-12 Scooter Butyl Tube (Activa / Jupiter)", 320.0, 390.0,
                    "Genuine MRF heavy duty butyl tube with 90-degree bent brass valve. Designed for Honda Activa, TVS Jupiter, and Suzuki Access.",
                    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
                    true, 28, "MRF", Arrays.asList("Tubes for bikes and other vehicles")),

                new Product(null, "CEAT 2.75/3.00-17 Motorcycle Heavy Duty Tube (Splendor / Shine)", 350.0, 420.0,
                    "Puncture resistant butyl tube for 17-inch motorcycle rims. Perfect fit for Hero Splendor, HF Deluxe, Honda Shine, and Bajaj Platina.",
                    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
                    true, 32, "CEAT", Arrays.asList("Tubes for bikes and other vehicles")),

                new Product(null, "Apollo 3.00-18 Heavy Duty Bike Tube (Pulsar / Glamour)", 370.0, 440.0,
                    "Premium heat-resistant compound tube for 18-inch commuter and sports bikes. Superior air tightness and puncture elasticity.",
                    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
                    true, 22, "Apollo", Arrays.asList("Tubes for bikes and other vehicles")),

                new Product(null, "E-Rickshaw 3.75-12 Extra Thick Commercial Vehicle Tube", 420.0, 520.0,
                    "Specially reinforced commercial vehicle butyl tube for passenger and cargo E-Rickshaws. Engineered to handle up to 700 kg load capacity.",
                    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
                    true, 20, "Birla", Arrays.asList("Tubes for bikes and other vehicles")),

                // 8. Tyres for bikes and other vehicles
                new Product(null, "MRF Zapper FS 90/90-17 Tubeless Front Bike Tyre", 1850.0, 2150.0,
                    "Deep tread pattern with continuous center groove for directional stability, superior water displacement, and wet grip on highways and rural roads.",
                    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
                    true, 12, "MRF", Arrays.asList("Tyres for bikes and other vehicles")),

                new Product(null, "CEAT Gripp X3 100/90-17 Motorcycle Rear Tyre", 2100.0, 2450.0,
                    "Dual-compound technology that maintains everlasting grip even when half worn out. Suitable for Hero, Bajaj, and Yamaha 125-160cc bikes.",
                    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
                    true, 10, "CEAT", Arrays.asList("Tyres for bikes and other vehicles")),

                new Product(null, "TVS Eurogrip 90/100-10 Scooter Tubeless Tyre (Activa / Pleasure)", 1350.0, 1600.0,
                    "All-weather directional tread with reinforced sidewall structure. Supreme mileage and braking stability for daily market runs.",
                    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
                    true, 16, "TVS", Arrays.asList("Tyres for bikes and other vehicles")),

                new Product(null, "Birla E-Rickshaw Super Load 3.75-12 Heavy Duty Tyre", 1750.0, 2050.0,
                    "Heavy-ply rating tyre built specifically for tough commercial electric three-wheelers. High wear resistance with deep block tread pattern.",
                    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
                    true, 14, "Birla", Arrays.asList("Tyres for bikes and other vehicles")),

                new Product(null, "Apollo Farmking 6.00-16 Tractor Front Tyre", 4600.0, 5200.0,
                    "Triple-rib front tractor tyre offering effortless steering control in muddy fields and on paved village roads. Resistant to cuts and punctures.",
                    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
                    true, 4, "Apollo", Arrays.asList("Tyres for bikes and other vehicles"))
            );

            productRepository.saveAll(initialProducts);
            System.out.println(">>> Initialized " + initialProducts.size() + " sample products in Haji Cycle Store database.");
        }
    }
}
