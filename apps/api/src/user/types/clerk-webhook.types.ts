export interface ClerkEmailAddress {
    id: string;
    email_address: string;
    verification: {
      status: string;
      strategy: string;
    };
  }
  
  export interface ClerkWebhookEvent {
    data: {
      id: string;
      first_name?: string;
      last_name?: string;
      email_addresses: ClerkEmailAddress[];
      primary_email_address_id?: string;
      created_at: number;
      updated_at: number;
    };
    object: string;
    type: 'user.created' | 'user.updated' | 'user.deleted';
  }
  