export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      game: {
        Row: {
          created_at: string;
          created_by: string;
          ended_at: string | null;
          game_id: string;
          game_state: Json;
          started_at: string | null;
          type: string;
          updated_at: string;
          winner: string | null;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          ended_at?: string | null;
          game_id?: string;
          game_state?: Json;
          started_at?: string | null;
          type?: string;
          updated_at?: string;
          winner?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          ended_at?: string | null;
          game_id?: string;
          game_state?: Json;
          started_at?: string | null;
          type?: string;
          updated_at?: string;
          winner?: string | null;
        };
      };
      game_event: {
        Row: {
          created_at: string;
          created_by: string | null;
          game_id: string;
          id: number;
          payload: Json;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          game_id: string;
          id?: number;
          payload?: Json;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          game_id?: string;
          id?: number;
          payload?: Json;
        };
      };
      player: {
        Row: {
          game_id: string;
          joined_at: string;
          left_at: string | null;
          player_id: string;
        };
        Insert: {
          game_id: string;
          joined_at?: string;
          left_at?: string | null;
          player_id: string;
        };
        Update: {
          game_id?: string;
          joined_at?: string;
          left_at?: string | null;
          player_id?: string;
        };
      };
      profile: {
        Row: {
          code: number;
          created_at: string;
          name: string | null;
          profile_id: string;
          updated_at: string;
        };
        Insert: {
          code?: number;
          created_at?: string;
          name?: string | null;
          profile_id: string;
          updated_at?: string;
        };
        Update: {
          code?: number;
          created_at?: string;
          name?: string | null;
          profile_id?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
