import { createClient, RedisClientType } from 'redis';
import { SWTestMetadata } from '~/models/SWTestHistoryPartition';
import { SWTestContent } from '~/models/SWTestContent';
import { ChatMessage } from '~/models/Chat';

class RedisService {
  private client: RedisClientType | null = null;
  private readonly DEFAULT_TTL = 60 * 60 * 24; // 24 hours in seconds
  private readonly STATS_TTL = 60 * 60; // 1 hour in seconds
  private readonly HISTORY_TTL = 60 * 60 * 3; // 3 hours in seconds
  private readonly CHAT_TTL = 60 * 10; //Time to live for bot chat
  private isConnected = false;
  private connectionFailed = false;
  private isRedisEnabled = true;

  constructor() {
    this.isRedisEnabled = process.env.REDIS_ENABLED !== 'false';

    if (this.isRedisEnabled) {
      try {
        this.client = createClient({
          url: process.env.REDIS_URL || 'redis://localhost:6379',
          socket: {
            reconnectStrategy: (retries) => {
              const delay = Math.min(Math.pow(2, retries) * 100, 10000);
              console.log(`Redis reconnect attempt ${retries} in ${delay}ms`);
              return delay;
            },
            connectTimeout: 5000,
          },
        });

        this.client.on('error', (err) => {
          console.error('Redis Client Error', err);
          if (err.code === 'ECONNREFUSED') {
            this.connectionFailed = true;
            console.warn('Redis connection failed. Running in fallback mode without caching.');
          }
        });

        this.client.on('connect', () => {
          console.log('Connected to Redis');
          this.isConnected = true;
          this.connectionFailed = false;
        });

        this.connect();
      } catch (error) {
        console.error('Error initializing Redis client:', error);
        this.connectionFailed = true;
        this.client = null;
      }
    } else {
      console.log('Redis is disabled by configuration. Running without caching.');
    }
  }

  private async connect() {
    if (this.client && !this.isConnected && !this.connectionFailed) {
      try {
        await this.client.connect();
      } catch (err) {
        console.error('Failed to connect to Redis:', err);
        this.connectionFailed = true;
      }
    }
  }

  private isRedisAvailable(): boolean {
    return this.isRedisEnabled && this.client !== null && this.isConnected && !this.connectionFailed;
  }

  async cacheTestMetadata(userId: string, testId: string, metadata: SWTestMetadata): Promise<void> {
    if (!this.isRedisAvailable()) return;

    try {
      const key = `test:meta:${userId}:${testId}`;
      await this.client!.set(key, JSON.stringify(metadata), { EX: this.DEFAULT_TTL });
    } catch (error) {
      console.error('Redis error in cacheTestMetadata:', error);
    }
  }

  async getTestMetadata(userId: string, testId: string): Promise<SWTestMetadata | null> {
    if (!this.isRedisAvailable()) return null;

    try {
      const key = `test:meta:${userId}:${testId}`;
      const data = await this.client!.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Redis error in getTestMetadata:', error);
      return null;
    }
  }

  async cacheTestContent(userId: string, testId: string, content: SWTestContent): Promise<void> {
    if (!this.isRedisAvailable()) return;

    try {
      const key = `test:content:${userId}:${testId}`;
      await this.client!.set(key, JSON.stringify(content), { EX: this.DEFAULT_TTL });
    } catch (error) {
      console.error('Redis error in cacheTestContent:', error);
    }
  }

  async getTestContent(userId: string, testId: string): Promise<SWTestContent | null> {
    if (!this.isRedisAvailable()) return null;

    try {
      const key = `test:content:${userId}:${testId}`;
      const data = await this.client!.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Redis error in getTestContent:', error);
      return null;
    }
  }

  async cacheUserHistory(userId: string, page: number, limit: number, data: any): Promise<void> {
    if (!this.isRedisAvailable()) return;

    try {
      const key = `history:${userId}:${page}:${limit}`;
      await this.client!.set(key, JSON.stringify(data), { EX: this.HISTORY_TTL });
    } catch (error) {
      console.error('Redis error in cacheUserHistory:', error);
    }
  }

  async getUserHistory(userId: string, page: number, limit: number): Promise<any | null> {
    if (!this.isRedisAvailable()) return null;

    try {
      const key = `history:${userId}:${page}:${limit}`;
      const data = await this.client!.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Redis error in getUserHistory:', error);
      return null;
    }
  }

  async cacheUserStats(userId: string, stats: any): Promise<void> {
    if (!this.isRedisAvailable()) return;

    try {
      const key = `stats:${userId}`;
      await this.client!.set(key, JSON.stringify(stats), { EX: this.STATS_TTL });
    } catch (error) {
      console.error('Redis error in cacheUserStats:', error);
    }
  }

  async getUserStats(userId: string): Promise<any | null> {
    if (!this.isRedisAvailable()) return null;

    try {
      const key = `stats:${userId}`;
      const data = await this.client!.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Redis error in getUserStats:', error);
      return null;
    }
  }

  async addMessageToContext(userId: string, message: ChatMessage) {
    if (!this.isRedisAvailable()) return;

    try {
      const key = `chat:context:${userId}`;

      await this.client!.lPush(key, JSON.stringify(message));
      await this.client!.expire(key, this.CHAT_TTL);
      await this.client!.lTrim(key, 0, 4);
    } catch (error) {
      console.error('Redis error in add and cache Message:', error);
      return null;
    }
  }

  async getRecentChatContext(userId: string, count: number = 5): Promise<ChatMessage[] | null> {
    if (!this.isRedisAvailable()) return null;

    try {
      const key = `chat:context:${userId}`;

      const messages = await this.client!.lRange(key, 0, count - 1);

      return messages.map((msg) => JSON.parse(msg)) as ChatMessage[];
    } catch (error) {
      console.error('Redis error in getCacheMessage:', error);
      return null;
    }
  }

  async clearChatContext(userId: string) {
    if (!this.isRedisAvailable()) return;

    try {
      const key = `chat:context:${userId}`;
      await this.client!.del(key);
    } catch (error) {
      console.error('Redis error in clearChatContext:', error);
    }
  }

  async invalidateUserCaches(userId: string): Promise<void> {
    if (!this.isRedisAvailable()) return;

    try {
      const keys = await this.client!.keys(`*:${userId}*`);

      if (keys.length > 0) {
        await this.client!.del(keys);
      }
    } catch (error) {
      console.error('Redis error in invalidateUserCaches:', error);
    }
  }

  async invalidateTestCache(userId: string, testId: string): Promise<void> {
    if (!this.isRedisAvailable()) return;

    try {
      const metaKey = `test:meta:${userId}:${testId}`;
      const contentKey = `test:content:${userId}:${testId}`;

      await this.client!.del([metaKey, contentKey]);

      const historyKeys = await this.client!.keys(`history:${userId}:*`);
      if (historyKeys.length > 0) {
        await this.client!.del(historyKeys);
      }
    } catch (error) {
      console.error('Redis error in invalidateTestCache:', error);
    }
  }

  async set(key: string, value: string, ttlSeconds = this.DEFAULT_TTL): Promise<void> {
    if (!this.isRedisAvailable()) return;

    try {
      await this.client!.set(key, value, { EX: ttlSeconds });
    } catch (error) {
      console.error(`Redis error in set for key ${key}:`, error);
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.isRedisAvailable()) return null;

    try {
      return this.client!.get(key);
    } catch (error) {
      console.error(`Redis error in get for key ${key}:`, error);
      return null;
    }
  }

  async del(key: string | string[]): Promise<void> {
    if (!this.isRedisAvailable()) return;

    try {
      await this.client!.del(key);
    } catch (error) {
      console.error(`Redis error in del for key ${key}:`, error);
    }
  }
}

const redisServiceInstance = new RedisService();
export default redisServiceInstance;
