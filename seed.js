const db = require('./config/database');

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Sync database
    await db.sequelize.sync({ force: true });
    console.log('Database synced');

    // Create sample categories
    const categories = await db.AssetCategory.bulkCreate([
      { name: 'Laptop', description: 'Laptop computers for employees' },
      { name: 'Mobile Phone', description: 'Company mobile phones' },
      { name: 'Screw Driver', description: 'Tools - Screw drivers' },
      { name: 'Drill Machine', description: 'Power tools - Drill machines' },
      { name: 'Monitor', description: 'Computer monitors' },
      { name: 'Keyboard', description: 'Computer keyboards' }
    ]);
    console.log('Categories created');

    // Create sample employees
    const employees = await db.Employee.bulkCreate([
      { 
        name: 'John Doe', 
        email: 'john.doe@company.com', 
        phone: '123-456-7890',
        department: 'IT',
        branch: 'Mumbai',
        isActive: true
      },
      { 
        name: 'Jane Smith', 
        email: 'jane.smith@company.com', 
        phone: '123-456-7891',
        department: 'HR',
        branch: 'Delhi',
        isActive: true
      },
      { 
        name: 'Mike Johnson', 
        email: 'mike.johnson@company.com', 
        phone: '123-456-7892',
        department: 'Operations',
        branch: 'Mumbai',
        isActive: true
      },
      { 
        name: 'Sarah Williams', 
        email: 'sarah.williams@company.com', 
        phone: '123-456-7893',
        department: 'Finance',
        branch: 'Bangalore',
        isActive: false
      }
    ]);
    console.log('Employees created');

    // Create sample assets
    const assets = await db.Asset.bulkCreate([
      {
        serialNumber: 'LAP001',
        make: 'Dell',
        model: 'Latitude 5420',
        categoryId: categories[0].id,
        purchaseDate: new Date('2023-01-15'),
        purchasePrice: 75000,
        branch: 'Mumbai',
        status: 'available'
      },
      {
        serialNumber: 'LAP002',
        make: 'HP',
        model: 'EliteBook 840',
        categoryId: categories[0].id,
        purchaseDate: new Date('2023-02-20'),
        purchasePrice: 80000,
        branch: 'Delhi',
        status: 'available'
      },
      {
        serialNumber: 'MOB001',
        make: 'Samsung',
        model: 'Galaxy S21',
        categoryId: categories[1].id,
        purchaseDate: new Date('2023-03-10'),
        purchasePrice: 45000,
        branch: 'Mumbai',
        status: 'available'
      },
      {
        serialNumber: 'TOOL001',
        make: 'Stanley',
        model: 'Pro Series',
        categoryId: categories[2].id,
        purchaseDate: new Date('2023-01-05'),
        purchasePrice: 500,
        branch: 'Bangalore',
        status: 'available'
      },
      {
        serialNumber: 'DRILL001',
        make: 'Bosch',
        model: 'GSB 550',
        categoryId: categories[3].id,
        purchaseDate: new Date('2023-02-01'),
        purchasePrice: 3500,
        branch: 'Mumbai',
        status: 'available'
      }
    ]);
    console.log('Assets created');

    // Create asset history for purchases
    for (const asset of assets) {
      await db.AssetHistory.create({
        assetId: asset.id,
        action: 'Purchase',
        actionDate: asset.purchaseDate,
        amount: asset.purchasePrice,
        notes: `Asset purchased - ${asset.make} ${asset.model}`
      });
    }
    console.log('Asset history created');

    console.log('\nDatabase seeded successfully!');
    console.log('Sample data:');
    console.log(`- ${categories.length} categories`);
    console.log(`- ${employees.length} employees`);
    console.log(`- ${assets.length} assets`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
