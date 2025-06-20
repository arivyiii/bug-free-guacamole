<template>
  <div class="data-visualizer">
    <h1>Data Visualizer</h1>
    <div class="controls">
      <div class="control-group">
        <label>Data Type:</label>
        <select v-model="selectedDataType">
          <option value="users">Users</option>
          <option value="products">Products</option>
          <option value="orders">Orders</option>
          <option value="analytics">Analytics</option>
        </select>
      </div>
      <div class="control-group">
        <label>Visualization Type:</label>
        <select v-model="selectedVisualization">
          <option value="table">Table</option>
          <option value="cards">Cards</option>
          <option value="list">List</option>
          <option value="json">JSON View</option>
        </select>
      </div>
      <button @click="generateData" class="generate-btn">Generate New Data</button>
    </div>

    <div class="visualization-container">
      <!-- Table View -->
      <div v-if="selectedVisualization === 'table'" class="table-view">
        <table>
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currentData" :key="item.id">
              <td v-for="header in tableHeaders" :key="header">
                {{ formatValue(item[header.toLowerCase()]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cards View -->
      <div v-if="selectedVisualization === 'cards'" class="cards-view">
        <div v-for="item in currentData" :key="item.id" class="card">
          <div class="card-header">
            <h3>{{ item.name || item.title || `Item ${item.id}` }}</h3>
            <span class="status" :class="item.status">{{ item.status }}</span>
          </div>
          <div class="card-content">
            <p><strong>ID:</strong> {{ item.id }}</p>
            <p><strong>Value:</strong> {{ item.value }}</p>
            <p><strong>Created:</strong> {{ formatDate(item.created) }}</p>
            <div v-if="item.tags" class="tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-if="selectedVisualization === 'list'" class="list-view">
        <div v-for="item in currentData" :key="item.id" class="list-item">
          <div class="item-main">
            <span class="item-id">#{{ item.id }}</span>
            <span class="item-name">{{ item.name || item.title || `Item ${item.id}` }}</span>
            <span class="item-value">{{ item.value }}</span>
          </div>
          <div class="item-details">
            <span class="item-status" :class="item.status">{{ item.status }}</span>
            <span class="item-date">{{ formatDate(item.created) }}</span>
          </div>
        </div>
      </div>

      <!-- JSON View -->
      <div v-if="selectedVisualization === 'json'" class="json-view">
        <pre>{{ JSON.stringify(currentData, null, 2) }}</pre>
      </div>
    </div>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">Total Items:</span>
        <span class="stat-value">{{ currentData.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Active:</span>
        <span class="stat-value">{{ activeCount }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Average Value:</span>
        <span class="stat-value">{{ averageValue.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataVisualizer',
  data() {
    return {
      selectedDataType: 'users',
      selectedVisualization: 'table',
      currentData: [],
      tableHeaders: ['ID', 'Name', 'Value', 'Status', 'Created']
    };
  },
  computed: {
    activeCount() {
      return this.currentData.filter(item => item.status === 'active').length;
    },
    averageValue() {
      if (this.currentData.length === 0) return 0;
      const sum = this.currentData.reduce((acc, item) => acc + item.value, 0);
      return sum / this.currentData.length;
    }
  },
  methods: {
    generateData() {
      const dataGenerators = {
        users: this.generateUsers,
        products: this.generateProducts,
        orders: this.generateOrders,
        analytics: this.generateAnalytics
      };
      
      this.currentData = dataGenerators[this.selectedDataType]();
      console.log(`Generated ${this.selectedDataType} data:`, this.currentData);
    },
    generateUsers() {
      const names = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eva Brown'];
      const statuses = ['active', 'inactive', 'pending'];
      
      return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: names[Math.floor(Math.random() * names.length)],
        value: Math.floor(Math.random() * 1000),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        created: new Date(Date.now() - Math.random() * 10000000000),
        tags: ['user', 'customer', 'premium'].slice(0, Math.floor(Math.random() * 3) + 1)
      }));
    },
    generateProducts() {
      const products = ['Laptop', 'Phone', 'Tablet', 'Monitor', 'Keyboard', 'Mouse'];
      const statuses = ['in-stock', 'out-of-stock', 'discontinued'];
      
      return Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: products[Math.floor(Math.random() * products.length)],
        value: Math.floor(Math.random() * 2000) + 100,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        created: new Date(Date.now() - Math.random() * 10000000000),
        tags: ['electronics', 'hardware', 'accessory'].slice(0, Math.floor(Math.random() * 3) + 1)
      }));
    },
    generateOrders() {
      const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
      
      return Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Order #${String(i + 1).padStart(4, '0')}`,
        value: Math.floor(Math.random() * 500) + 50,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        created: new Date(Date.now() - Math.random() * 10000000000),
        tags: ['order', 'purchase', 'transaction'].slice(0, Math.floor(Math.random() * 3) + 1)
      }));
    },
    generateAnalytics() {
      const metrics = ['Page Views', 'Sessions', 'Bounce Rate', 'Conversion Rate', 'Revenue'];
      const statuses = ['increasing', 'decreasing', 'stable'];
      
      return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: metrics[Math.floor(Math.random() * metrics.length)],
        value: Math.floor(Math.random() * 10000),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        created: new Date(Date.now() - Math.random() * 10000000000),
        tags: ['analytics', 'metrics', 'performance'].slice(0, Math.floor(Math.random() * 3) + 1)
      }));
    },
    formatValue(value) {
      if (value instanceof Date) {
        return this.formatDate(value);
      }
      return value;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  },
  mounted() {
    this.generateData();
  }
};
</script>

<style scoped>
.data-visualizer {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  align-items: center;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-group label {
  font-weight: bold;
  font-size: 14px;
}

.control-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.generate-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.generate-btn:hover {
  background-color: #45a049;
}

.visualization-container {
  margin-bottom: 30px;
}

/* Table Styles */
.table-view table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.table-view th,
.table-view td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.table-view th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.table-view tr:hover {
  background-color: #f9f9f9;
}

/* Cards Styles */
.cards-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #eee;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-header h3 {
  margin: 0;
  color: #333;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.status.active,
.status.in-stock,
.status.delivered,
.status.increasing {
  background-color: #d4edda;
  color: #155724;
}

.status.inactive,
.status.out-of-stock,
.status.cancelled,
.status.decreasing {
  background-color: #f8d7da;
  color: #721c24;
}

.status.pending,
.status.processing,
.status.stable {
  background-color: #fff3cd;
  color: #856404;
}

.card-content p {
  margin: 8px 0;
  color: #666;
}

.tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

/* List Styles */
.list-view {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:hover {
  background-color: #f9f9f9;
}

.item-main {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-id {
  font-weight: bold;
  color: #666;
  min-width: 40px;
}

.item-name {
  font-weight: bold;
  color: #333;
  min-width: 150px;
}

.item-value {
  color: #666;
}

.item-details {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.item-date {
  color: #666;
  font-size: 14px;
}

/* JSON Styles */
.json-view {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
}

.json-view pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* Stats Styles */
.stats {
  display: flex;
  gap: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  font-weight: bold;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style> 