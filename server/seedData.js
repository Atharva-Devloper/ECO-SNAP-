import User from './models/userModel.js';
import bcrypt from 'bcryptjs';

export const createDemoUsers = async () => {
  try {
    // Check if demo users already exist
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Demo users already exist');
      return;
    }

    // Create demo users
    const demoUsers = [
      {
        username: 'admin',
        email: 'admin@ecosnap.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
      },
      {
        username: 'user1',
        email: 'user1@ecosnap.com',
        password: 'user123',
        name: 'John Doe',
        role: 'user'
      },
      {
        username: 'user2',
        email: 'user2@ecosnap.com',
        password: 'user123',
        name: 'Jane Smith',
        role: 'user'
      }
    ];

    for (const userData of demoUsers) {
      await User.create(userData);
      console.log(`✅ Created demo user: ${userData.username}`);
    }

    console.log('🎉 Demo users created successfully!');
  } catch (error) {
    console.error('Error creating demo users:', error);
  }
};
