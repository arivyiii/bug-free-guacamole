<template>
  <ConsoleSandboxSection title="Faker Data" :selectedMethod="selectedMethod">
    <button @click="logFakerUser()" class="console-sandbox__btn">User Profile</button>
    <button @click="logFakerCompany()" class="console-sandbox__btn">Company</button>
    <button @click="logFakerAddress()" class="console-sandbox__btn">Address</button>
    <button @click="logFakerProduct()" class="console-sandbox__btn">Product</button>
    <button @click="logFakerOrder()" class="console-sandbox__btn">Order</button>
    <button @click="logFakerUsers()" class="console-sandbox__btn">User Array</button>
    <button @click="logFakerProducts()" class="console-sandbox__btn">Product Array</button>
    <button @click="logFakerMixed()" class="console-sandbox__btn">Mixed Data</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';
import { faker } from '@faker-js/faker';

export default {
  name: 'FakerDataSection',
  components: {
    ConsoleSandboxSection
  },
  props: {
    selectedMethod: {
      type: String,
      required: true
    }
  },
  methods: {
    logFakerUser() {
      const user = {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        avatar: faker.image.avatar(),
        birthDate: faker.date.birthdate(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        company: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        bio: faker.lorem.paragraph(),
        website: faker.internet.url(),
        socialMedia: {
          twitter: faker.internet.username(),
          linkedin: faker.internet.username(),
          github: faker.internet.username()
        }
      };
      logWithMethod(this.selectedMethod, 'Faker User:', user);
    },
    logFakerCompany() {
      const company = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        catchPhrase: faker.company.catchPhrase(),
        bs: faker.company.buzzPhrase(),
        founded: faker.date.past(),
        industry: faker.company.buzzNoun(),
        size: faker.helpers.arrayElement(['startup', 'small', 'medium', 'large', 'enterprise']),
        revenue: faker.finance.amount({ min: 1000000, max: 1000000000, dec: 0 }),
        employees: faker.number.int({ min: 10, max: 10000 }),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        contact: {
          email: faker.internet.email(),
          phone: faker.phone.number(),
          website: faker.internet.url()
        },
        departments: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => ({
          name: faker.commerce.department(),
          manager: faker.person.fullName(),
          employees: faker.number.int({ min: 5, max: 50 })
        }))
      };
      logWithMethod(this.selectedMethod, 'Faker Company:', company);
    },
    logFakerAddress() {
      const address = {
        id: faker.string.uuid(),
        street: faker.location.streetAddress(),
        secondaryAddress: faker.location.secondaryAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        countryCode: faker.location.countryCode(),
        timeZone: faker.location.timeZone(),
        coordinates: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude()
        },
        nearbyPlaces: Array.from({ length: 5 }, () => ({
          name: faker.company.name(),
          type: faker.helpers.arrayElement(['restaurant', 'store', 'bank', 'gas station', 'pharmacy']),
          distance: faker.number.float({ min: 0.1, max: 5.0, fractionDigits: 1 })
        }))
      };
      logWithMethod(this.selectedMethod, 'Faker Address:', address);
    },
    logFakerProduct() {
      const product = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        brand: faker.company.name(),
        sku: faker.string.alphanumeric(8).toUpperCase(),
        inStock: faker.datatype.boolean(),
        stockQuantity: faker.number.int({ min: 0, max: 1000 }),
        images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.url()),
        specifications: {
          color: faker.color.human(),
          size: faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          weight: faker.number.float({ min: 0.1, max: 10.0, fractionDigits: 2 }),
          material: faker.commerce.productMaterial(),
          dimensions: {
            length: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
            width: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
            height: faker.number.float({ min: 1, max: 100, fractionDigits: 1 })
          }
        },
        reviews: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({
          id: faker.string.uuid(),
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(),
          author: faker.person.fullName(),
          date: faker.date.recent()
        }))
      };
      logWithMethod(this.selectedMethod, 'Faker Product:', product);
    },
    logFakerOrder() {
      const order = {
        id: faker.string.uuid(),
        orderNumber: faker.string.alphanumeric(10).toUpperCase(),
        customer: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number()
        },
        items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          quantity: faker.number.int({ min: 1, max: 10 }),
          total: faker.commerce.price()
        })),
        subtotal: faker.commerce.price(),
        tax: faker.commerce.price({ min: 10, max: 100 }),
        shipping: faker.commerce.price({ min: 5, max: 50 }),
        total: faker.commerce.price({ min: 100, max: 1000 }),
        status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
        paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer', 'cash']),
        shippingAddress: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        billingAddress: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        orderDate: faker.date.recent(),
        estimatedDelivery: faker.date.future(),
        trackingNumber: faker.string.alphanumeric(12).toUpperCase()
      };
      logWithMethod(this.selectedMethod, 'Faker Order:', order);
    },
    logFakerUsers() {
      const users = Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => ({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        jobTitle: faker.person.jobTitle(),
        department: faker.commerce.department(),
        salary: faker.number.int({ min: 30000, max: 150000 }),
        hireDate: faker.date.past(),
        isActive: faker.datatype.boolean()
      }));
      logWithMethod(this.selectedMethod, 'Faker Users Array:', users);
    },
    logFakerProducts() {
      const products = Array.from({ length: faker.number.int({ min: 8, max: 20 }) }, () => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        brand: faker.company.name(),
        inStock: faker.datatype.boolean(),
        stockQuantity: faker.number.int({ min: 0, max: 500 }),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        reviewCount: faker.number.int({ min: 0, max: 1000 }),
        image: faker.image.url(),
        description: faker.commerce.productDescription()
      }));
      logWithMethod(this.selectedMethod, 'Faker Products Array:', products);
    },
    logFakerMixed() {
      const mixedData = {
        users: Array.from({ length: 3 }, () => ({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar()
        })),
        products: Array.from({ length: 5 }, () => ({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          category: faker.commerce.department()
        })),
        orders: Array.from({ length: 2 }, () => ({
          id: faker.string.uuid(),
          orderNumber: faker.string.alphanumeric(8).toUpperCase(),
          total: faker.commerce.price(),
          status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled'])
        })),
        analytics: {
          totalRevenue: faker.number.int({ min: 100000, max: 1000000 }),
          totalOrders: faker.number.int({ min: 1000, max: 10000 }),
          averageOrderValue: faker.number.float({ min: 50, max: 200, fractionDigits: 2 }),
          topCategories: Array.from({ length: 5 }, () => ({
            name: faker.commerce.department(),
            sales: faker.number.int({ min: 10000, max: 100000 })
          }))
        },
        settings: {
          theme: faker.helpers.arrayElement(['light', 'dark']),
          language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
          notifications: faker.datatype.boolean(),
          currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'CAD'])
        }
      };
      logWithMethod(this.selectedMethod, 'Faker Mixed Data:', mixedData);
    }
  }
};
</script> 