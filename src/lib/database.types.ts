export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      dias_especiales: {
        Row: {
          cerrado: boolean | null
          created_at: string | null
          fecha: string
          hora_fin: string | null
          hora_inicio: string | null
          id: string
          motivo: string | null
          negocio_id: string | null
        }
        Insert: {
          cerrado?: boolean | null
          created_at?: string | null
          fecha: string
          hora_fin?: string | null
          hora_inicio?: string | null
          id?: string
          motivo?: string | null
          negocio_id?: string | null
        }
        Update: {
          cerrado?: boolean | null
          created_at?: string | null
          fecha?: string
          hora_fin?: string | null
          hora_inicio?: string | null
          id?: string
          motivo?: string | null
          negocio_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dias_especiales_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      negocios: {
        Row: {
          color_primario: string | null
          color_secundario: string | null
          id: string
          nombre: string
          rubro: string | null
          slug: string
          telefono_contacto: string | null
          tipo: string | null
        }
        Insert: {
          color_primario?: string | null
          color_secundario?: string | null
          id?: string
          nombre: string
          rubro?: string | null
          slug: string
          telefono_contacto?: string | null
          tipo?: string | null
        }
        Update: {
          color_primario?: string | null
          color_secundario?: string | null
          id?: string
          nombre?: string
          rubro?: string | null
          slug?: string
          telefono_contacto?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      profesionales: {
        Row: {
          activo: boolean | null
          created_at: string
          horarios: Json | null
          id: string
          negocio_id: string | null
          nombre: string
        }
        Insert: {
          activo?: boolean | null
          created_at?: string
          horarios?: Json | null
          id?: string
          negocio_id?: string | null
          nombre: string
        }
        Update: {
          activo?: boolean | null
          created_at?: string
          horarios?: Json | null
          id?: string
          negocio_id?: string | null
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "profesionales_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      servicios: {
        Row: {
          duracion: number | null
          id: string
          negocio_id: string | null
          nombre: string
          precio: number
        }
        Insert: {
          duracion?: number | null
          id?: string
          negocio_id?: string | null
          nombre: string
          precio: number
        }
        Update: {
          duracion?: number | null
          id?: string
          negocio_id?: string | null
          nombre?: string
          precio?: number
        }
        Relationships: [
          {
            foreignKeyName: "servicios_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      turnos: {
        Row: {
          cliente_apellido: string
          cliente_nombre: string
          cliente_telefono: string | null
          created_at: string | null
          estado: string | null
          fecha: string
          hora: string
          id: string
          mascota_edad: number | null
          mascota_especie: string | null
          mascota_nombre: string | null
          negocio_id: string | null
          nombre_dueno: string | null
          profesional: string
          servicio: string
        }
        Insert: {
          cliente_apellido: string
          cliente_nombre: string
          cliente_telefono?: string | null
          created_at?: string | null
          estado?: string | null
          fecha: string
          hora: string
          id?: string
          mascota_edad?: number | null
          mascota_especie?: string | null
          mascota_nombre?: string | null
          negocio_id?: string | null
          nombre_dueno?: string | null
          profesional: string
          servicio: string
        }
        Update: {
          cliente_apellido?: string
          cliente_nombre?: string
          cliente_telefono?: string | null
          created_at?: string | null
          estado?: string | null
          fecha?: string
          hora?: string
          id?: string
          mascota_edad?: number | null
          mascota_especie?: string | null
          mascota_nombre?: string | null
          negocio_id?: string | null
          nombre_dueno?: string | null
          profesional?: string
          servicio?: string
        }
        Relationships: [
          {
            foreignKeyName: "turnos_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
