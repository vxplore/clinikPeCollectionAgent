export type LoginResponse = {
 
  user_id: string;
 
  profile_image: string | null;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};