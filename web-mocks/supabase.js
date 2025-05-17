// Mock implementation of Supabase client for web
const SAMPLE_PHILLBOARDS = [
  { 
    id: 1, 
    title: 'Coffee Shop Ad', 
    content: '50% off lattes this week!',
    creator_id: 'user123',
    creator_name: 'CoffeeShop1',
    lat: 37.7890,
    lng: -122.4089,
    created_at: '2023-05-10T14:32:10.123Z',
    views: 241,
    impressions: 1024,
    clicks: 89
  },
  { 
    id: 2, 
    title: 'New Apartments',
    content: 'Luxury apartments now leasing. Virtual tours available!',
    creator_id: 'user456',
    creator_name: 'PropertyMgmt',
    lat: 37.7841,
    lng: -122.4194,
    created_at: '2023-05-12T09:12:44.789Z', 
    views: 189,
    impressions: 876,
    clicks: 67
  },
  { 
    id: 3, 
    title: 'Tech Conference',
    content: 'Annual developer meetup - June 15 at Convention Center',
    creator_id: 'user789',
    creator_name: 'TechEvents',
    lat: 37.7810,
    lng: -122.4121,
    created_at: '2023-05-14T11:52:33.456Z', 
    views: 423,
    impressions: 1892,
    clicks: 210
  },
  { 
    id: 4, 
    title: 'Dog Walking Service',
    content: 'Professional dog walkers - first walk free!',
    creator_id: 'user101',
    creator_name: 'PawPals',
    lat: 37.7913,
    lng: -122.4005,
    created_at: '2023-05-15T16:22:18.321Z', 
    views: 118,
    impressions: 532,
    clicks: 45
  },
  { 
    id: 5, 
    title: 'Weekend Concert',
    content: 'Live music in the park - Saturday 7PM',
    creator_id: 'user202',
    creator_name: 'CityEvents',
    lat: 37.7799,
    lng: -122.4232,
    created_at: '2023-05-17T08:41:55.987Z', 
    views: 376,
    impressions: 1641,
    clicks: 153
  }
];

const SAMPLE_USERS = [
  {
    id: 'user123',
    username: 'CoffeeShop1',
    display_name: 'Downtown Coffee',
    points: 2450,
    phillboards_created: 5,
    phillboards_viewed: 28,
    created_at: '2023-01-15T10:24:33.123Z'
  },
  {
    id: 'user456',
    username: 'PropertyMgmt',
    display_name: 'City Properties LLC',
    points: 3780,
    phillboards_created: 12,
    phillboards_viewed: 34,
    created_at: '2023-02-02T14:52:11.456Z'
  },
  {
    id: 'user789',
    username: 'TechEvents',
    display_name: 'Tech Events Organization',
    points: 8920,
    phillboards_created: 24,
    phillboards_viewed: 56,
    created_at: '2022-11-25T09:33:42.789Z'
  },
  {
    id: 'user101',
    username: 'PawPals',
    display_name: 'Paw Pals Pet Services',
    points: 1840,
    phillboards_created: 7,
    phillboards_viewed: 42,
    created_at: '2023-03-18T16:14:22.321Z'
  },
  {
    id: 'user202',
    username: 'CityEvents',
    display_name: 'City Cultural Events',
    points: 6210,
    phillboards_created: 18,
    phillboards_viewed: 39,
    created_at: '2022-12-05T11:48:36.987Z'
  }
];

const SAMPLE_LEADERBOARD = SAMPLE_USERS
  .sort((a, b) => b.points - a.points)
  .map((user, index) => ({
    ...user,
    rank: index + 1
  }));

class SupabaseQueryBuilder {
  constructor(table, mockData) {
    this.table = table;
    this.mockData = mockData;
    this.filters = [];
    this.limitValue = null;
    this.orderByField = null;
    this.orderByDirection = 'asc';
    this.selectedFields = null;
  }
  
  select(fields = '*') {
    this.selectedFields = fields;
    return this;
  }
  
  eq(field, value) {
    this.filters.push(item => item[field] === value);
    return this;
  }
  
  gt(field, value) {
    this.filters.push(item => item[field] > value);
    return this;
  }
  
  lt(field, value) {
    this.filters.push(item => item[field] < value);
    return this;
  }
  
  gte(field, value) {
    this.filters.push(item => item[field] >= value);
    return this;
  }
  
  lte(field, value) {
    this.filters.push(item => item[field] <= value);
    return this;
  }
  
  order(field, { ascending = true } = {}) {
    this.orderByField = field;
    this.orderByDirection = ascending ? 'asc' : 'desc';
    return this;
  }
  
  limit(count) {
    this.limitValue = count;
    return this;
  }
  
  async then(resolve) {
    const result = await this.execute();
    resolve(result);
    return result;
  }
  
  async execute() {
    // Filter the data
    let filteredData = [...this.mockData];
    
    for (const filter of this.filters) {
      filteredData = filteredData.filter(filter);
    }
    
    // Order the data
    if (this.orderByField) {
      filteredData.sort((a, b) => {
        if (this.orderByDirection === 'asc') {
          return a[this.orderByField] > b[this.orderByField] ? 1 : -1;
        } else {
          return a[this.orderByField] < b[this.orderByField] ? 1 : -1;
        }
      });
    }
    
    // Apply limit
    if (this.limitValue !== null) {
      filteredData = filteredData.slice(0, this.limitValue);
    }
    
    // Return the data
    return {
      data: filteredData,
      error: null
    };
  }
}

export const createClient = (supabaseUrl, supabaseKey) => {
  return {
    from: (table) => {
      // Determine which mock data to use based on the table
      let mockData = [];
      if (table === 'phillboards') {
        mockData = SAMPLE_PHILLBOARDS;
      } else if (table === 'users') {
        mockData = SAMPLE_USERS;
      } else if (table === 'leaderboard') {
        mockData = SAMPLE_LEADERBOARD;
      }
      
      return new SupabaseQueryBuilder(table, mockData);
    },
    auth: {
      signIn: async () => ({ data: { user: SAMPLE_USERS[0] }, error: null }),
      signUp: async () => ({ data: { user: SAMPLE_USERS[0] }, error: null }),
      signOut: async () => ({ error: null }),
      session: () => ({ user: SAMPLE_USERS[0] }),
      onAuthStateChange: (callback) => {
        // Simulate auth state change
        setTimeout(() => {
          callback('SIGNED_IN', { user: SAMPLE_USERS[0] });
        }, 100);
        
        return {
          data: { subscription: { unsubscribe: () => {} } }
        };
      }
    },
    storage: {
      from: (bucket) => ({
        upload: async (path, file) => ({ data: { Key: path }, error: null }),
        getPublicUrl: (path) => ({ 
          data: { publicUrl: `https://mock-storage.example.com/${bucket}/${path}` } 
        }),
        list: async (prefix) => ({ 
          data: [
            { name: `${prefix}/image1.jpg` },
            { name: `${prefix}/image2.jpg` }
          ], 
          error: null 
        }),
        remove: async (paths) => ({ data: {}, error: null })
      })
    }
  };
}; 