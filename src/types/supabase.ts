export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      banner_members: {
        Row: {
          banner_id: number
          created_at: string | null
          player_uid: string
          type: Database["public"]["Enums"]["banner_member_type"]
          updated_at: string | null
        }
        Insert: {
          banner_id: number
          created_at?: string | null
          player_uid: string
          type: Database["public"]["Enums"]["banner_member_type"]
          updated_at?: string | null
        }
        Update: {
          banner_id?: number
          created_at?: string | null
          player_uid?: string
          type?: Database["public"]["Enums"]["banner_member_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "banner_members_banner_id_fkey"
            columns: ["banner_id"]
            isOneToOne: false
            referencedRelation: "banners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "banner_members_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      banners: {
        Row: {
          allow_member_invites: boolean | null
          created_at: string | null
          creator_uid: string
          description: string | null
          id: number
          image_url: string | null
          name: string
          slug: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          allow_member_invites?: boolean | null
          created_at?: string | null
          creator_uid: string
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          slug: string
          updated_at?: string | null
          uuid?: string
        }
        Update: {
          allow_member_invites?: boolean | null
          created_at?: string | null
          creator_uid?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          slug?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "banners_creator_uid_fkey"
            columns: ["creator_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      banners_discord_servers: {
        Row: {
          banner_id: number
          discord_server_id: string
        }
        Insert: {
          banner_id: number
          discord_server_id: string
        }
        Update: {
          banner_id?: number
          discord_server_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "banners_discord_servers_banner_id_fkey"
            columns: ["banner_id"]
            isOneToOne: false
            referencedRelation: "banners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "banners_discord_servers_discord_server_id_fkey"
            columns: ["discord_server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      discord_servers: {
        Row: {
          banner: string | null
          created_at: string
          features: string[]
          icon: string | null
          id: string
          name: string
          owner_uid: string
          updated_at: string
        }
        Insert: {
          banner?: string | null
          created_at?: string
          features?: string[]
          icon?: string | null
          id: string
          name: string
          owner_uid: string
          updated_at?: string
        }
        Update: {
          banner?: string | null
          created_at?: string
          features?: string[]
          icon?: string | null
          id?: string
          name?: string
          owner_uid?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "discord_servers_owner_uid_fkey"
            columns: ["owner_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      followers: {
        Row: {
          follower_uid: string
          following_uid: string
        }
        Insert: {
          follower_uid: string
          following_uid: string
        }
        Update: {
          follower_uid?: string
          following_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_follower_uid_fkey"
            columns: ["follower_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "followers_following_uid_fkey"
            columns: ["following_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      games: {
        Row: {
          cover_url: string
          created_at: string
          fts_name_en: unknown | null
          id: number
          igdb_id: number
          igdb_platform_ids: Json | null
          igdb_raw_payload: Json | null
          igdb_url: string | null
          name: string
          slug: string
          storyline: string | null
          summary: string | null
          uuid: string
        }
        Insert: {
          cover_url: string
          created_at?: string
          fts_name_en?: unknown | null
          id?: number
          igdb_id: number
          igdb_platform_ids?: Json | null
          igdb_raw_payload?: Json | null
          igdb_url?: string | null
          name: string
          slug: string
          storyline?: string | null
          summary?: string | null
          uuid?: string
        }
        Update: {
          cover_url?: string
          created_at?: string
          fts_name_en?: unknown | null
          id?: number
          igdb_id?: number
          igdb_platform_ids?: Json | null
          igdb_raw_payload?: Json | null
          igdb_url?: string | null
          name?: string
          slug?: string
          storyline?: string | null
          summary?: string | null
          uuid?: string
        }
        Relationships: []
      }
      games_platforms: {
        Row: {
          game_id: number
          platform_id: number
        }
        Insert: {
          game_id: number
          platform_id: number
        }
        Update: {
          game_id?: number
          platform_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "games_platforms_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_platforms_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games_to_import_into_typesense"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_platforms_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      games_sync_dates: {
        Row: {
          id: number
          synced_at: string
        }
        Insert: {
          id?: number
          synced_at: string
        }
        Update: {
          id?: number
          synced_at?: string
        }
        Relationships: []
      }
      games_typesense_docs: {
        Row: {
          created_at: string
          game_id: number
          id: number
          typesense_id: number
        }
        Insert: {
          created_at?: string
          game_id: number
          id?: number
          typesense_id: number
        }
        Update: {
          created_at?: string
          game_id?: number
          id?: number
          typesense_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "games_typesense_docs_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_typesense_docs_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "games_to_import_into_typesense"
            referencedColumns: ["id"]
          },
        ]
      }
      invite_claims: {
        Row: {
          claimer_uid: string
          created_at: string | null
          id: number
          invite_id: number
          uuid: string
        }
        Insert: {
          claimer_uid: string
          created_at?: string | null
          id?: number
          invite_id: number
          uuid?: string
        }
        Update: {
          claimer_uid?: string
          created_at?: string | null
          id?: number
          invite_id?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "invite_claims_invite_id_fkey"
            columns: ["invite_id"]
            isOneToOne: false
            referencedRelation: "invites"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          banner_uid: string | null
          code: string | null
          created_at: string | null
          email: string | null
          expires_at: string | null
          id: number
          invalidated_at: string | null
          invite_type: Database["public"]["Enums"]["invite_type"]
          inviter_uid: string
          sent_at: string | null
          session_uid: string | null
          uuid: string
        }
        Insert: {
          banner_uid?: string | null
          code?: string | null
          created_at?: string | null
          email?: string | null
          expires_at?: string | null
          id?: number
          invalidated_at?: string | null
          invite_type: Database["public"]["Enums"]["invite_type"]
          inviter_uid: string
          sent_at?: string | null
          session_uid?: string | null
          uuid?: string
        }
        Update: {
          banner_uid?: string | null
          code?: string | null
          created_at?: string | null
          email?: string | null
          expires_at?: string | null
          id?: number
          invalidated_at?: string | null
          invite_type?: Database["public"]["Enums"]["invite_type"]
          inviter_uid?: string
          sent_at?: string | null
          session_uid?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_banner_uid_fkey"
            columns: ["banner_uid"]
            isOneToOne: false
            referencedRelation: "banners"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "invites_inviter_uid_fkey"
            columns: ["inviter_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "invites_session_uid_fkey"
            columns: ["session_uid"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["uuid"]
          },
        ]
      }
      platforms: {
        Row: {
          category: Database["public"]["Enums"]["platform_category"]
          id: number
          igdb_id: number | null
          igdb_payload: Json
          name: string
          slug: string
          uuid: string
        }
        Insert: {
          category: Database["public"]["Enums"]["platform_category"]
          id?: number
          igdb_id?: number | null
          igdb_payload?: Json
          name: string
          slug: string
          uuid?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["platform_category"]
          id?: number
          igdb_id?: number | null
          igdb_payload?: Json
          name?: string
          slug?: string
          uuid?: string
        }
        Relationships: []
      }
      player_discord_auths: {
        Row: {
          access_token: string | null
          expires_at: string
          id: number
          player_uid: string
          refresh_token: string | null
        }
        Insert: {
          access_token?: string | null
          expires_at: string
          id?: number
          player_uid: string
          refresh_token?: string | null
        }
        Update: {
          access_token?: string | null
          expires_at?: string
          id?: number
          player_uid?: string
          refresh_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_discord_auths_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      player_discord_users: {
        Row: {
          discord_user: Json
          id: number
          player_uid: string
        }
        Insert: {
          discord_user?: Json
          id?: number
          player_uid: string
        }
        Update: {
          discord_user?: Json
          id?: number
          player_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_discord_users_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      player_favorite_games: {
        Row: {
          created_at: string
          game_id: number
          id: number
          player_uid: string
        }
        Insert: {
          created_at?: string
          game_id: number
          id?: number
          player_uid: string
        }
        Update: {
          created_at?: string
          game_id?: number
          id?: number
          player_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_favorite_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_favorite_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games_to_import_into_typesense"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_favorite_games_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      player_owned_games: {
        Row: {
          created_at: string
          game_id: number
          id: number
          player_uid: string
        }
        Insert: {
          created_at?: string
          game_id: number
          id?: number
          player_uid: string
        }
        Update: {
          created_at?: string
          game_id?: number
          id?: number
          player_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_owned_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_owned_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games_to_import_into_typesense"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_owned_games_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      player_socials: {
        Row: {
          discord_user_id: string | null
          discord_username: string | null
          id: number
          nintendo_friend_code: string | null
          player_uid: string
          steam_id: string | null
          steam_username: string | null
        }
        Insert: {
          discord_user_id?: string | null
          discord_username?: string | null
          id?: number
          nintendo_friend_code?: string | null
          player_uid: string
          steam_id?: string | null
          steam_username?: string | null
        }
        Update: {
          discord_user_id?: string | null
          discord_username?: string | null
          id?: number
          nintendo_friend_code?: string | null
          player_uid?: string
          steam_id?: string | null
          steam_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_socials_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      player_steam_auths: {
        Row: {
          id: number
          player_uid: string
          steam_client_id: string | null
        }
        Insert: {
          id?: number
          player_uid: string
          steam_client_id?: string | null
        }
        Update: {
          id?: number
          player_uid?: string
          steam_client_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_steam_auths_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      players: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birthdate: string | null
          country_code: string | null
          created_at: string
          email: string
          emails_allowed: boolean
          id: number
          is_admin: boolean
          location: string | null
          name: string | null
          patron_uid: string | null
          pronouns: Database["public"]["Enums"]["pronouns"] | null
          timezone: string | null
          username: string
          uuid: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birthdate?: string | null
          country_code?: string | null
          created_at?: string
          email: string
          emails_allowed?: boolean
          id?: number
          is_admin?: boolean
          location?: string | null
          name?: string | null
          patron_uid?: string | null
          pronouns?: Database["public"]["Enums"]["pronouns"] | null
          timezone?: string | null
          username: string
          uuid: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birthdate?: string | null
          country_code?: string | null
          created_at?: string
          email?: string
          emails_allowed?: boolean
          id?: number
          is_admin?: boolean
          location?: string | null
          name?: string | null
          patron_uid?: string | null
          pronouns?: Database["public"]["Enums"]["pronouns"] | null
          timezone?: string | null
          username?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_patron_uid_fkey"
            columns: ["patron_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      session_assets: {
        Row: {
          content_type: string
          created_at: string | null
          filename: string
          id: number
          session_id: number
          size_bytes: number
          uploader_uid: string
          url: string
          uuid: string
        }
        Insert: {
          content_type: string
          created_at?: string | null
          filename: string
          id?: number
          session_id: number
          size_bytes: number
          uploader_uid: string
          url: string
          uuid?: string
        }
        Update: {
          content_type?: string
          created_at?: string | null
          filename?: string
          id?: number
          session_id?: number
          size_bytes?: number
          uploader_uid?: string
          url?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_assets_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_assets_uploader_uid_fkey"
            columns: ["uploader_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      session_availabilities: {
        Row: {
          anytime: boolean
          availabilities: unknown[]
          created_at: string | null
          id: number
          player_uid: string
          session_id: number
          timezone: string
          uuid: string
        }
        Insert: {
          anytime?: boolean
          availabilities?: unknown[]
          created_at?: string | null
          id?: number
          player_uid: string
          session_id: number
          timezone: string
          uuid?: string
        }
        Update: {
          anytime?: boolean
          availabilities?: unknown[]
          created_at?: string | null
          id?: number
          player_uid?: string
          session_id?: number
          timezone?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_availabilities_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "session_availabilities_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_host_reviews: {
        Row: {
          created_at: string
          critical_feedback: string | null
          host_uid: string
          id: number
          player_uid: string | null
          player_username: string
          positive_feedback: string | null
          session_ends_at: string
          session_id: number | null
          session_slug: string
          submitted_at: string | null
          thumbs_up: boolean | null
        }
        Insert: {
          created_at?: string
          critical_feedback?: string | null
          host_uid: string
          id?: number
          player_uid?: string | null
          player_username: string
          positive_feedback?: string | null
          session_ends_at: string
          session_id?: number | null
          session_slug: string
          submitted_at?: string | null
          thumbs_up?: boolean | null
        }
        Update: {
          created_at?: string
          critical_feedback?: string | null
          host_uid?: string
          id?: number
          player_uid?: string | null
          player_username?: string
          positive_feedback?: string | null
          session_ends_at?: string
          session_id?: number | null
          session_slug?: string
          submitted_at?: string | null
          thumbs_up?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "session_host_reviews_host_uid_fkey"
            columns: ["host_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "session_host_reviews_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "session_host_reviews_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_messages: {
        Row: {
          created_at: string
          message: string
          player_uid: string
          session_id: number
          uid: string
        }
        Insert: {
          created_at?: string
          message: string
          player_uid?: string
          session_id: number
          uid?: string
        }
        Update: {
          created_at?: string
          message?: string
          player_uid?: string
          session_id?: number
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_messages_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "session_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_player_reviews: {
        Row: {
          created_at: string
          host_uid: string | null
          host_username: string
          id: number
          player_uid: string
          session_ends_at: string
          session_id: number | null
          session_slug: string
          submitted_at: string | null
          thumbs_up: boolean | null
        }
        Insert: {
          created_at?: string
          host_uid?: string | null
          host_username: string
          id?: number
          player_uid: string
          session_ends_at: string
          session_id?: number | null
          session_slug: string
          submitted_at?: string | null
          thumbs_up?: boolean | null
        }
        Update: {
          created_at?: string
          host_uid?: string | null
          host_username?: string
          id?: number
          player_uid?: string
          session_ends_at?: string
          session_id?: number | null
          session_slug?: string
          submitted_at?: string | null
          thumbs_up?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "session_player_reviews_host_uid_fkey"
            columns: ["host_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "session_player_reviews_player_uid_fkey"
            columns: ["player_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "session_player_reviews_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_players: {
        Row: {
          player_uid: string
          session_id: number
        }
        Insert: {
          player_uid: string
          session_id: number
        }
        Update: {
          player_uid?: string
          session_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gamers_sessions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_players_players_fk"
            columns: ["player_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
        ]
      }
      session_templates: {
        Row: {
          capacity: number
          created_at: string | null
          creator_uid: string
          description: string | null
          duration: number
          game_id: number
          id: number
          image_url: string | null
          is_coaching_slot: boolean | null
          platform_slugs: string[]
          private: boolean | null
          slug: string
          timezone: string | null
          title: string
          uuid: string
          voice_chat_url: string | null
        }
        Insert: {
          capacity: number
          created_at?: string | null
          creator_uid: string
          description?: string | null
          duration: number
          game_id: number
          id?: number
          image_url?: string | null
          is_coaching_slot?: boolean | null
          platform_slugs?: string[]
          private?: boolean | null
          slug: string
          timezone?: string | null
          title: string
          uuid?: string
          voice_chat_url?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          creator_uid?: string
          description?: string | null
          duration?: number
          game_id?: number
          id?: number
          image_url?: string | null
          is_coaching_slot?: boolean | null
          platform_slugs?: string[]
          private?: boolean | null
          slug?: string
          timezone?: string | null
          title?: string
          uuid?: string
          voice_chat_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_templates_creator_uid_fkey"
            columns: ["creator_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "session_templates_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_templates_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games_to_import_into_typesense"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          banner_id: number | null
          capacity: number
          created_at: string | null
          description: string | null
          duration: number
          ends_at: string
          game_id: number
          host_avatar_url: string | null
          host_uid: string
          host_username: string
          id: number
          image_url: string | null
          platform_slugs: string[]
          playtime: unknown | null
          request_reviews: boolean
          session_template_id: number | null
          slug: string
          starts_at: string
          timezone: string | null
          title: string
          uuid: string
          visibility: Database["public"]["Enums"]["session_visibility"]
          voice_chat_url: string | null
        }
        Insert: {
          banner_id?: number | null
          capacity: number
          created_at?: string | null
          description?: string | null
          duration: number
          ends_at: string
          game_id: number
          host_avatar_url?: string | null
          host_uid: string
          host_username: string
          id?: number
          image_url?: string | null
          platform_slugs?: string[]
          playtime?: unknown | null
          request_reviews?: boolean
          session_template_id?: number | null
          slug: string
          starts_at: string
          timezone?: string | null
          title: string
          uuid?: string
          visibility?: Database["public"]["Enums"]["session_visibility"]
          voice_chat_url?: string | null
        }
        Update: {
          banner_id?: number | null
          capacity?: number
          created_at?: string | null
          description?: string | null
          duration?: number
          ends_at?: string
          game_id?: number
          host_avatar_url?: string | null
          host_uid?: string
          host_username?: string
          id?: number
          image_url?: string | null
          platform_slugs?: string[]
          playtime?: unknown | null
          request_reviews?: boolean
          session_template_id?: number | null
          slug?: string
          starts_at?: string
          timezone?: string | null
          title?: string
          uuid?: string
          visibility?: Database["public"]["Enums"]["session_visibility"]
          voice_chat_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_banner_id_fkey"
            columns: ["banner_id"]
            isOneToOne: false
            referencedRelation: "banners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games_to_import_into_typesense"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_host_uid_fkey"
            columns: ["host_uid"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "sessions_session_template_id_fkey"
            columns: ["session_template_id"]
            isOneToOne: false
            referencedRelation: "session_templates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      games_to_import_into_typesense: {
        Row: {
          cover_url: string | null
          created_at: string | null
          fts_name_en: unknown | null
          id: number | null
          igdb_id: number | null
          igdb_platform_ids: Json | null
          igdb_raw_payload: Json | null
          igdb_url: string | null
          name: string | null
          slug: string | null
          storyline: string | null
          summary: string | null
          uuid: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      gbt_bit_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_bool_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_bool_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_bpchar_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_bytea_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_cash_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_cash_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_date_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_date_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_enum_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_enum_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_float4_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_float4_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_float8_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_float8_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_inet_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int2_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int2_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int4_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int4_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int8_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_int8_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_intv_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_intv_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_intv_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_macad_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_macad_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_macad8_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_macad8_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_numeric_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_oid_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_oid_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_text_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_time_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_time_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_timetz_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_ts_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_ts_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_tstz_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_uuid_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_uuid_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_var_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbt_var_fetch: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey_var_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey_var_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey16_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey16_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey2_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey2_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey32_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey32_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey4_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey4_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey8_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gbtreekey8_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      banner_member_type: "member" | "leader"
      invite_type: "email" | "code"
      platform_category:
        | "console"
        | "arcade"
        | "platform"
        | "operating_system"
        | "portable_console"
        | "computer"
        | "mobile"
        | "streaming"
        | "multimedia"
      pronouns: "he/him" | "she/her" | "they/them"
      session_visibility:
        | "public"
        | "link-only"
        | "invite-only"
        | "banner-only"
        | "banner-public"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
