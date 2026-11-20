export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: number;
        user_name: string;
        user_email: string;
        user_role: string;
        user_address: string | null;
      };
    }
  }
}