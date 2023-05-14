export interface UserDetails {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  phone?: string;
  email?: string;
  password_reset_token?: string;
  status?: 'active' | 'inactive';
  last_login?: Date;
  last_failed_login?: Date;
  failed_login_count?: number;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
  role_id?: number;
  team_id?: number;
  team_name?: string;
  role?: string;
  permissions?: number;
}

export interface UserLogin {
  username: string;
  password: string;
}
